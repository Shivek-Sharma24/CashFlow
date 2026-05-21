"use client";
import React, { useEffect } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import useGetPieChart from "@/Zustand/useGetPieChart";


function CategoryPieChart() {
  const { fetchCategoryData , isLoading , categoryData} = useGetPieChart();

    useEffect(() => {
    fetchCategoryData()
  }, [])

    const chartConfig = categoryData.reduce((acc, item) => {
    acc[item.category] = { label: item.category, color: item.color }
    return acc
  }, {} as Record<string, { label: string; color: string }>)
 
    if (isLoading) return (
    <Card className="bg-[#2D2D2D] lg:col-span-2">
      <CardContent className="flex items-center justify-center h-[300px]">
        <p className="text-gray-400">Loading...</p>
      </CardContent>
    </Card>
  )

    if (categoryData.length === 0) return (
    <Card className="bg-[#2D2D2D] lg:col-span-2">
      <CardContent className="flex items-center justify-center h-[300px]">
        <p className="text-gray-400">No expenses this month</p>
      </CardContent>
    </Card>
  )

  return (
    <Card className="bg-[#2D2D2D] lg:col-span-2">
      <CardHeader>
        <CardDescription className="text-md text-gray-400">
          By Category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex pie items-center justify-center mr-6 pr-4 lg:mr-0 lg:pr-0  lg:justify-start lg:gap-1 gap-0 md:gap-0">
          {/* Pie Chart */}
          <ChartContainer
            config={chartConfig}
            className="h-[250px]  max-w-[250px] lg:h-300px lg:min-w-[320px]"
          >
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                outerRadius={90}
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Legend */}
          <div className="flex flex-col gap-3">
            {categoryData.map((entry) => (
              <div key={entry.category} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />

                <span className="md:text-lg text-sm text-gray-300">
                  {entry.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(CategoryPieChart);
