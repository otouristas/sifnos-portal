import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building,
  Utensils,
  Palette,
  Map,
  Car,
  Landmark,
  University,
  Heart,
  ArrowRight
} from "lucide-react";

const iconMap = {
  building: Building,
  utensils: Utensils,
  palette: Palette,
  map: Map,
  car: Car,
  landmark: Landmark,
  university: University,
  heart: Heart,
};

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*, businesses(count)")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout
      title="Business Categories in Sifnos - Find Local Services | TravelSifnos.gr"
      description="Explore all business categories on Sifnos island. Find accommodation, restaurants, pottery workshops, experiences, rentals, and local services. Complete directory of Sifnos businesses."
      keywords="Sifnos categories, accommodation, restaurants, pottery workshops, experiences, car rental, culture, museums, wellness, local services"
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Explore Sifnos by Category</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the diverse businesses and services that make Sifnos special. 
            From traditional pottery workshops to authentic tavernas, find exactly 
            what you're looking for.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="text-center">
                  <div className="h-12 w-12 bg-muted rounded-lg mx-auto mb-4"></div>
                  <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Building;
              const businessCount = category.businesses?.[0]?.count || 0;
              
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex justify-center">
                      <Badge variant="secondary">
                        {businessCount} {businessCount === 1 ? 'business' : 'businesses'}
                      </Badge>
                    </div>
                    <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={`/category/${category.slug}`}>
                        Explore Category
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new businesses to our directory. If you know of a 
            business that should be listed, let us know!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/submit-business">Suggest a Business</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;