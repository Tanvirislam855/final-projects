import { Recycle, Trees, Droplets, Factory, ShieldPlus, TentTree } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

const featured = {
  icon: Recycle,
  stat: "12k",
  statUnit: "kg of CO2 diverted / year",
  title: "Giving Items a Second Life",
  description: "By extending the lifecycle of everyday goods, our community directly prevents millions of kilograms of usable products from rotting in local trash piles.",
};

const benefits = [
  {
    icon: Trees,
    title: "Lower Environmental Impact",
    description: "Choosing pre-owned dramatically cuts down the heavy industrial processing required to manufacture brand-new goods from scratch.",
  },
  {
    icon: Droplets,
    title: "Eco-Conscious Resource Saving",
    description: "Every successful trade helps bypass the massive manufacturing supply chains that exhaust vital planetary water reserves.",
  },
  {
    icon: Factory,
    title: "Minimal Waste Delivery",
    description: "Skip the heavy retail boxes and industrial factory wrapping. Simple, direct peer-to-peer trading keeps excess plastic out of the loop.",
  },
];

export default function WhySecondHand() {
  return (
    <section className="overflow-hidden bg-gray-300 py-24">
      <div className="container mx-auto px-4">


        {/* Featured stat banner */}
        <FadeUp>
          <div className="mt-12 grid gap-8 rounded-[40px] bg-emerald-900 p-10 text-white md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-14">
            <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
              <span className="font-serif text-7xl leading-none md:text-8xl">
                {featured.stat}
              </span>
              <span className="text-sm uppercase tracking-wide text-white/60">
                {featured.statUnit}
              </span>
            </div>

            <div className="md:border-l md:border-white/15 md:pl-12">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <TentTree className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">{featured.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-white/70">
                {featured.description}
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Compact supporting list */}
        <StaggerContainer>
          <div className="mt-4 grid divide-y divide-[#E7E1D9] md:grid-cols-3 md:divide-x md:divide-y-0">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="group flex items-start gap-4 py-6 md:flex-col md:gap-3 md:px-8 md:py-8">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3E5F47]/20 text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                    <ShieldPlus className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl text-gray-700">
                        {benefit.stat}
                      </span>
                      <h3 className="text-base font-semibold text-[#161616]">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6F6F6F]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}