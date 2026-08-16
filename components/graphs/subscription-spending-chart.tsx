"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";

import { getServiceIcon } from "@/lib/service-icons";

import type {
  SubscriptionSpendingData,
} from "@/components/graphs/graph-data";

type Props = {
  data: SubscriptionSpendingData[];
};

const chartConfig = {
  value: {
    label: "Spending",
  },
} satisfies ChartConfig;

/* =========================================================
   CUSTOM X-AXIS LABEL

   5 or fewer subscriptions:
   → Icon + service name

   More than 5:
   → Icon only
   ========================================================= */

function ServiceTick({
  x,
  y,
  payload,
  showNames,
}: {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
  showNames?: boolean;
}) {
  if (
    x === undefined ||
    y === undefined ||
    !payload
  ) {
    return null;
  }

  const service = getServiceIcon(payload.value);
  const Icon = service.icon;

  return (
    <g
      transform={`translate(${x},${y + 10})`}
    >
      <foreignObject
        x={showNames ? -40 : -18}
        y={0}
        width={showNames ? 80 : 36}
        height={showNames ? 34 : 30}
      >
        <div
          className={
            showNames
              ? "flex items-center justify-center gap-1.5"
              : "flex items-center justify-center"
          }
        >
          <Icon
            className="h-4 w-4 shrink-0"
            style={{
              color: service.color,
            }}
          />

          {showNames && (
            <span className="max-w-[55px] truncate text-xs text-muted-foreground">
              {payload.value}
            </span>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

export default function SubscriptionSpendingChart({
  data,
}: Props) {
  const [period, setPeriod] = useState<
    "monthly" | "yearly"
  >("monthly");

  /*
   * Change the displayed value
   * depending on Monthly / Yearly.
   */
  const chartData = data.map((item) => ({
    name: item.name,
    value: item[period],
  }));

  /*
   * Show names when there are 5 or fewer
   * subscriptions.

   * Show icons only when there are more than 5.
   */
  const showNames = chartData.length <= 5;

  /*
   * Monthly = Green
   * Yearly = Purple
   */
  const barColor =
    period === "monthly"
      ? "#22c55e"
      : "#a855f7";

  return (
    <Card className="h-full">
      {/* ================= HEADER ================= */}

      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Subscription Spending
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            {period === "monthly"
              ? "Monthly cost of each subscription"
              : "Yearly cost of each subscription"}
          </p>
        </div>

        {/* ================= PERIOD SWITCH ================= */}

        <div className="flex items-center rounded-lg border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() =>
              setPeriod("monthly")
            }
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              period === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>

          <button
            type="button"
            onClick={() =>
              setPeriod("yearly")
            }
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              period === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
          </button>
        </div>
      </CardHeader>

      {/* ================= CHART ================= */}

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: showNames ? 35 : 25,
            }}
          >
            {/* ================= GRID ================= */}

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-muted"
            />

            {/* ================= X AXIS ================= */}

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0}
              tick={
                <ServiceTick
                  showNames={showNames}
                />
              }
            />

            {/* ================= TOOLTIP ================= */}

            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (
                  !active ||
                  !payload ||
                  payload.length === 0
                ) {
                  return null;
                }

                const item =
                  payload[0]?.payload;

                if (!item) {
                  return null;
                }

                const service =
                  getServiceIcon(item.name);

                const Icon =
                  service.icon;

                return (
                  <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
                    {/* Service */}

                    <div className="flex items-center gap-2">
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{
                          color:
                            service.color,
                        }}
                      />

                      <span className="text-sm font-medium">
                        {item.name}
                      </span>
                    </div>

                    {/* Price */}

                    <div className="mt-1 text-sm font-semibold">
                      ₹
                      {Number(
                        item.value
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>
                );
              }}
            />

            {/* ================= BARS ================= */}

            <Bar
              dataKey="value"
              fill={barColor}
              radius={[
                6,
                6,
                0,
                0,
              ]}
              maxBarSize={70}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}