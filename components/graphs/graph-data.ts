import { Subscription } from "@/lib/subscriptions";

export type SubscriptionSpendingData = {
  name: string;
  monthly: number;
  yearly: number;
};

export type CategorySpendingData = {
  name: string;
  monthly: number;
  yearly: number;
};

/*
 * Convert subscriptions into monthly/yearly values.
 */
export function getSubscriptionSpendingData(
  subscriptions: Subscription[]
): SubscriptionSpendingData[] {
  return subscriptions.map((sub) => {
    const billingCycle = sub.billingCycle.toLowerCase();

    let monthly = sub.price;

    if (billingCycle === "yearly") {
      monthly = sub.price / 12;
    }

    return {
      name: sub.name,
      monthly,
      yearly: monthly * 12,
    };
  });
}

/*
 * Convert subscriptions into category-based
 * monthly/yearly spending.
 */
export function getCategorySpendingData(
  subscriptions: Subscription[],
  categoryLabel: (id: string) => string
): CategorySpendingData[] {
  const categoryTotals: Record<
    string,
    {
      monthly: number;
      yearly: number;
    }
  > = {};

  subscriptions.forEach((sub) => {
    const category = categoryLabel(sub.categoryId);

    if (!categoryTotals[category]) {
      categoryTotals[category] = {
        monthly: 0,
        yearly: 0,
      };
    }

    let monthly = sub.price;

    if (sub.billingCycle.toLowerCase() === "yearly") {
      monthly = sub.price / 12;
    }

    categoryTotals[category].monthly += monthly;
    categoryTotals[category].yearly += monthly * 12;
  });

  return Object.entries(categoryTotals).map(
    ([name, values]) => ({
      name,
      monthly: values.monthly,
      yearly: values.yearly,
    })
  );
}