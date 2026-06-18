import { PackageX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      
      <PackageX className="w-12 h-12 text-muted-foreground" />

      <h2 className="text-xl font-semibold">
        No Orders Found
      </h2>

      <p className="text-muted-foreground max-w-md">
        You haven’t placed any orders yet. Start shopping to see your orders here.
      </p>

     
      <Button asChild className="mt-2 rounded-full">
        <Link href="/products">
          Browse Products
        </Link>
      </Button>

    </div>
  );
}