import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroImage from "@/assets/hero-video-placeholder.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image (Video placeholder) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Boxing training scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bebas text-foreground mb-6 leading-tight">
          The Ultimate Destination for Fight Fans
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-inter max-w-2xl mx-auto">
          Live Events, Exclusive Fights, and Unmissable Action. All in One Place.
        </p>
        <Button variant="electric" size="lg" className="text-lg px-8 py-4 h-auto">
          <Play className="w-6 h-6 mr-2" />
          Subscribe Now
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-electric-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-electric-blue rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};