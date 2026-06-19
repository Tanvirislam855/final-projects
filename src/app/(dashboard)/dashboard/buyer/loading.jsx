import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingBag } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
            }}
          >
            <Skeleton className="h-10 w-10 rounded-xl bg-white/15" />
            <Skeleton className="h-10 w-20 mt-4 bg-white/15" />
            <Skeleton className="h-4 w-24 mt-2 bg-white/15" />
            <Skeleton className="h-3 w-32 mt-2 bg-white/15" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-xl" />
            <div>
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-48 mt-1" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div>
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
