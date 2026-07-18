import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight, Waypoints } from "lucide-react";
import categories from "@/lib/data/categories";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

export default function CategorySection() {
  return (
    <section className="py-24 overflow-hidden bg-gray-300">
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="max-w-xl mb-14 mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ECEAE5] px-4 py-2 mb-6">
              <Waypoints className="h-4 w-4 text-red-400" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                WHAT ARE YOU LOOKING FOR?
              </span>
            </div>

            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
              Discover Top Categories
            </h2>

            <p className="mt-6 text-lg text-gray-700">
              Start exploring our curated collections to buy or sell today.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.title}
                href={`/categories/${category.title}`}
                className="group block"
              >
                <StaggerItem>
                  <div className="relative overflow-hidden rounded-[32px] bg-[#ECEAE5] shadow-sm transition-all duration-300 group-hover:shadow-md">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={500}
                      height={500}
                      className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute right-4 top-4 translate-x-4 -translate-y-4 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-[#3E5F47]" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between px-2">
                    <h3 className="font-semibold text-lg text-foreground transition-colors group-hover:bg-emerald-500">
                      {category.title}
                    </h3>

                    <span className="rounded-full bg-[#ECEAE5] px-3 py-1 text-xs font-medium text-[#3E5F47] transition-colors group-hover:bg-amber-500 group-hover:text-white">
                      {category.description}
                    </span>
                  </div>
                </StaggerItem>
              </Link>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
