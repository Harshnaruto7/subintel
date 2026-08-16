import { SupabaseClient } from "@supabase/supabase-js";

export type Subscription = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  renewalDate: string;
  notes?: string;
  createdAt: string;
  serviceIcon: string | null;
};

type SubscriptionRow = {
  id: string;
  user_id: string;
  name: string;
  category_id: string;
  price: number;
  currency: string;
  billing_cycle: "monthly" | "yearly";
  renewal_date: string | null;
  notes: string | null;
  created_at: string;
  service_icon: string | null;
};

function mapSubscription(row: SubscriptionRow): Subscription {
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    price: row.price,
    currency: row.currency,
    billingCycle: row.billing_cycle,
    renewalDate: row.renewal_date ?? "",
    notes: row.notes ?? "",
    createdAt: row.created_at,
    serviceIcon: row.service_icon,
  };
}

export async function getSubscriptions(
  supabase: SupabaseClient
): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }

  return (data as SubscriptionRow[]).map(mapSubscription);
}

export async function addSubscription(
  supabase: SupabaseClient,
  userId: string,
  sub: Omit<Subscription, "id" | "createdAt">
) {
  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      user_id: userId,
      name: sub.name,
      category_id: sub.categoryId,
      price: sub.price,
      currency: sub.currency,
      billing_cycle: sub.billingCycle,
      renewal_date: sub.renewalDate || null,
      notes: sub.notes || null,
      service_icon: sub.serviceIcon,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding subscription:", error);
    throw error;
  }

  return mapSubscription(data as SubscriptionRow);
}

export async function deleteSubscription(
  supabase: SupabaseClient,
  id: string
) {
  const { error } = await supabase
    .from("subscriptions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
}