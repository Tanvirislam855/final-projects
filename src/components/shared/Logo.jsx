import Link from "next/link";
import {  ShoppingBasket } from "lucide-react";

export default function Logo({ className }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold tracking-tight text-white/70 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group ${className || ""}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
        <ShoppingBasket className="h-5 w-5 text-white" />
      </div>
      <span className="text-white">SwapBD</span>
    </Link>
  );
}
