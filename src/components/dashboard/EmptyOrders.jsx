import { PackageX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="p-4 rounded-full" style={{ background: "rgba(62,95,71,0.08)" }}>
        <PackageX className="w-10 h-10" style={{ color: "#3E5F47" }} />
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        No Orders Found
      </h2>

      <p className="text-muted-foreground max-w-md text-sm">
        You haven&apos;t placed any orders yet. Start shopping to see your orders here.
      </p>

      <Button
        asChild
        className="mt-2 rounded-full px-6"
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