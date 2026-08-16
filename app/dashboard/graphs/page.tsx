"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import { useSupabase } from "@/lib/supabase-client";

import {
  getSubscriptions,
  Subscription,
} from "@/lib/subscriptions";

import {
  getCategories,
  Category,
} from "@/lib/categories";

import SubscriptionSpendingChart from "@/components/graphs/subscription-spending-chart";

import CategorySpendingChart from "@/components/graphs/category-spending-chart";

import {
  getSubscriptionSpendingData,
  getCategorySpendingData,
} from "@/components/graphs/graph-data";

import CategoryRadarChart from "@/components/graphs/category-radar-chart";

import SpendingProjectionChart from "@/components/graphs/spending-projection-chart";


export default function GraphsPage() {
  const { user } = useUser();

  const supabase = useSupabase();

  const [subs, setSubs] = useState<Subscription[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    if (!user) return;

    async function loadSubscriptions() {
      const subscriptions =
        await getSubscriptions(supabase);

      setSubs(subscriptions);

      setCategories(getCategories());

      setMounted(true);
    }

    loadSubscriptions();
  }, [user, supabase]);


  if (!mounted) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Graph of each items
        </h1>

        <p className="text-gray-400">
          Loading your subscription data...
        </p>
      </div>
    );
  }


  // Get category name
  function categoryLabel(id: string) {
    return (
      categories.find(
        (category) => category.id === id
      )?.label ?? "Other"
    );
  }


  // Prepare chart data
  const subscriptionChartData =
    getSubscriptionSpendingData(subs);

  const categoryChartData =
    getCategorySpendingData(
      subs,
      categoryLabel
    );


  return (
    <div>
      <h1 className="text-2xl font-bold">
        Graph of each items
      </h1>

      <p className="text-gray-400 mb-6">
        Showing your subscription spending.
      </p>

      {subs.length === 0 ? (
        <p className="text-gray-500">
          No subscriptions available to display.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Chart 1 */}
          <SubscriptionSpendingChart
            data={subscriptionChartData}
          />

          {/* Chart 2 */}
          <CategorySpendingChart
            data={categoryChartData}
          />

          {/* Chart 3 */}
          <CategoryRadarChart
            data={categoryChartData}
          />

          {/* Chart 4 */}
          <SpendingProjectionChart
            subs={subs}
          />

        </div>
      )}
    </div>
  );
}