"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

export default function AdminOverview({ dashboardData }) {
  const { totalOrder, totalProduct, totalRevenue, totalUser } = dashboardData;


  // Mock statistical data
  const stats = [
    {
      title: "Total Users",
      value: totalUser,
      change: "+12.5% this month",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Products",
      value: totalProduct,
      change: "+8.2% this month",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Total Orders",
      value: totalOrder,
      change: "+21.3% this month",
      icon: ShoppingCart,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Platform Revenue",
      value: totalRevenue,
      change: "+14.8% this month",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
  ];

  // Mock recent actions / logs
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "user",
      message: "New seller account 'EcoGrow' registered.",
      time: "10 minutes ago",
      badge: "New User",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    },
    {
      id: 2,
      type: "product",
      message: "Product 'Organic Cotton T-Shirt' flagged as reported by user #289.",
      time: "45 minutes ago",
      badge: "Reported",
      badgeColor: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    },
    {
      id: 3,
      type: "order",
      message: "Dispute raised for Order #8491: Item not received.",
      time: "2 hours ago",
      badge: "Dispute",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
    },
    {
      id: 4,
      type: "product",
      message: "New product 'Handmade Ceramic Mug' submitted for approval.",
      time: "3 hours ago",
      badge: "Pending Approval",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    },
    {
      id: 5,
      type: "user",
      message: "User 'johndoe@example.com' blocked due to policy violations.",
      time: "5 hours ago",
      badge: "Action Taken",
      badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <FadeUp>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor systems status, user registrations, products moderation, and sales activity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </FadeUp>

      {/* Grid of stats */}
      <StaggerContainer>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </CardTitle>
                    <div className={`rounded-2xl p-3 ${item.bg}`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{item.value}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-xs text-emerald-600 font-medium">{item.change}</span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </div>
      </StaggerContainer>

      {/* Quick Navigation Panels */}
      <FadeUp delay={0.1}>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">User Management</CardTitle>
              <CardDescription>Control roles, verify sellers, and manage blocks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full justify-between rounded-full bg-[#3E5F47] hover:bg-[#2F4A37] text-white">
                <Link href="/dashboard/admin/users">
                  Manage Users
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Product Moderation</CardTitle>
              <CardDescription>Approve catalog additions, review flags, delete listings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full justify-between rounded-full bg-[#3E5F47] hover:bg-[#2F4A37] text-white">
                <Link href="/dashboard/admin/products">
                  Manage Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Order & Analytics</CardTitle>
              <CardDescription>Resolve order disputes and view platform progress.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild className="w-full justify-between rounded-full bg-[#3E5F47] hover:bg-[#2F4A37] text-white">
                <Link href="/dashboard/admin/orders">
                  Manage Orders
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </FadeUp>

      {/* Recent Alerts & Log */}
      {/* <FadeUp delay={0.15}>
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/20">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-none">System Activities & Moderation Alerts</h3>
                <p className="text-xs text-muted-foreground mt-1">Real-time alerts requiring administrator review</p>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">
                    {act.type === "user" && <Users className="h-4.5 w-4.5 text-blue-600" />}
                    {act.type === "product" && <Package className="h-4.5 w-4.5 text-amber-600" />}
                    {act.type === "order" && <ShoppingCart className="h-4.5 w-4.5 text-emerald-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{act.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                  </div>
                </div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${act.badgeColor}`}>
                    {act.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp> */}
    </div>
  );
}
