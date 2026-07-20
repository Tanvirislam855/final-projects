import { HeartOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-gray-500">
      <div className="p-4 rounded-full" style={{ background: "rgba(62,95,71,0.08)" }}>
        <HeartOff className="w-10 h-10" style={{ color: "#6b21a8" }} />
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        Your cart is empty
      </h2>

      <p className="text-muted-foreground max-w-md text-sm">
        collect your  items with your love so, you can find them easily later.
      </p>

      <Button
        asChild
        className="rounded-full px-6 "
        style={{
          background: "linear-gradient(#6b21a8)",
        }}
      >
        <Link href="/products">
          See Products
        </Link>
      </Button>
    </div>
  );
}