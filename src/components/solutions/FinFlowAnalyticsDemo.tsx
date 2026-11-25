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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      {/* Explicit Illustrative Demonstration Data Banner */}
      <div className="flex flex-col gap-2 border-b border-[#ff6d5a]/25 bg-white/[0.035] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-sm text-white">
          <Info className="h-4 w-4 shrink-0 text-[#ff8a73]" />
          <span>{FINFLOW_DEMO_ANALYTICS.disclaimer}</span>
        </div>
        <span className="shrink-0 rounded-full bg-[#ff6d5a]/15 px-3 py-1 font-mono text-xs font-semibold text-[#ff8a73]">
          Demo Data Only
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {/* Illustrative KPI Strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FINFLOW_DEMO_ANALYTICS.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="text-xs font-medium text-white/50">{kpi.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#ff8a73]">
                {kpi.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-8">
            <h5 className="font-display text-base font-bold text-white">
              Monthly Financial Trends (Illustrative)
            </h5>
            <p className="mt-0.5 text-xs text-white/50">
              Sample revenue, expenses, and net profit output
            </p>
            <div className="mt-4 h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={FINFLOW_DEMO_ANALYTICS.monthlyTrends}
                  margin={{ top: 6, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "12px",
                      color: "#ffffff",
                    }}
                  />
                  <Bar dataKey="revenue" name="Revenue" fill="#ff6d5a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Net Profit" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-4">
            <div>
              <h5 className="font-display text-base font-bold text-white">
                Expense Distribution
              </h5>
              <p className="mt-0.5 text-xs text-white/50">
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
                  <span className="flex items-center gap-2 text-white/75">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.category}
                  </span>
                  <span className="font-mono font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
