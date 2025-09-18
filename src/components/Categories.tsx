import { 
  Bed, 
  UtensilsCrossed, 
  Palette, 
  Camera, 
  Car, 
  Heart, 
  Building2, 
  Waves 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "accommodation",
    name: "Accommodation",
    description: "Hotels, villas, rooms & guesthouses",
    icon: <Bed className="h-8 w-8" />,
    count: 45,
    color: "text-primary"
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    description: "Restaurants, taverns, cafés & bakeries",
    icon: <UtensilsCrossed className="h-8 w-8" />,
    count: 68,
    color: "text-accent"
  },
  {
    id: "pottery-crafts", 
    name: "Pottery & Crafts",
    description: "Studios, workshops & traditional crafts",
    icon: <Palette className="h-8 w-8" />,
    count: 22,
    color: "text-primary-light"
  },
  {
    id: "experiences",
    name: "Experiences",
    description: "Tours, activities & local experiences",
    icon: <Camera className="h-8 w-8" />,
    count: 31,
    color: "text-accent-light"
  },
  {
    id: "rentals",
    name: "Vehicle Rentals",
    description: "Cars, scooters, ATVs & boat rentals",
    icon: <Car className="h-8 w-8" />,
    count: 18,
    color: "text-primary"
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Yoga, spas, retreats & wellness",
    icon: <Heart className="h-8 w-8" />,
    count: 12,
    color: "text-accent"
  },
  {
    id: "culture",
    name: "Culture",
    description: "Museums, history & cultural sites",
    icon: <Building2 className="h-8 w-8" />,
    count: 15,
    color: "text-primary-light"
  },
  {
    id: "beaches",
    name: "Beaches & Nature",
    description: "Beaches, hiking trails & natural sites",
    icon: <Waves className="h-8 w-8" />,
    count: 28,
    color: "text-accent-light"
  }
];

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Sifnos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic local businesses across all categories that make Sifnos special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group hover:shadow-strong transition-smooth cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20"
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-smooth ${category.color}`}>
                  {category.icon}
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-smooth">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {category.description}
                </p>
                <div className="text-2xl font-bold text-primary">
                  {category.count}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  businesses
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;