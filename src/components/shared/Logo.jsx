import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Logo({ className }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold tracking-tight transition-colors hover:opacity-90 ${className || ""}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#385540]">
        <ShoppingBag className="h-5 w-5 text-white" />
      </div>
      <span className="text-[#385540]">NeoMarket</span>
    </Link>
  );
}
