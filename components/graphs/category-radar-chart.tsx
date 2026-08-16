"use client";

import { useState } from "react";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
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
  CategorySpendingData,
} from "@/components/graphs/graph-data";

type Props = {
  data: CategorySpendingData[];
};

const chartConfig = {
  monthly: {
    label: "Monthly",
    color: "#22c55e",
  },

  yearly: {
    label: "Yearly",
    color: "#a855f7",
  },
} satisfies ChartConfig;

export default function CategoryRadarChart({
  data,
}: Props) {
  const [period, setPeriod] = useState<
    "monthly" | "yearly"
  >("monthly");

  /*
   * Only use the selected period.
   */
  const chartData = data.map((item) => ({
    name: item.name,
    value: item[period],
  }));

  /*
   * Change radar color with period.
   */
  const radarColor =
    period === "monthly"
      ? "#22c55e"
      : "#a855f7";

  return (
    <Card className="h-full">

      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">

        <div>
          <CardTitle>
            Category Spending Comparison
          </CardTitle>

          <p className="text-sm text-muted-foreground mt-1">
            {period === "monthly"
              ? "Monthly spending across categories"
              : "Yearly spending across categories"}
          </p>
        </div>

        {/* Monthly / Yearly Switch */}
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

      {/* Chart */}
      <CardContent>

        <ChartContainer
          config={chartConfig}
          className="mx-auto min-h-[300px] w-full max-h-[350px]"
        >

          <RadarChart
            data={chartData}
            margin={{
              top: 20,
              right: 40,
              bottom: 20,
              left: 40,
            }}
          >

            {/* Tooltip */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString("en-IN")}`
                  }
                />
              }
            />

            {/* Category names */}
            <PolarAngleAxis
              dataKey="name"
              tick={{
                fontSize: 12,
              }}
            />

            {/* Radar grid */}
            <PolarGrid />

            {/* Selected period */}
            <Radar
              dataKey="value"
              fill={radarColor}
              stroke={radarColor}
              fillOpacity={0.35}
              strokeWidth={2}
            />

          </RadarChart>

        </ChartContainer>

      </CardContent>

    </Card>
  );
}