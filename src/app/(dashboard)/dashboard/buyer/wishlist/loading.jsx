import { Skeleton } from "@/components/ui/skeleton"
import { ProductCardGridSkeleton } from "@/components/dashboard/ProductCardSkeleton"

export default function WishlistLoading() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6 px-6">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32 mt-1" />
        </div>
      </div>
      <ProductCardGridSkeleton count={6} />
    </div>
  )
}
