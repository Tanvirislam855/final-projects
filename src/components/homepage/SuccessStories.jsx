import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

const stories = [
  {
    quote: "I have been looking for a specific vintage jacket for over a year and finally found it here in perfect condition for an amazing price",
    name: "Sarah J.",
    role: "Buyer San Francisco, CA",
    // image: "https://i.pravatar.cc/150?img=32",
  },
  {
    quote: "Listing my antique clock collection was a breeze. I had several serious inquiries within hours and sold three pieces by end of the day.",
    name: "Leo M.",
    role: "Seller • Dhaka ,Bangladesh",
    // image: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote: "I furnished my new apartment for under $600 entirely through ReSell Hub. Better quality than anything new at the same price.",
    name: "Messi.",
    role: "Buyer • Argentina,",
    // image: "https://i.pravatar.cc/150?img=5",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-5 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="max-w-xl mx-auto text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#7B6A58]">TESTIMONIALS</p>
            <h2 className="section-title text-[#181818]">Community Voices</h2>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {stories.map((story) => (
              <StaggerItem key={story.name}>
                <div className="rounded-[32px] border border-[#E7E1D9] bg-[#FCFBF8] p-8 transition-all duration-300 hover:-translate-y-1">
                  <Quote className="h-6 w-6 text-[#D97745]" />

                  <p className="mt-8 text-[18px] leading-10 text-[#2B2B2B]">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  <div className="my-8 h-px bg-[#ECE7E0]" />

                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={story.image} />
                      <AvatarFallback>{story.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="text-xl font-medium text-[#1A1A1A]">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.role}</p>
                    </div>
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
