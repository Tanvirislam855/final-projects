import { HeartOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="p-4 rounded-full" style={{ background: "rgba(62,95,71,0.08)" }}>
        <HeartOff className="w-10 h-10" style={{ color: "#3E5F47" }} />
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        Your wishlist is empty
      </h2>

      <p className="text-muted-foreground max-w-md text-sm">
        Save items you love so you can find them easily later.
      </p>

      <Button
        asChild
        className="rounded-full px-6"
        style={{
          background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
        }}
      >
        <Link href="/products">
          Browse Products
        </Link>
      </Button>
    </div>
  );
}