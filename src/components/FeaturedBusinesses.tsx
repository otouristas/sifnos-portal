import { Star, MapPin, Phone, Globe, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BusinessCardSkeleton } from "@/components/ui/skeleton-loader";
import { useFeaturedBusinesses } from "@/hooks/use-businesses";

const FeaturedBusinesses = () => {
  const { data: businesses, isLoading } = useFeaturedBusinesses();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Businesses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover verified local businesses that showcase the authentic spirit of Sifnos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover verified local businesses that showcase the authentic spirit of Sifnos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses?.map((business) => (
            <Card 
              key={business.id}
              className="group hover:shadow-strong transition-smooth cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 overflow-hidden"
              onClick={() => window.location.href = `/business/${business.slug}`}
            >
              <CardHeader className="p-0">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={business.photo_urls?.[0] || "/api/placeholder/400/300"} 
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {business.verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        Verified
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {business.price_range || "€€"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth mb-1">
                      {business.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="text-primary font-medium">{business.categories.name}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {business.villages.name}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {business.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {business.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    {business.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </div>
                    )}
                    
                    {business.website && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{business.website}</span>
                      </div>
                    )}
                    
                    {business.season && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Open: {business.season}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-gradient-hero hover:bg-primary-dark transition-smooth"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/business/${business.slug}`;
                    }}
                  >
                    View Details
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
          >
            View All Businesses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;