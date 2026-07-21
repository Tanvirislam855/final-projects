import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

export default async function SellerDashboardOverview() {
  const user=await getUserSession();
  const data=await protectedFetch(`/api/seller?id=${user.id}`);
  const {
  processingOrders,
  totalProducts,
  totalRevenue,
  totalSales
} = data;

const stats = [
  {
    title: "Total Products",
    value: totalProducts,
    icon: Package,
    color: "text-black-600",
    bg: "bg-red-50",
    description: "Products listed",
  },
  {
    title: "Total Sales",
    value: totalSales,
    icon: ShoppingCart,
    color: "text-gray-600",
    bg: "bg-amber-50",
    description: "customer orders",
  },
  {
    title: "Total Revenue",
    value: `৳${totalRevenue.toLocaleString()}`,
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-red-50",
    description: "Total earnings ",
  },
  {
    title: "Pending Orders",
    value: processingOrders,
    icon: Clock3,
    color: "text-orange-600",
    bg: "bg-orange-50",
    description: "Orders action",
  },
];
  
  return (
    <div className="space-y-8">
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor your products, orders, and earnings.
          </p>
        </div>
      </FadeUp>

      <StaggerContainer>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </CardTitle>
                    <div className={`rounded-full p-3 ${item.bg}`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{item.value}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </div>
      </StaggerContainer>
    </div>
  );
}
