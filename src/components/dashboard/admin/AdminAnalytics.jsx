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

// ---- 1. Mock Data: User Growth ----
const USER_GROWTH_DATA = [
  { month: "Jan", buyers: 150, sellers: 40 },
  { month: "Feb", buyers: 280, sellers: 65 },
  { month: "Mar", buyers: 420, sellers: 90 },
  { month: "Apr", buyers: 610, sellers: 120 },
  { month: "May", buyers: 850, sellers: 160 },
  { month: "Jun", buyers: 1100, sellers: 210 },
];

// ---- 2. Mock Data: Category Performance (Volume in thousand Taka) ----
const CATEGORY_PERFORMANCE_DATA = [
  { name: "Clothing", sales: 245, products: 380 },
  { name: "Home & Living", sales: 310, products: 450 },
  { name: "Electronics", sales: 180, products: 120 },
  { name: "Accessories", sales: 140, products: 290 },
  { name: "Personal Care", sales: 90, products: 150 },
];

// ---- 3. Mock Data: Monthly Orders ----
const MONTHLY_ORDERS_DATA = [
  { month: "Jan", orders: 320, volume: 180000 },
  { month: "Feb", orders: 480, volume: 290000 },
  { month: "Mar", orders: 540, volume: 350000 },
  { month: "Apr", orders: 790, volume: 540000 },
  { month: "May", orders: 980, volume: 720000 },
  { month: "Jun", orders: 1250, volume: 845900 },
];

// ---- 4. Mock Data: Top Categories (Distribution %) ----
const TOP_CATEGORIES_DATA = [
  { name: "Home & Living", value: 35, color: "#3E5F47" },
  { name: "Clothing", value: 28, color: "#4d7c5b" },
  { name: "Electronics", value: 18, color: "#60a5fa" },
  { name: "Accessories", value: 12, color: "#fbbf24" },
  { name: "Personal Care", value: 7, color: "#f87171" },
];

// Custom Tooltip component
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

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Understand registered user trends, category volume splits, monthly order fulfillment, and revenue growth.
          </p>
        </div>
      </FadeUp>

      <StaggerContainer>
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Chart 1: User Growth Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">User Growth Chart</CardTitle>
                <CardDescription>Cumulative registrations of buyers and sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={USER_GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="buyers" name="Buyers" stroke="#3E5F47" strokeWidth={2.5} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="sellers" name="Sellers" stroke="#fbbf24" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Chart 2: Category Performance Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Category Performance Chart</CardTitle>
                <CardDescription>Sales volume (in thousand ৳) vs product count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CATEGORY_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <Tooltip content={<CustomChartTooltip prefix="" suffix="" />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="sales" name="Sales Volume (k ৳)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="products" name="Products Listed" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Chart 3: Monthly Orders Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Orders & Revenue Chart</CardTitle>
                <CardDescription>Orders count and total gross merchandise value (GMV)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_ORDERS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3E5F47" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3E5F47" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                      <Tooltip content={<CustomChartTooltip suffix=" units/৳" />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Area type="monotone" dataKey="orders" name="Total Orders" stroke="#3E5F47" strokeWidth={2.5} fill="url(#orderGrad)" />
                      <Area type="monotone" dataKey="volume" name="Revenue Volume (৳)" stroke="#4d7c5b" strokeWidth={1} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Chart 4: Top Categories Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Categories Chart</CardTitle>
                <CardDescription>Distribution share (%) of products across main categories</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="h-[250px] w-full max-w-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={TOP_CATEGORIES_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {TOP_CATEGORIES_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mt-4 text-xs w-full justify-center">
                  {TOP_CATEGORIES_DATA.map((cat, idx) => (
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
