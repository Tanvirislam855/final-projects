import SellerOrders from "@/components/dashboard/seller/SellerOrders";

export default async function SellerOrdersPage() {
  // later replace with backend data
  const orders = [
    {
      _id: "1",
      productName: "iPhone 13",
      buyer: "Tanvir Hossain",
      email: "tanvir@gmail.com",
      price: 62000,
      status: "Pending",
      date: "2026-06-19",
    },
    {
      _id: "2",
      productName: "Gaming Chair",
      buyer: "Rakib Hasan",
      email: "rakib@gmail.com",
      price: 8500,
      status: "Processing",
      date: "2026-06-18",
    },
  ];

  return <SellerOrders orders={orders} />;
}