import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { wishList } from "@/lib/api/wishList";
import { serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { Package, Heart, ShoppingBag } from "lucide-react";




export default async function BuyerDashboardOverview() {
  const user = await getUserSession();
  const orders = await serverFetch(`/api/orders?userId=${user.id}`);
  const wish_List = await wishList();

  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Orders</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold">{orders?.length || 0}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Orders placed so far
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Wishlist</CardTitle>
            <Heart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold">{wish_List?.length || 0}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Saved products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Purchases</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold">
              {orders?.length || 0}
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Latest bought items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {orders.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border-b pb-4 last:border-none"
              >
                <div>
                  <h3 className="font-medium">{product.productName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Product ID #{product.productId}
                  </p>
                </div>

                <span className="font-semibold">{product.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}