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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LottieAnimation from "@/components/lottie-animation";
import { addToast } from "@/components/ui/toast";

export default function DashboardPage() {
  const { user } = useUser();
  const supabase = useSupabase();

  const [subs, setSubs] = useState<Subscription[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) return;

    async function loadSubscriptions() {
      const subscriptions = await getSubscriptions(supabase);

      setSubs(subscriptions);
      setCategories(getCategories());
      setMounted(true);
    }

    loadSubscriptions();
  }, [user, supabase]);

  function openDeleteDialog(sub: Subscription) {
    setSelectedSubscription(sub);
    setDeleteDialogOpen(true);
  }

  async function handleDelete() {
    if (!selectedSubscription) return;

    const { id, name } = selectedSubscription;

    try {
      await deleteSubscription(supabase, id);

      const subscriptions = await getSubscriptions(supabase);
      setSubs(subscriptions);

      const service = getServiceIcon(name);
      const Icon = service.icon;

      addToast({
        title: `${name} deleted`,
        description: `${name} was removed from your subscriptions.`,
        type: "success",
        icon: (
          <Icon
            className="h-4 w-4"
            style={{ color: service.color }}
          />
        ),
      });
    } catch (error) {
      console.error("Failed to delete subscription:", error);

      addToast({
        title: "Could not delete subscription",
        description:
          "Something went wrong while deleting the subscription.",
        type: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedSubscription(null);
    }
  }

  function categoryLabel(id: string) {
    return categories.find((c) => c.id === id)?.label ?? "Other";
  }

  if (!mounted) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="mb-6 text-gray-400">
          Welcome to your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="mb-6 text-gray-400">
        Welcome to your dashboard.
      </p>

      {subs.length === 0 ? (
        <p className="text-gray-500">
          No subscriptions added yet. Go to Add Item to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                            <Icon
                              className="h-5 w-5"
                              style={{
                                color: service.color,
                              }}
                            />

                            <CardTitle className="text-base">
                              {sub.name}
                            </CardTitle>

                            <CategoryIcon
                              categoryId={sub.categoryId}
                              className="h-4 w-4 text-gray-400"
                            />
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteDialog(sub);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </CardHeader>

                        <CardContent>
                          <p className="text-sm text-gray-400">
                            {categoryLabel(sub.categoryId)}
                          </p>

                          <p className="mt-2 text-lg font-semibold">
                            {sub.currency} {sub.price.toFixed(2)}

                            <span className="text-sm font-normal text-gray-400">
                              {" / "}
                              {sub.billingCycle}
                            </span>
                          </p>

                          {sub.renewalDate && (
                            <p className="mt-1 text-sm text-gray-500">
                              Renews:{" "}
                              {new Date(
                                sub.renewalDate
                              ).toLocaleDateString()}
                            </p>
                          )}

                          {sub.notes && (
                            <p className="mt-2 text-sm text-gray-500">
                              {sub.notes}
                            </p>
                          )}
                        </CardContent>

                        <div className="pointer-events-none absolute bottom-1 right-3 h-20 w-16">
                          <LottieAnimation />
                        </div>
                      </Card>
                    </div>
                  }
                />

                <HoverCardContent className="w-64">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color: service.color,
                      }}
                    />

                    <div className="font-semibold">{sub.name}</div>
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

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);

          if (!open) {
            setSelectedSubscription(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3">
              {selectedSubscription &&
                (() => {
                  const service = getServiceIcon(
                    selectedSubscription.name
                  );
                  const Icon = service.icon;

                  return (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <Icon
                        className="h-5 w-5"
                        style={{ color: service.color }}
                      />
                    </span>
                  );
                })()}

              <span>Delete subscription</span>
            </AlertDialogTitle>

            <AlertDialogDescription className="pt-3 leading-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedSubscription?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}