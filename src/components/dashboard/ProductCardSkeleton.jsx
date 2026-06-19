import { Skeleton } from "@/components/ui/skeleton"

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-24" style={{ backgroundColor: "#e8f0ea" }} />
        <Skeleton className="h-3 w-32" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function ProductCardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export { ProductCardSkeleton, ProductCardGridSkeleton }
