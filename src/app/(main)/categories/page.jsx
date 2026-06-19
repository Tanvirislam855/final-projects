import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import categories from "@/lib/data/categories";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl" style={{ background: "rgba(62,95,71,0.1)" }}>
          <LayoutGrid className="w-5 h-5" style={{ color: "#3E5F47" }} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Browse Categories
        </h1>
      </div>
      <p className="text-muted-foreground mb-12 ml-0">
        {categories.length} categories to explore
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={`/categories/${category.title}`}
            className="group rounded-2xl border bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#ECEAE5]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute top-3 right-3 translate-x-8 -translate-y-8 rounded-full bg-white/90 p-1.5 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4" style={{ color: "#3E5F47" }} />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#3E5F47] transition-colors">
                  {category.title}
                </h2>
                <span className="rounded-full bg-[#ECEAE5] px-2.5 py-0.5 text-xs font-medium text-[#3E5F47]">
                  {category.count}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}