import Image from "next/image";
import { Leaf, ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Electronics",
    count: "3,214",
    image: "https://picsum.photos/500/500?random=1",
  },
  {
    title: "Furniture",
    count: "1,820",
    image: "https://picsum.photos/500/500?random=2",
  },
  {
    title: "Vehicles",
    count: "902",
    image: "https://picsum.photos/500/500?random=3",
  },
  {
    title: "Fashion",
    count: "4,406",
    image: "https://picsum.photos/500/500?random=4",
  },
  {
    title: "Mobile Phones",
    count: "2,110",
    image: "https://picsum.photos/500/500?random=5",
  },
];

export default function CategorySection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ECEAE5] px-4 py-2 mb-6">
            <Leaf className="h-4 w-4 text-[#3E5F47]" />
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Popular Categories
            </span>
          </div>

          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            Shop by Category
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Five fast-moving departments to start your search.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <div key={category.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[32px] bg-[#ECEAE5] shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
                />
                
                {/* Inner shadow/overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Arrow icon that slides in on hover */}
                <div className="absolute right-4 top-4 translate-x-4 -translate-y-4 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5 text-[#3E5F47]" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between px-2">
                <h3 className="font-semibold text-lg text-foreground transition-colors group-hover:text-[#3E5F47]">
                  {category.title}
                </h3>

                <span className="rounded-full bg-[#ECEAE5] px-3 py-1 text-xs font-medium text-[#3E5F47] transition-colors group-hover:bg-[#3E5F47] group-hover:text-white">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}