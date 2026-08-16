"use client";

import { useEffect, useState } from "react";
import {
  getSubscriptions,
  deleteSubscription,
  Subscription,
} from "@/lib/subscriptions";
import { getCategories, Category } from "@/lib/categories";
import { CategoryIcon } from "@/components/category-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getServiceIcon } from "@/lib/service-icons";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase-client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import LottieAnimation from "@/components/lottie-animation";

export default function DashboardPage() {
  const { user } = useUser();
  const supabase = useSupabase();

  const [subs, setSubs] = useState<Subscription[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadSubscriptions() {
      const subscriptions = await getSubscriptions(supabase);

      setSubs(subscriptions);
      setCategories(getCategories());
      setMounted(true);
    }

    loadSubscriptions();
  }, [user]);

  async function handleDelete(id: string) {
    await deleteSubscription(supabase, id);

    const subscriptions = await getSubscriptions(supabase);
    setSubs(subscriptions);
  }

  function categoryLabel(id: string) {
    return categories.find((c) => c.id === id)?.label ?? "Other";
  }

  if (!mounted) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="text-gray-400 mb-6">
          Welcome to your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="text-gray-400 mb-6">
        Welcome to your dashboard.
      </p>

      {subs.length === 0 ? (
        <p className="text-gray-500">
          No subscriptions added yet. Go to Add Item to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subs.map((sub) => {
            const service = getServiceIcon(sub.name);
            const Icon = service.icon;

            return (
              <HoverCard key={sub.id}>
                <HoverCardTrigger
                  delay={10}
                  closeDelay={100}
                  render={
                    <div className="cursor-pointer">
                      <Card className="relative overflow-hidden transition-transform hover:scale-[1.01]">
                        <CardHeader className="flex flex-row items-start justify-between">
                          <div className="flex items-center gap-2">
                            {/* Service/App Icon */}
                            <Icon
                              className="h-5 w-5"
                              style={{ color: service.color }}
                            />

                            {/* Subscription Name */}
                            <CardTitle className="text-base">
                              {sub.name}
                            </CardTitle>

                            {/* Category Icon */}
                            <CategoryIcon
                              categoryId={sub.categoryId}
                              className="h-4 w-4 text-gray-400"
                            />
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(sub.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </CardHeader>

                        <CardContent>
                          {/* Category */}
                          <p className="text-sm text-gray-400">
                            {categoryLabel(sub.categoryId)}
                          </p>

                          {/* Price */}
                          <p className="text-lg font-semibold mt-2">
                            {sub.currency} {sub.price.toFixed(2)}

                            <span className="text-sm text-gray-400 font-normal">
                              {" / "}
                              {sub.billingCycle}
                            </span>
                          </p>

                          {/* Renewal Date */}
                          {sub.renewalDate && (
                            <p className="text-sm text-gray-500 mt-1">
                              Renews:{" "}
                              {new Date(
                                sub.renewalDate
                              ).toLocaleDateString()}
                            </p>
                          )}

                          {/* Notes */}
                          {sub.notes && (
                            <p className="text-sm text-gray-500 mt-2">
                              {sub.notes}
                            </p>
                          )}
                        </CardContent>

                        {/* Lottie Animation - Bottom Right */}
                        <div className="absolute bottom-1 right-3 w-16 h-20 pointer-events-none">
                          <LottieAnimation />
                        </div>
                      </Card>
                    </div>
                  }
                />

                {/* Hover Information */}
                <HoverCardContent className="w-64">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="h-5 w-5"
                      style={{ color: service.color }}
                    />

                    <div className="font-semibold">
                      {sub.name}
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {categoryLabel(sub.categoryId)}
                  </div>

                  <div className="mt-1 text-sm">
                    {sub.currency} {sub.price.toFixed(2)} /{" "}
                    {sub.billingCycle}
                  </div>

                  {sub.renewalDate && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      Renews:{" "}
                      {new Date(
                        sub.renewalDate
                      ).toLocaleDateString()}
                    </div>
                  )}

                  {sub.notes && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {sub.notes}
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      )}
    </div>
  );
}