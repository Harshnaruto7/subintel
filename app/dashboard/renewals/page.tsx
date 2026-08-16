"use client";

import { useEffect, useState } from "react";
import {
  BellRing,
  CalendarDays,
  Clock3,
  Mail,
} from "lucide-react";

import { useUser } from "@clerk/nextjs";

import {
  getSubscriptions,
  Subscription,
} from "@/lib/subscriptions";

import { useSupabase } from "@/lib/supabase-client";
import { getServiceIcon } from "@/lib/service-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { addToast } from "@/components/ui/toast";

export default function RenewalsPage() {
  const { user } = useUser();
  const supabase = useSupabase();

  const [subscriptions, setSubscriptions] = useState<
    Subscription[]
  >([]);

  const [selectedSubscriptionId, setSelectedSubscriptionId] =
    useState<string>("");

  const [threeDaysBefore, setThreeDaysBefore] =
    useState(false);

  const [onRenewalDay, setOnRenewalDay] =
    useState(false);

  const [customReminder, setCustomReminder] =
    useState(false);

  const [customDate, setCustomDate] =
    useState<Date | undefined>();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadSubscriptions() {
      const data = await getSubscriptions(supabase);

      setSubscriptions(data);

      // Only select the first subscription if
      // there is currently no subscription selected.
      setSelectedSubscriptionId((current) => {
        if (current) {
          return current;
        }

        return data.length > 0 ? data[0].id : "";
      });

      setMounted(true);
    }

    loadSubscriptions();
  }, [user, supabase]);

  const selectedSubscription =
    subscriptions.find(
      (subscription) =>
        subscription.id === selectedSubscriptionId
    ) ?? null;

  function handleSubscriptionChange(id: string) {
    setSelectedSubscriptionId(id);

    // Reset alert configuration when switching
    // to another subscription.
    setThreeDaysBefore(false);
    setOnRenewalDay(false);
    setCustomReminder(false);
    setCustomDate(undefined);
  }

  function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getDaysUntilRenewal(
    renewalDate: string
  ) {
    const today = new Date();
    const renewal = new Date(renewalDate);

    today.setHours(0, 0, 0, 0);
    renewal.setHours(0, 0, 0, 0);

    const difference =
      renewal.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  }

  function handleSaveAlert() {
    if (!selectedSubscription) {
      addToast({
        title: "Select a subscription",
        description:
          "Choose a subscription before creating an alert.",
        type: "error",
      });

      return;
    }

    if (
      !threeDaysBefore &&
      !onRenewalDay &&
      !customReminder
    ) {
      addToast({
        title: "Select an alert",
        description:
          "Choose at least one reminder option.",
        type: "error",
      });

      return;
    }

    if (customReminder && !customDate) {
      addToast({
        title: "Choose a custom date",
        description:
          "Select a date for your custom reminder.",
        type: "error",
      });

      return;
    }

    addToast({
      title: "Alert saved",
      description: `Renewal alerts for ${selectedSubscription.name} have been saved.`,
      type: "success",
    });
  }

  if (!mounted) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Renewals & Alerts
        </h1>

        <p className="mt-1 text-gray-400">
          Stay ahead of your subscription renewals.
        </p>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Renewals & Alerts
        </h1>

        <p className="mt-1 text-gray-400">
          Stay ahead of your subscription renewals.
        </p>

        <Card className="mt-6 max-w-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border">
              <BellRing className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="text-lg font-semibold">
              No subscriptions yet
            </h2>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add a subscription first, then you can configure
              renewal reminders and email alerts.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const service = selectedSubscription
    ? getServiceIcon(selectedSubscription.name)
    : null;

  const ServiceIcon = service?.icon;

  const daysUntilRenewal =
    selectedSubscription?.renewalDate
      ? getDaysUntilRenewal(
          selectedSubscription.renewalDate
        )
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Renewals & Alerts
        </h1>

        <p className="mt-1 text-gray-400">
          Stay ahead of your subscription renewals and
          important dates.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* Subscription Selection */}
        <Card>
          <CardHeader>
            <CardTitle>
              Choose a subscription
            </CardTitle>

            <CardDescription>
              Select the subscription you want to configure
              alerts for.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={selectedSubscriptionId}
              onValueChange={handleSubscriptionChange}
              className="space-y-3"
            >
              {subscriptions.map((subscription) => {
                const service =
                  getServiceIcon(subscription.name);

                const Icon = service.icon;

                const isSelected =
                  selectedSubscriptionId ===
                  subscription.id;

                return (
                  <div
                    key={subscription.id}
                    onClick={() =>
                      handleSubscriptionChange(
                        subscription.id
                      )
                    }
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      isSelected
                        ? "border-foreground/40 bg-muted/30"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <RadioGroupItem
                      value={subscription.id}
                      id={`subscription-${subscription.id}`}
                    />

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <Icon
                        className="h-6 w-6"
                        style={{
                          color: service.color,
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-medium">
                        {subscription.name}
                      </div>

                      <div className="mt-1 text-sm text-muted-foreground">
                        {subscription.currency}{" "}
                        {subscription.price.toFixed(2)}{" "}
                        / {subscription.billingCycle}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        Renews
                      </div>

                      <div className="text-sm font-medium">
                        {subscription.renewalDate
                          ? formatDate(
                              subscription.renewalDate
                            )
                          : "Not set"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle>
              Alert settings
            </CardTitle>

            <CardDescription>
              Choose when SubIntel should remind you.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {selectedSubscription && ServiceIcon && (
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <ServiceIcon
                    className="h-6 w-6"
                    style={{
                      color: service?.color,
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">
                    {selectedSubscription.name}
                  </p>

                  {selectedSubscription.renewalDate && (
                    <p className="text-sm text-muted-foreground">
                      Renews{" "}
                      {formatDate(
                        selectedSubscription.renewalDate
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {daysUntilRenewal !== null && (
              <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-4">
                <Clock3 className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">
                    {daysUntilRenewal > 0
                      ? `${daysUntilRenewal} days until renewal`
                      : daysUntilRenewal === 0
                        ? "Renews today"
                        : "Renewal date has passed"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {selectedSubscription?.renewalDate
                      ? formatDate(
                          selectedSubscription.renewalDate
                        )
                      : ""}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* 3 Days Before */}
              <label
                htmlFor="three-days"
                className="flex cursor-pointer items-start gap-3"
              >
                <Checkbox
                  id="three-days"
                  checked={threeDaysBefore}
                  onCheckedChange={(checked) =>
                    setThreeDaysBefore(
                      checked === true
                    )
                  }
                />

                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    3 days before renewal
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Get an email reminder three days before
                    the subscription renews.
                  </p>
                </div>
              </label>

              {/* Renewal Day */}
              <label
                htmlFor="renewal-day"
                className="flex cursor-pointer items-start gap-3"
              >
                <Checkbox
                  id="renewal-day"
                  checked={onRenewalDay}
                  onCheckedChange={(checked) =>
                    setOnRenewalDay(
                      checked === true
                    )
                  }
                />

                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    On renewal day
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Get an email reminder on the day your
                    subscription renews.
                  </p>
                </div>
              </label>

              {/* Custom Reminder */}
              <label
                htmlFor="custom-reminder"
                className="flex cursor-pointer items-start gap-3"
              >
                <Checkbox
                  id="custom-reminder"
                  checked={customReminder}
                  onCheckedChange={(checked) =>
                    setCustomReminder(
                      checked === true
                    )
                  }
                />

                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Custom reminder
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Choose your own reminder date.
                  </p>
                </div>
              </label>
            </div>

            {/* Custom Date */}
            {customReminder && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Reminder date
                </p>

                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      />
                    }
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />

                    {customDate
                      ? formatDate(customDate)
                      : "Pick a reminder date"}
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={customDate}
                      onSelect={setCustomDate}
                      disabled={(date) =>
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Email */}
            <div className="border-t border-border pt-5">
              <div className="mb-4 flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">
                    Email notifications
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Alerts will be sent to your configured
                    notification email.
                  </p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSaveAlert}
              >
                <BellRing className="mr-2 h-4 w-4" />
                Save Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How Alerts Work */}
      <Card>
        <CardHeader>
          <CardTitle>
            How your alerts work
          </CardTitle>

          <CardDescription>
            SubIntel can keep you informed before and on your
            renewal dates.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <Clock3 className="mb-3 h-5 w-5 text-muted-foreground" />

              <p className="font-medium">
                3 days before
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Know about an upcoming renewal before the
                payment happens.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <BellRing className="mb-3 h-5 w-5 text-muted-foreground" />

              <p className="font-medium">
                Renewal day
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Get reminded on the day your subscription
                renews.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <CalendarDays className="mb-3 h-5 w-5 text-muted-foreground" />

              <p className="font-medium">
                Custom date
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Choose a specific date when you want
                SubIntel to remind you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}