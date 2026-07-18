import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeLeft, FadeRight, FadeUp, StaggerContainer, staggerItem } from "@/components/shared/AnimatedDiv";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeLeft>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ECEAE5] px-4 py-2">
                <Leaf className="h-4 w-4 text-[#3E5F47]" />
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  PRE-LOVED MARKETPLACE
                </span>
              </div>

              <h1 className="mt-8 max-w-xl section-title lg:text-7xl leading-tight">
               Better products. Longer lifespans.
              </h1>

              <p className="mt-8 max-w-xl section-subtitle leading-8">
                Your ultimate marketplace to buy and sell anything with total peace of mind.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={'/products'}>
                  <Button
                    className="h-14 rounded-full bg-[#3E5F47] px-8 hover:bg-[#304B38]"
                  >
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href={'/categories'}>
                  <Button
                    variant="secondary"
                    className="h-14 rounded-full bg-[#ECEAE5] px-8 hover:bg-[#dfddd8]"
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          </FadeLeft>

          <FadeRight>
            <div className="relative">
              <div className="absolute -left-10 top-20 h-48 w-48 rounded-full bg-[#E9E2D5]/50 blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px]">
                <Image
                  src="/store.jpg"
                  alt="Hero"
                  width={800}
                  height={800}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              <FadeUp delay={0.3}>
                <div className="absolute -bottom-6 left-0 rounded-[28px] border bg-white px-6 py-5 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECEAE5]">
                      <ShieldCheck className="h-6 w-6 text-[#3E5F47]" />
                    </div>

                    {/* <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        
                      </p>

                      <h3 className="text-2xl font-bold">
                        98% safe trades
                      </h3>
                    </div> */}
                  </div>
                </div>
              </FadeUp>
            </div>
          </FadeRight> 
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-24 border-t pt-12 flex items-center justify-center">
            <div className="grid gap-10 md:grid-cols-4">
              <div>
                <h2 className="text-5xl font-bold">200k+</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Listed Products
                </p>
              </div>

              <div>
                <h2 className="text-5xl text-green-950 font-bold">70k</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Verified Sellers
                </p>
              </div>

              <div>
                <h2 className="text-5xl text-green-950 font-bold">85%</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Success Rate
                </p>
              </div>

              <div>
                <h2 className="text-5xl text-amber-500 font-bold">40+</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Carbon Saved
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
