
import EmptyWishlist from "@/components/dashboard/Empty";
import WishlistClient from "@/components/dashboard/WishlistClient";
import { wishList } from "@/lib/api/wishList";
import { Heart } from "lucide-react";

export default async function WishlistPage() {
  const wishlistData = await wishList();

  if(wishlistData.length ===0){
    return <EmptyWishlist/>
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl" style={{ background: "rgba(62,95,71,0.1)" }}>
          <Heart className="w-5 h-5" style={{ color: "#3E5F47" }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {wishlistData.length} {wishlistData.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      <WishlistClient wishlist={wishlistData} />
    </div>
  );
}