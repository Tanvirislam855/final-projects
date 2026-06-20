import SellerOrders from "@/components/dashboard/seller/SellerOrders";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export default async function SellerOrdersPage() {
  
  const user=await getUserSession();
 const res=await protectedFetch(`/api/seller?id=${user.id}`);
 const orders=await protectedFetch(`/api/seller-orders?sellerId=${user.id}`)

 
  return <SellerOrders res={res} orders={orders} />;
}