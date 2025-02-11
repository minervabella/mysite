import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
    title: "Spring Sale",
    description: "Up to 50% off on selected items",
  },
  {
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
    title: "New Arrivals",
    description: "Check out our latest collection",
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Member Exclusive",
    description: "Join now for special discounts",
  },
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
            <p className="text-xl mb-8">{banner.description}</p>
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={() => setCurrentSlide((current) => (current - 1 + banners.length) % banners.length)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={() => setCurrentSlide((current) => (current + 1) % banners.length)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
