"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function WishlistClient({ wishlist }) {
  const [items, setItems] = useState(wishlist);

  const handleRemove = async (id) => {
    try {
      // TODO: call your delete API or server action
      // await removeFromWishlist(id)

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!items?.length) {
    return (
      <p className="p-6 text-muted-foreground">
        No wishlist items found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

      {items.map((item) => (
        <div
          key={item._id}
          className="rounded-2xl border bg-white shadow-sm overflow-hidden"
        >

          {/* Image */}
          <div className="relative h-52 w-full">
            <Image
              src={item.images?.[0]}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">

            <h2 className="font-semibold line-clamp-1">
              {item.title}
            </h2>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            <p className="text-primary font-bold text-lg">
              ৳{item.price.toLocaleString()}
            </p>

            <p className="text-xs text-muted-foreground">
              Seller: {item.sellerInfo?.name}
            </p>

            {/* Actions */}
            <div className="flex gap-2 pt-3">

              <Button className="flex-1 rounded-full">
                View
              </Button>

              <Button
                onClick={() => handleRemove(item._id)}
                size="icon"
                variant="outline"
                className="rounded-full"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
}