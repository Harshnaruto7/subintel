import React from "react";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { resend } from "@/lib/resend";
import SubscriptionReminderEmail from "@/emails/subscription-reminder";

export async function GET(request: Request) {
  try {
    // Check whether the request contains the correct scheduler secret.
    const authorization = request.headers.get("authorization");

    const expectedAuthorization = `Bearer ${process.env.CRON_SECRET}`;

    if (authorization !== expectedAuthorization) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized", 
        },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    const today = new Date()
      .toISOString()
      .split("T")[0];

    // Get ONLY reminders that the user has actually configured
    const { data: reminders, error: reminderError } =
      await supabase
        .from("subscription_reminders")
        .select("*")
        .eq("enabled", true)
        .is("sent_at", null)
        .lte("reminder_date", today)
        .order("reminder_date", {
          ascending: true,
        });

    if (reminderError) {
      console.error(
        "Failed to fetch due reminders:",
        reminderError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch due reminders",
        },
        { status: 500 }
      );
    }

    const remindersWithSubscriptions = [];

    for (const reminder of reminders ?? []) {
      const {
        data: subscription,
        error: subscriptionError,
      } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("id", reminder.subscription_id)
        .single();

      if (subscriptionError) {
        console.error(
          "Failed to fetch subscription:",
          subscriptionError
        );

        continue;
      }

      // Make sure the subscription has an email address.
      if (!subscription.notification_email) {
        console.log(
          `Skipping ${subscription.name}: no notification email configured.`
        );

        continue;
      }

      // Render the React Email template.
      const emailHtml = await render(
        React.createElement(
          SubscriptionReminderEmail,
          {
            name: subscription.name,
            price: Number(subscription.price),
            currency: subscription.currency,
            billingCycle: subscription.billing_cycle,
            renewalDate: subscription.renewal_date,
            reminderType: reminder.reminder_type,
          }
        )
      );

      // Create the email subject.
      let subject = `${subscription.name} subscription reminder`;

      if (reminder.reminder_type === "three_days_before") {
        subject = `${subscription.name} renews in 3 days`;
      }

      if (reminder.reminder_type === "renewal_day") {
        subject = `${subscription.name} renews today`;
      }

      if (reminder.reminder_type === "custom") {
        subject = `Reminder for your ${subscription.name} subscription`;
      }

      // Send the email directly through Resend.
      const { data: emailData, error: emailError } =
        await resend.emails.send({
          from: "SubIntel <onboarding@resend.dev>",
          to: subscription.notification_email,
          subject,
          html: emailHtml,
        });

      // If Resend failed, DO NOT mark the reminder as sent.
      if (emailError) {
        console.error(
          `Failed to send reminder email for ${subscription.name}:`,
          emailError
        );

        continue;
      }

      console.log(
        `Reminder email sent successfully for ${subscription.name}`
      );

      // Mark the reminder as sent.
      const sentAt = new Date().toISOString();

      const { error: updateError } = await supabase
        .from("subscription_reminders")
        .update({
          sent_at: sentAt,
        })
        .eq("id", reminder.id)
        .is("sent_at", null);

      if (updateError) {
        console.error(
          `Failed to update sent_at for ${subscription.name}:`,
          updateError
        );

        continue;
      }

      console.log(
        `Reminder marked as sent for ${subscription.name}`
      );

      remindersWithSubscriptions.push({
        reminder: {
          ...reminder,
          sent_at: sentAt,
        },
        subscription,
        email: emailData,
      });
    }

    console.log(
      "Successfully processed reminders:",
      remindersWithSubscriptions
    );

    return NextResponse.json({
      success: true,
      today,
      count: remindersWithSubscriptions.length,
      reminders: remindersWithSubscriptions,
    });
  } catch (error) {
    console.error(
      "Process reminders error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}