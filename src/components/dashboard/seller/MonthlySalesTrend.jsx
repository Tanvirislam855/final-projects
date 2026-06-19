"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---- Mock data — swap with real data from your API later ----
const MOCK_MONTHLY_DATA = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 15500 },
  { month: "Mar", sales: 14200 },
  { month: "Apr", sales: 18900 },
  { month: "May", sales: 21000 },
  { month: "Jun", sales: 19800 },
  { month: "Jul", sales: 24500 },
  { month: "Aug", sales: 26100 },
  { month: "Sep", sales: 23400 },
  { month: "Oct", sales: 27800 },
  { month: "Nov", sales: 31200 },
  { month: "Dec", sales: 35600 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">
        Sales: <span className="font-semibold text-foreground">${payload[0].value.toLocaleString()}</span>
      </p>
    </div>
  );
}

// Helper to compute month-over-month growth for the latest month
function getGrowth(data) {
  if (data.length < 2) return null;
  const last = data[data.length - 1].sales;
  const prev = data[data.length - 2].sales;
  if (prev === 0) return null;
  return (((last - prev) / prev) * 100).toFixed(1);
}

export default function MonthlySalesTrend({ data = MOCK_MONTHLY_DATA }) {
  const growth = getGrowth(data);
  const isPositive = growth !== null && Number(growth) >= 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Sales Trend</CardTitle>
        <CardDescription>
          Year to date
          {growth !== null && (
            <span className={isPositive ? "text-emerald-600" : "text-red-600"}>
              {" "}
              &middot; {isPositive ? "+" : ""}
              {growth}% vs last month
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs fill-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              className="text-xs fill-muted-foreground"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}