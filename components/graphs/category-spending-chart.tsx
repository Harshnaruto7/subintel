"use client";

import { useState } from "react";

import {
  Cell,
  Pie,
  PieChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

const categoryColors = [
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
];

export default function CategorySpendingChart({
  data,
}: Props) {
  const [period, setPeriod] = useState<
    "monthly" | "yearly"
  >("monthly");

  const chartData = data.map((item, index) => ({
    name: item.name,
    value: item[period],
    fill: categoryColors[index % categoryColors.length],
  }));

  const chartConfig = data.reduce(
    (config, item, index) => {
      config[item.name] = {
        label: item.name,
        color:
          categoryColors[
            index % categoryColors.length
          ],
      };

      return config;
    },
    {} as ChartConfig
  );

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Spending by Category
          </CardTitle>

          <p className="text-sm text-muted-foreground mt-1">
            {period === "monthly"
              ? "Where your monthly subscription money goes"
              : "Where your yearly subscription money goes"}
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
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="name"
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
              }
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                />
              ))}
            </Pie>

            <ChartLegend
              content={
                <ChartLegendContent nameKey="name" />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}