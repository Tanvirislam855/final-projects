"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

// ---- 1. Mock Data: Sales & Revenue Growth ----
const SALES_GROWTH_DATA = [
  { month: "Jan", revenue: 12000, units: 80 },
  { month: "Feb", revenue: 18500, units: 120 },
  { month: "Mar", revenue: 16000, units: 110 },
  { month: "Apr", revenue: 24000, units: 160 },
  { month: "May", revenue: 29500, units: 210 },
  { month: "Jun", revenue: 35600, units: 240 },
];

// ---- 2. Mock Data: Product Stock vs Sales ----
const PRODUCT_STOCK_SALES_DATA = [
  { name: "iPhone 13", sold: 142, stock: 35 },
  { name: "Sony WH-1000", sold: 118, stock: 42 },
  { name: "Nike Air Max", sold: 97, stock: 55 },
  { name: "Dell XPS 13", sold: 64, stock: 18 },
  { name: "Kindle Paper", sold: 53, stock: 80 },
];

// ---- 3. Mock Data: Monthly Orders & GMV ----
const MONTHLY_ORDERS_DATA = [
  { month: "Jan", orders: 45, volume: 12000 },
  { month: "Feb", orders: 68, volume: 18500 },
  { month: "Mar", orders: 58, volume: 16000 },
  { month: "Apr", orders: 85, volume: 24000 },
  { month: "May", orders: 112, volume: 29500 },
  { month: "Jun", orders: 134, volume: 35600 },
];

// ---- 4. Mock Data: Category Sales Split (Distribution %) ----
const CATEGORY_DISTRIBUTION_DATA = [
  { name: "Electronics", value: 45, color: "#3E5F47" },
  { name: "Audio & Music", value: 25, color: "#4d7c5b" },
  { name: "Apparel & Shoes", value: 15, color: "#60a5fa" },
  { name: "Accessories", value: 10, color: "#fbbf24" },
  { name: "Books & Media", value: 5, color: "#f87171" },
];

// Custom Tooltip component matching AdminAnalytics
function CustomChartTooltip({ active, payload, label, prefix = "", suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-sm text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p, idx) => (
        <p key={idx} className="text-muted-foreground mt-0.5">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: p.color }} />
          {p.name}: <span className="font-semibold text-foreground">{prefix}{p.value.toLocaleString()}{suffix}</span>
        </p>
      ))}
    </div>
  );
}

export default function SalesAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Understand your store&apos;s growth, item stock levels, order volume trends, and category distribution.
          </p>
        </div>
      </FadeUp>

      <StaggerContainer>
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Chart 1: Sales & Revenue Growth Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sales & Revenue Growth</CardTitle>
                <CardDescription>Monthly performance showing revenue growth vs units sold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SALES_GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <Tooltip content={<CustomChartTooltip prefix="" suffix="" />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="revenue" name="Revenue (৳)" stroke="#3E5F47" strokeWidth={2.5} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="units" name="Units Sold" stroke="#fbbf24" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Chart 2: Product Stock vs Sales Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Product Stock vs Sales</CardTitle>
                <CardDescription>Sold quantities vs remaining stock of top-selling items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PRODUCT_STOCK_SALES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <Tooltip content={<CustomChartTooltip prefix="" suffix="" />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="sold" name="Units Sold" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="stock" name="Remaining Stock" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Chart 3: Monthly Orders & GMV Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Orders & Revenue Volume</CardTitle>
                <CardDescription>Total checkout orders count and gross merchandise volume (GMV)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_ORDERS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="orderGradSeller" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3E5F47" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3E5F47" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <Tooltip content={<CustomChartTooltip suffix="" />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Area type="monotone" dataKey="orders" name="Orders Checked Out" stroke="#3E5F47" strokeWidth={2.5} fill="url(#orderGradSeller)" />
                      <Area type="monotone" dataKey="volume" name="GMV (৳)" stroke="#4d7c5b" strokeWidth={1} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Chart 4: Category Sales Split Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Category Sales Split</CardTitle>
                <CardDescription>Percentage distribution of sales across different product categories</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="h-[250px] w-full max-w-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CATEGORY_DISTRIBUTION_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {CATEGORY_DISTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mt-4 text-xs w-full justify-center">
                  {CATEGORY_DISTRIBUTION_DATA.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground whitespace-nowrap">{cat.name} ({cat.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

        </div>
      </StaggerContainer>
    </div>
  );
}
