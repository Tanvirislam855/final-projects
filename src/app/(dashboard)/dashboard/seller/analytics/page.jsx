"use client";

import MonthlySalesTrend from "@/components/dashboard/seller/MonthlySalesTrend";
import SalesChart from "@/components/dashboard/seller/SalesChart";
import TopSellingProducts from "@/components/dashboard/seller/TopSellingProducts";

export default function SalesAnalytics() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Sales Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Visual representation of your performance as a seller.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <MonthlySalesTrend />
      </div>

      <TopSellingProducts />
    </div>
  );
}