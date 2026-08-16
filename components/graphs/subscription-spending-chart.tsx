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
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type {
  SubscriptionSpendingData,
} from "@/components/graphs/graph-data";

type Props = {
  data: SubscriptionSpendingData[];
};

const chartConfig = {
  value: {
    label: "Spending",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export default function SubscriptionSpendingChart({
  data,
}: Props) {
  const [period, setPeriod] = useState<
    "monthly" | "yearly"
  >("monthly");

  const chartData = data.map((item) => ({
    name: item.name,
    value: item[period],
  }));

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Subscription Spending
          </CardTitle>

          <p className="text-sm text-muted-foreground mt-1">
            {period === "monthly"
              ? "Monthly cost of each subscription"
              : "Yearly cost of each subscription"}
          </p>
        </div>

        {/* Period Switch */}
        <div className="flex items-center rounded-lg border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setPeriod("monthly")}
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
            onClick={() => setPeriod("yearly")}
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
              bottom: 10,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-muted"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
              }
            />

            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[6, 6, 0, 0]}
              maxBarSize={70}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}