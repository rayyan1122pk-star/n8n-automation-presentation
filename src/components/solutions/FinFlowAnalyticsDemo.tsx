"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Info } from "lucide-react";
import { FINFLOW_DEMO_ANALYTICS } from "@/content/solutions";

export function FinFlowAnalyticsDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
      {/* Explicit Illustrative Demonstration Data Banner */}
      <div className="flex flex-col gap-2 border-b border-[#DDD6FE] bg-[#FAF9FE] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-sm text-[#4C1D95]">
          <Info className="h-4 w-4 shrink-0 text-[#7C3AED]" />
          <span>{FINFLOW_DEMO_ANALYTICS.disclaimer}</span>
        </div>
        <span className="shrink-0 rounded-full bg-[#EDE9FE] px-3 py-1 font-mono text-xs font-semibold text-[#6D28D9]">
          Demo Data Only
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {/* Illustrative KPI Strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FINFLOW_DEMO_ANALYTICS.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-[#ECEBF2] bg-[#FAFAFC] p-5"
            >
              <p className="text-xs font-medium text-[#6B7280]">{kpi.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-[#18181B]">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#7C3AED]">
                {kpi.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-xl border border-[#ECEBF2] bg-white p-5 lg:col-span-8">
            <h5 className="font-display text-base font-bold text-[#18181B]">
              Monthly Financial Trends (Illustrative)
            </h5>
            <p className="mt-0.5 text-xs text-[#6B7280]">
              Sample revenue, expenses, and net profit output
            </p>
            <div className="mt-4 h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={FINFLOW_DEMO_ANALYTICS.monthlyTrends}
                  margin={{ top: 6, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECEBF2" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "12px",
                      color: "#18181B",
                    }}
                  />
                  <Bar dataKey="revenue" name="Revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#C4B5FD" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Net Profit" fill="#18181B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-[#ECEBF2] bg-white p-5 lg:col-span-4">
            <div>
              <h5 className="font-display text-base font-bold text-[#18181B]">
                Expense Distribution
              </h5>
              <p className="mt-0.5 text-xs text-[#6B7280]">
                Illustrative category breakdown
              </p>
            </div>

            <div className="my-2 h-[170px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={FINFLOW_DEMO_ANALYTICS.expenseDistribution}
                    dataKey="value"
                    nameKey="category"
                    innerRadius={46}
                    outerRadius={72}
                    paddingAngle={3}
                  >
                    {FINFLOW_DEMO_ANALYTICS.expenseDistribution.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5">
              {FINFLOW_DEMO_ANALYTICS.expenseDistribution.map((item) => (
                <div key={item.category} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-[#374151]">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.category}
                  </span>
                  <span className="font-mono font-medium text-[#18181B]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
