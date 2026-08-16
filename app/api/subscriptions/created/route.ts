import React from "react";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { resend } from "@/lib/resend";
import SubscriptionCreatedEmail from "@/emails/subscription-created";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      price,
      currency,
      billingCycle,
      renewalDate,
      email,
      serviceIcon,
    } = body;

    if (!name || !price || !currency || !billingCycle || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required email data",
        },
        { status: 400 }
      );
    }

    const emailHtml = await render(
      React.createElement(SubscriptionCreatedEmail, {
        name,
        price,
        currency,
        billingCycle,
        renewalDate,
        serviceIcon,
      })
    );

    const { data, error } = await resend.emails.send({
      from: "SubIntel <onboarding@resend.dev>",
      to: email,
      subject: `${name} added to SubIntel`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscription email sent successfully",
      data,
    });
  } catch (error) {
    console.error("Email route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}