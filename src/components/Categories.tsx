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
import { CategoryCardSkeleton } from "@/components/ui/skeleton-loader";
import { useCategories } from "@/hooks/use-categories";
import { useBusinesses } from "@/hooks/use-businesses";

const iconMap: Record<string, React.ReactNode> = {
  'bed': <Bed className="h-8 w-8" />,
  'utensils-crossed': <UtensilsCrossed className="h-8 w-8" />,
  'palette': <Palette className="h-8 w-8" />,
  'camera': <Camera className="h-8 w-8" />,
  'car': <Car className="h-8 w-8" />,
  'heart': <Heart className="h-8 w-8" />,
  'building-2': <Building2 className="h-8 w-8" />,
  'waves': <Waves className="h-8 w-8" />
};

const colorClasses = [
  "text-primary",
  "text-accent", 
  "text-primary-light",
  "text-accent-light"
];

const Categories = () => {
  const { data: categories, isLoading } = useCategories();
  const { data: allBusinesses } = useBusinesses();

  if (isLoading) {
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
            {Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getCategoryBusinessCount = (categoryId: string) => {
    return allBusinesses?.filter(business => business.category_id === categoryId).length || 0;
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-fade-in">
          {categories?.map((category, index) => (
            <Card 
              key={category.id}
              className="group hover-lift hover-glow cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 focus-ring"
              onClick={() => window.location.href = `/categories/${category.slug}`}
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 ${colorClasses[index % colorClasses.length]}`}>
                  {iconMap[category.icon || 'building-2'] || <Building2 className="h-8 w-8" />}
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
                  {getCategoryBusinessCount(category.id)}
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