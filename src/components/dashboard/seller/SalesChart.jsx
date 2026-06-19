"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---- Mock data — swap with real data from your API later ----
const MOCK_SALES_DATA = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 1850 },
  { day: "Wed", sales: 1400 },
  { day: "Thu", sales: 2100 },
  { day: "Fri", sales: 2600 },
  { day: "Sat", sales: 3200 },
  { day: "Sun", sales: 2300 },
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

export default function SalesChart({ data = MOCK_SALES_DATA }) {
  const total = data.reduce((sum, d) => sum + d.sales, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Last 7 days &middot; Total:{" "}
          <span className="font-medium text-foreground">${total.toLocaleString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              className="text-xs fill-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
              className="text-xs fill-muted-foreground"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}