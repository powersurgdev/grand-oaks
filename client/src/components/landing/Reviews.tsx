import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Sarah M.",
    location: "Wesley Chapel",
    text: "Grand Oaks did an incredible job removing a dangerous oak hanging over our roof. They were fast, professional, and left the yard spotless!",
    rating: 5,
    source: "Google",
    date: "2 weeks ago"
  },
  {
    name: "James P.",
    location: "Land O' Lakes",
    text: "Highly recommend! Fair pricing and the crew really knows their stuff. Watching them work was impressive.",
    rating: 5,
    source: "Facebook",
    date: "1 month ago"
  },
  {
    name: "Linda K.",
    location: "Dade City",
    text: "Quick response for an emergency removal after the storm. So grateful for their hard work and kindness.",
    rating: 5,
    source: "Thumbtack",
    date: "3 weeks ago"
  },
  {
    name: "Robert T.",
    location: "Zephyrhills",
    text: "Best price I found for lot clearing. They had the right equipment and finished way faster than I expected.",
    rating: 5,
    source: "Google",
    date: "2 months ago"
  },
  {
    name: "Michelle D.",
    location: "Lutz",
    text: "Very professional team. They trimmed our large palms and cleaned up everything perfectly. Will use again.",
    rating: 5,
    source: "Facebook",
    date: "5 days ago"
  }
];

const SourceBadge = ({ source }: { source: string }) => {
  let styles = "bg-gray-100 text-gray-600";
  if (source === "Google") styles = "bg-blue-50 text-blue-600";
  if (source === "Facebook") styles = "bg-blue-50 text-[#1877F2]";
  if (source === "Thumbtack") styles = "bg-sky-50 text-[#009FD6]";

  return (
    <span className={cn("text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1", styles)}>
      {source === "Google" && <span className="font-sans font-bold text-lg leading-none mb-0.5">G</span>}
      {source === "Facebook" && <span className="font-sans font-bold text-lg leading-none mb-0.5">f</span>}
      {source} Reviews
    </span>
  );
};

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-brand-green font-bold tracking-widest uppercase mb-2 text-sm">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Trusted by Your Neighbors
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what homeowners across Pasco County are saying on Google, Facebook, and Thumbtack.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-8 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full py-2">
                    <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl flex flex-col">
                      <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <div className="flex flex-col">
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                            ))}
                          </div>
                          <SourceBadge source={review.source} />
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <p className="text-gray-700 leading-relaxed mb-6">"{review.text}"</p>
                        <div className="mt-auto border-t border-gray-50 pt-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-sm">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-brand-charcoal text-sm">{review.name}</p>
                            <p className="text-xs text-gray-500">{review.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2 bg-white border-gray-200 text-brand-charcoal hover:bg-brand-green hover:text-white" />
            <CarouselNext className="right-0 translate-x-1/2 bg-white border-gray-200 text-brand-charcoal hover:bg-brand-green hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
