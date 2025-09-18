import { MapPin, Car, Bus, Waves, Star, Award, Users, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BusinessCardSkeleton } from "@/components/ui/skeleton-loader";
import { useBeaches } from "@/hooks/use-beaches";

// Beach interface now matches the hook data structure

const getBeachTypeIcon = (type: string) => {
  switch (type) {
    case "sandy": return "🏖️";
    case "pebble": return "🪨";
    case "mixed": return "🏝️";
    default: return "🌊";
  }
};

const getWindProtectionColor = (protection: string) => {
  switch (protection) {
    case "excellent": return "text-green-600";
    case "good": return "text-blue-600";
    case "moderate": return "text-yellow-600";
    case "poor": return "text-red-600";
    default: return "text-gray-600";
  }
};

const BeachesGrid = () => {
  const { data: beaches, isLoading } = useBeaches();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Beaches of Sifnos Island
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the pristine golden shores, crystal clear waters, and hidden coves of this enchanting Cycladic island
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Beautiful Beaches
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From Blue Flag certified shores to hidden coves, discover the perfect beach for your Sifnos adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beaches?.map((beach) => (
            <Card 
              key={beach.id}
              className="group hover-lift hover-glow cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 overflow-hidden"
              onClick={() => window.location.href = `/beaches/${beach.slug}`}
            >
              <CardHeader className="p-0">
                <div className="relative h-56 bg-muted">
                  <img 
                    src={beach.photos?.[0] || "/api/placeholder/600/400"} 
                    alt={`${beach.name} beach in Sifnos`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {beach.blue_flag && (
                      <Badge className="bg-blue-600 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Blue Flag
                      </Badge>
                    )}
                    {beach.featured && (
                      <Badge className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {getBeachTypeIcon(beach.beach_type)} {beach.beach_type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
                      <h3 className="font-bold text-lg mb-1">{beach.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{beach.location_description}</span>
                        <span>•</span>
                        <span>{beach.distance_from_apollonia}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {beach.description}
                  </p>

                  {/* Key Highlights */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {beach.key_highlights.slice(0, 2).map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Beach Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Water Quality:</span>
                        <p className="font-medium">{beach.water_quality}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Wind Protection:</span>
                        <p className={`font-medium capitalize ${getWindProtectionColor(beach.wind_protection)}`}>
                          {beach.wind_protection}
                        </p>
                      </div>
                    </div>

                    {/* Access & Parking */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {beach.access_method.includes('Bus') && <Bus className="h-3 w-3 text-green-600" />}
                        {beach.access_method.includes('car') && <Car className="h-3 w-3 text-blue-600" />}
                        <span className="text-muted-foreground">Access available</span>
                      </div>
                      {beach.parking_available && (
                        <Badge variant="outline" className="text-xs">
                          🅿️ Parking
                        </Badge>
                      )}
                    </div>

                    {/* Perfect For Tags */}
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {beach.perfect_for.slice(0, 3).map((tag) => (
                          <Badge key={tag} className="text-xs bg-secondary text-secondary-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                  <Button 
                    className="w-full bg-gradient-hero hover:bg-primary-dark transition-smooth"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/beaches/${beach.slug}`;
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    View Beach Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Beach Safety & Environmental Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Waves className="h-5 w-5" />
                Beach Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>• Use sunscreen (SPF 30+) and reapply every 2 hours, especially after swimming</p>
              <p>• Stay hydrated by drinking plenty of water throughout the day</p>
              <p>• Be cautious of strong winds which can create challenging swimming conditions</p>
              <p>• Not all beaches have lifeguards - supervise children at all times</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Users className="h-5 w-5" />
                Environmental Consciousness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>• Take all trash with you when leaving the beach</p>
              <p>• Avoid removing pebbles, shells, or any natural elements</p>
              <p>• Use reef-safe sunscreen to protect marine life</p>
              <p>• Respect local wildlife and marine ecosystems</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience Sifnos Beaches?</h3>
          <p className="text-muted-foreground mb-6">
            Find the perfect accommodation near your favorite beach for an unforgettable Sifnos experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/categories/accommodation">Browse Beach Hotels</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/villages">Explore All Villages</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { BeachesGrid };
