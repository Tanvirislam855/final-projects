import WishlistClient from "@/components/dashboard/WishlistClient";
import { wishList } from "@/lib/api/wishList";

export default async function WishlistPage() {
  const wishlist = await wishList();

  return (
    <div>
      <h1 className="text-2xl font-bold p-6">My Wishlist</h1>

      <WishlistClient wishlist={wishlist} />
    </div>
  );
}