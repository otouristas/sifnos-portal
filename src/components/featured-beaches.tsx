import { MapPin, Award, Waves, Camera } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BusinessCardSkeleton } from "@/components/ui/skeleton-loader";
import { useFeaturedBeaches } from "@/hooks/use-beaches";

const getBeachTypeIcon = (type: string) => {
  switch (type) {
    case "sandy": return "🏖️";
    case "pebble": return "🪨";
    case "mixed": return "🏝️";
    default: return "🌊";
  }
};

const FeaturedBeaches = () => {
  const { data: beaches, isLoading } = useFeaturedBeaches();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Beautiful Sifnos Beaches
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover pristine shores, crystal clear waters, and hidden coves
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Badge className="bg-blue-600 text-white px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Blue Flag Certified
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Beautiful Sifnos Beaches
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From golden sandy shores to dramatic rocky coves, discover the island's most stunning coastal destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beaches?.map((beach) => (
            <Card 
              key={beach.id}
              className="group hover-lift hover-glow cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={beach.photos?.[0] || "/api/placeholder/400/300"} 
                    alt={`${beach.name} beach in Sifnos`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {beach.blue_flag && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Blue Flag
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                      {getBeachTypeIcon(beach.beach_type)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                      <h3 className="font-bold text-sm mb-1">{beach.name}</h3>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>{beach.location_description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {beach.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {beach.perfect_for.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-hero hover:bg-primary-dark transition-smooth"
                    size="sm"
                  >
                    <Waves className="h-3 w-3 mr-2" />
                    Explore Beach
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
            asChild
          >
            <a href="/beaches">
              <Camera className="h-4 w-4 mr-2" />
              View All Beaches
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBeaches;
