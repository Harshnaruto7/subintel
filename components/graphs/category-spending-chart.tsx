"use client";

import { useState } from "react";

import { Cell, Pie, PieChart } from "recharts";

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
  type ChartConfig,
} from "@/components/ui/chart";

import type {
  CategorySpendingData,
} from "@/components/graphs/graph-data";

type Props = {
  data: CategorySpendingData[];
};

const categoryColors = [
  "#22c55e", // Green
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#f59e0b", // Orange
  "#ef4444", // Red
];

export default function CategorySpendingChart({
  data,
}: Props) {
  const [period, setPeriod] = useState<
    "monthly" | "yearly"
  >("monthly");

  /*
   * Prepare chart data
   */
  const chartData = data.map((item, index) => ({
    name: item.name,
    value: item[period],
    fill:
      categoryColors[
        index % categoryColors.length
      ],
  }));

  /*
   * Chart configuration
   */
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
      {/* ================= HEADER ================= */}

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
          <PieChart>

            {/* ================= CUSTOM TOOLTIP ================= */}

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

                return (
                  <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
                    <div className="flex items-center gap-2">

                      {/* Color indicator */}
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                        style={{
                          backgroundColor:
                            item.fill,
                        }}
                      />

                      {/* Category */}
                      <span className="text-sm font-medium">
                        {item.name}
                      </span>

                    </div>

                    {/* Amount */}
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

            {/* ================= DONUT ================= */}

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              strokeWidth={0}
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                  />
                )
              )}
            </Pie>

            {/* ================= LEGEND ================= */}

            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey="name"
                />
              }
            />

          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}