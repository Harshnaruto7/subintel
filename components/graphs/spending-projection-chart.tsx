"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  parseISO,
  startOfDay,
} from "date-fns";
import type { DateRange } from "react-day-picker";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import type { Subscription } from "@/lib/subscriptions";

type Props = {
  subs: Subscription[];
};

type RangeType = "1m" | "2m" | "3m" | "6m" | "12m" | "custom";

const chartConfig = {
  spending: {
    label: "Expected Spending",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export default function SpendingProjectionChart({ subs }: Props) {
  const [range, setRange] = useState<RangeType>("1m");

  const [customRange, setCustomRange] = useState<DateRange | undefined>();

  const [customDialogOpen, setCustomDialogOpen] = useState(false);

  const today = useMemo(() => startOfDay(new Date()), []);

  const dateRange = useMemo(() => {
    if (range === "1m") {
      return {
        start: today,
        end: addMonths(today, 1),
      };
    }

    if (range === "2m") {
      return {
        start: today,
        end: addMonths(today, 2),
      };
    }

    if (range === "3m") {
      return {
        start: today,
        end: addMonths(today, 3),
      };
    }

    if (range === "6m") {
      return {
        start: today,
        end: addMonths(today, 6),
      };
    }

    if (range === "12m") {
      return {
        start: today,
        end: addMonths(today, 12),
      };
    }

    if (range === "custom" && customRange?.from && customRange?.to) {
      return {
        start: startOfDay(customRange.from),
        end: startOfDay(customRange.to),
      };
    }

    return {
      start: today,
      end: addMonths(today, 1),
    };
  }, [range, customRange, today]);

  const forecast = useMemo(() => {
    const days = eachDayOfInterval({
      start: dateRange.start,
      end: dateRange.end,
    });

    return days.map((date) => {
      let total = 0;

      const payments: {
        name: string;
        amount: number;
      }[] = [];

      subs.forEach((sub) => {
        const price = Number(sub.price);

        if (!price || !sub.renewalDate) {
          return;
        }

        const renewalDate = parseISO(sub.renewalDate);

        if (sub.billingCycle === "monthly") {
          const renewalDay = renewalDate.getDate();

          const lastDayOfMonth = endOfMonth(date).getDate();

          const actualRenewalDay = Math.min(
            renewalDay,
            lastDayOfMonth
          );

          if (date.getDate() === actualRenewalDay) {
            total += price;

            payments.push({
              name: sub.name,
              amount: price,
            });
          }
        }

        if (sub.billingCycle === "yearly") {
          if (
            date.getMonth() === renewalDate.getMonth() &&
            date.getDate() === renewalDate.getDate()
          ) {
            total += price;

            payments.push({
              name: sub.name,
              amount: price,
            });
          }
        }
      });

      return {
        date: format(date, "yyyy-MM-dd"),
        spending: total,
        payments,
      };
    });
  }, [subs, dateRange.start, dateRange.end]);

  const totalProjected = forecast.reduce(
    (sum, item) => sum + item.spending,
    0
  );

  const rangeLabel =
    range === "1m"
      ? "Upcoming 1 month"
      : range === "2m"
        ? "Upcoming 2 months"
        : range === "3m"
          ? "Upcoming 3 months"
          : range === "6m"
            ? "Upcoming 6 months"
            : range === "12m"
              ? "Upcoming 12 months"
              : customRange?.from && customRange?.to
                ? `${format(
                    customRange.from,
                    "MMM d, yyyy"
                  )} - ${format(customRange.to, "MMM d, yyyy")}`
                : "Custom range";

  function handleRangeChange(value: string | null) {
    if (!value) return;

    const newRange = value as RangeType;

    if (newRange === "custom") {
      setCustomDialogOpen(true);
      return;
    }

    setRange(newRange);
  }

  function handleCustomRangeSelect(
    selectedRange: DateRange | undefined
  ) {
    setCustomRange(selectedRange);
  }

  function applyCustomRange() {
    if (!customRange?.from || !customRange?.to) {
      return;
    }

    setRange("custom");
    setCustomDialogOpen(false);
  }

  function cancelCustomRange() {
    setCustomDialogOpen(false);
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <CardTitle>Subscription Cash Flow</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Expected subscription payments
          </p>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Expected spending
            </p>

            <p className="text-2xl font-bold">
              ₹{totalProjected.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={range}
            onValueChange={handleRangeChange}
          >
            <SelectTrigger className="w-[165px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1m">
                Upcoming 1 month
              </SelectItem>

              <SelectItem value="2m">
                Upcoming 2 months
              </SelectItem>

              <SelectItem value="3m">
                Upcoming 3 months
              </SelectItem>

              <SelectItem value="6m">
                Upcoming 6 months
              </SelectItem>

              <SelectItem value="12m">
                Upcoming 12 months
              </SelectItem>

              <SelectItem value="custom">
                Custom range
              </SelectItem>
            </SelectContent>
          </Select>

          {range === "custom" &&
            customRange?.from &&
            customRange?.to && (
              <Button
                variant="outline"
                className="hidden sm:flex"
                onClick={() => setCustomDialogOpen(true)}
              >
                {format(customRange.from, "MMM d")} -{" "}
                {format(customRange.to, "MMM d")}
              </Button>
            )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-3 text-xs text-muted-foreground">
          {rangeLabel}
        </p>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart
            data={forecast}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="fillSpending"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-spending)"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-spending)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-muted"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={55}
              tickFormatter={(value) =>
                `₹${
                  Number(value) >= 1000
                    ? `${Number(value) / 1000}k`
                    : value
                }`
              }
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={35}
              tickFormatter={(value) =>
                format(parseISO(value), "MMM d")
              }
            />

            <ChartTooltip
              cursor={{
                stroke: "rgba(59, 130, 246, 0.35)",
                strokeWidth: 1,
              }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    format(
                      parseISO(value),
                      "MMMM d, yyyy"
                    )
                  }
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
              }
            />

            <Area
              dataKey="spending"
              type="linear"
              fill="url(#fillSpending)"
              stroke="var(--color-spending)"
              strokeWidth={2.5}
              dot={(props) => {
                const { cx, cy, payload } = props;

                if (
                  !payload?.spending ||
                  cx === undefined ||
                  cy === undefined
                ) {
                  return null;
                }

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="var(--color-spending)"
                    stroke="var(--background)"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{
                r: 6,
                fill: "var(--color-spending)",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <Dialog
        open={customDialogOpen}
        onOpenChange={setCustomDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select date range</DialogTitle>

            <DialogDescription>
              Choose the start and end dates for your cash-flow
              forecast.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center py-4">
            <Calendar
              mode="range"
              selected={customRange}
              onSelect={handleCustomRangeSelect}
              numberOfMonths={1}
              disabled={(date) => date < today}
            />
          </div>

          <div className="rounded-md border px-3 py-2 text-sm">
            {customRange?.from ? (
              customRange.to ? (
                <span>
                  {format(
                    customRange.from,
                    "MMMM d, yyyy"
                  )}{" "}
                  →{" "}
                  {format(
                    customRange.to,
                    "MMMM d, yyyy"
                  )}
                </span>
              ) : (
                <span>
                  Start:{" "}
                  {format(
                    customRange.from,
                    "MMMM d, yyyy"
                  )}
                  <span className="text-muted-foreground">
                    {" "}
                    — select an end date
                  </span>
                </span>
              )
            ) : (
              <span className="text-muted-foreground">
                No date range selected
              </span>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={cancelCustomRange}
            >
              Cancel
            </Button>

            <Button
              disabled={
                !customRange?.from ||
                !customRange?.to
              }
              onClick={applyCustomRange}
            >
              Apply range
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}