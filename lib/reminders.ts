import { SupabaseClient } from "@supabase/supabase-js";

export type ReminderType =
  | "three_days_before"
  | "renewal_day"
  | "custom";

export interface SubscriptionReminder {
  id: string;
  userId: string;
  subscriptionId: string;
  reminderType: ReminderType;
  reminderDate: string;
  enabled: boolean;
  sentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

function mapReminder(row: any): SubscriptionReminder {
  return {
    id: row.id,
    userId: row.user_id,
    subscriptionId: row.subscription_id,
    reminderType: row.reminder_type,
    reminderDate: row.reminder_date,
    enabled: row.enabled,
    sentAt: row.sent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getReminders(
  supabase: SupabaseClient
) {
  const { data, error } = await supabase
    .from("subscription_reminders")
    .select("*")
    .order("reminder_date", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Failed to fetch reminders:",
      error
    );

    throw error;
  }

  return (data ?? []).map(mapReminder);
}

export async function getSubscriptionReminders(
  supabase: SupabaseClient,
  subscriptionId: string
) {
  const { data, error } = await supabase
    .from("subscription_reminders")
    .select("*")
    .eq("subscription_id", subscriptionId)
    .order("reminder_date", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Failed to fetch subscription reminders:",
      error
    );

    throw error;
  }

  return (data ?? []).map(mapReminder);
}

export async function deleteSubscriptionReminders(
  supabase: SupabaseClient,
  subscriptionId: string
) {
  const { error } = await supabase
    .from("subscription_reminders")
    .delete()
    .eq("subscription_id", subscriptionId);

  if (error) {
    console.error(
      "Failed to delete subscription reminders:",
      error
    );

    throw error;
  }
}

export async function createSubscriptionReminder(
  supabase: SupabaseClient,
  reminder: {
    userId: string;
    subscriptionId: string;
    reminderType: ReminderType;
    reminderDate: string;
  }
) {
  const { data, error } = await supabase
    .from("subscription_reminders")
    .insert({
      user_id: reminder.userId,
      subscription_id: reminder.subscriptionId,
      reminder_type: reminder.reminderType,
      reminder_date: reminder.reminderDate,
      enabled: true,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to create reminder:",
      error
    );

    throw error;
  }

  return mapReminder(data);
}