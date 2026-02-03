import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const reviews = [
  {
    name: "Sarah M.",
    location: "Wesley Chapel",
    text: "Grand Oaks did an incredible job removing a dangerous oak hanging over our roof. They were fast, professional, and left the yard spotless!",
    rating: 5
  },
  {
    name: "James P.",
    location: "Land O' Lakes",
    text: "Highly recommend! Fair pricing and the crew really knows their stuff. Watching them work was impressive.",
    rating: 5
  },
  {
    name: "Linda K.",
    location: "Dade City",
    text: "Quick response for an emergency removal after the storm. So grateful for their hard work and kindness.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal text-center mb-16">
          What Our Neighbors Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-brand-offwhite border-none shadow-sm rounded-2xl">
              <CardHeader className="flex flex-row gap-1 pb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                ))}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic mb-6 text-lg">"{review.text}"</p>
                <div>
                  <p className="font-bold text-brand-charcoal">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
