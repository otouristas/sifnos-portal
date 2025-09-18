import { Star, MapPin, Phone, Globe, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Business {
  id: string;
  name: string;
  category: string;
  village: string;
  description: string;
  rating: number;
  priceRange: string;
  tags: string[];
  phone?: string;
  website?: string;
  season?: string;
  image: string;
  verified: boolean;
}

// Mock data for demonstration
const featuredBusinesses: Business[] = [
  {
    id: "artemon-pottery",
    name: "Artemon Pottery Workshop",
    category: "Pottery & Crafts",
    village: "Artemonas", 
    description: "Traditional pottery workshop creating authentic Sifnian ceramics using local clay and time-honored techniques.",
    rating: 4.9,
    priceRange: "€€",
    tags: ["Traditional", "Handmade", "Local Clay"],
    phone: "+30 22840 31XXX",
    season: "Apr-Oct",
    image: "/api/placeholder/400/300",
    verified: true
  },
  {
    id: "omega3-taverna",
    name: "Omega3 Traditional Taverna",
    category: "Food & Drink",
    village: "Platis Gialos",
    description: "Seaside taverna serving fresh seafood and traditional Sifnian specialties with stunning sunset views.",
    rating: 4.7,
    priceRange: "€€€",
    tags: ["Seafood", "Sunset Views", "Family-run"],
    phone: "+30 22840 71XXX",
    website: "omega3sifnos.com",
    season: "May-Oct",
    image: "/api/placeholder/400/300",
    verified: true
  },
  {
    id: "kastro-suites",
    name: "Kastro Traditional Suites",
    category: "Accommodation",
    village: "Kastro",
    description: "Luxury suites in restored medieval houses with panoramic sea views and authentic island architecture.",
    rating: 4.8,
    priceRange: "€€€€",
    tags: ["Luxury", "Sea View", "Historic"],
    phone: "+30 22840 51XXX",
    website: "kastrosuites.gr",
    season: "Apr-Nov",
    image: "/api/placeholder/400/300",
    verified: true
  }
];

const FeaturedBusinesses = () => {
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
          {featuredBusinesses.map((business) => (
            <Card 
              key={business.id}
              className="group hover:shadow-strong transition-smooth cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={business.image} 
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
                      {business.priceRange}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{business.rating}</span>
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
                      <span className="text-primary font-medium">{business.category}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {business.village}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {business.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {business.tags.map((tag) => (
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