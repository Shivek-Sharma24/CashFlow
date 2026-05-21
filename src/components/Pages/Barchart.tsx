"use client";

import React, { useEffect, useMemo } from "react";
import { Bar, BarChart, Cell, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import useBarChart from "@/Zustand/useGetBarChart";

export const description = "A bar chart";
// const chartData = [
//   { day: "Mon", amount: 186 },
//   { day: "Tue", amount: 305 },
//   { day: "Wed", amount: 237 },
//   { day: "Thu", amount: 73 },
//   { day: "Fri", amount: 209 },
//   { day: "Sat", amount: 214 },
//   { day: "Sun", amount: 167 },
// ];
// const chartConfig = {
//   desktop: {
//     label: "Amount",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;
const chartConfig = {
  amount: { label: "Spent" },
} satisfies ChartConfig;

// interface DayData {
//   day: string
//   amount: number
// }
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getTodayIndex = () => {
  const jsDay = new Date().getDay(); // 0 = Sun, 1 = Mon ...
  return jsDay === 0 ? 6 : jsDay - 1;
};

const Barchart = () => {
  const { chartData, fetchWeeklyData } = useBarChart();
  useEffect(() => {
    fetchWeeklyData();
  }, []);
  const todayIndex = getTodayIndex();

  const filteredData = useMemo(() => {
    return DAYS.map((day, index) => {
      const found = chartData.find((d) => d.day === day);
      const isFuture = index > todayIndex;
      return {
        day,
        amount: isFuture ? 0 : (found?.amount ?? 0),
      };
    });
  }, [chartData, todayIndex]);

  if (chartData.length === 0)
    return (
      <Card className="bg-[#2D2D2D] lg:col-span-3">
        <CardContent className="flex items-center justify-center h-75">
          <p className="text-gray-400">No expenses this month</p>
        </CardContent>
      </Card>
    );
  return (
    <Card className="bg-[#2D2D2D] lg:col-span-3">
      <CardHeader>
        <CardDescription>Spending This Week.</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="amount" fill="#49D193" radius={4} maxBarSize={40} minPointSize={25}>
              {filteredData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#49D193"
                  opacity={index > todayIndex ? 0.15 : 1} 
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(Barchart);
