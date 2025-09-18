import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/sifnos-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Travelsifnos.gr
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              The most complete business directory for beautiful Sifnos island. 
              Discover authentic experiences, local businesses, and hidden gems.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-strong p-2">
              <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search businesses, restaurants, accommodation..."
                className="flex-1 pl-14 pr-4 py-3 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-gradient-hero hover:bg-primary-dark transition-smooth"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-2xl font-bold">200+</div>
              <div className="text-sm uppercase tracking-wide">Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm uppercase tracking-wide">Villages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm uppercase tracking-wide">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;