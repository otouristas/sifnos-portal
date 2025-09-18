import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

const Villages = () => {
  const { data: villages, isLoading } = useQuery({
    queryKey: ["villages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("villages")
        .select("*, businesses(count)")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const villageHighlights = {
    apollonia: "Capital town with traditional architecture and pottery shops",
    artemonas: "Neoclassical mansions and authentic village atmosphere",
    kastro: "Medieval castle town with stunning sunset views",
    kamares: "Main port with beautiful beach and seafront tavernas",
    faros: "Lighthouse village with excellent swimming spots",
    vathi: "Secluded bay perfect for peaceful relaxation",
    "platis-gialos": "Popular beach resort with family-friendly facilities",
    chrissopigi: "Iconic monastery village with dramatic coastal views"
  };

  return (
    <Layout
      title="Sifnos Villages - Discover Authentic Greek Island Communities | TravelSifnos.gr"
      description="Explore the charming villages of Sifnos island. From medieval Kastro to the bustling port of Kamares, discover unique communities, local businesses, and authentic Greek island life."
      keywords="Sifnos villages, Apollonia, Artemonas, Kastro, Kamares, Greek island villages, traditional architecture, local communities"
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Discover Sifnos Villages</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each village on Sifnos has its own unique character and charm. From the 
            bustling capital of Apollonia to the medieval fortress of Kastro, 
            explore authentic Greek island communities.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villages?.map((village) => {
              const businessCount = village.businesses?.[0]?.count || 0;
              const highlight = villageHighlights[village.slug as keyof typeof villageHighlights] || village.description;
              
              return (
                <Card key={village.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Placeholder image - you can replace with actual village photos */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-primary/40" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-background/80 text-foreground">
                        <Building2 className="mr-1 h-3 w-3" />
                        {businessCount} businesses
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {village.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {highlight}
                    </p>
                    
                    <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={`/village/${village.slug}`}>
                        Explore {village.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Village Guide */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Village Guide</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Historic Villages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">Kastro</h4>
                  <p className="text-sm text-muted-foreground">Medieval fortress town with narrow alleys and spectacular sunsets</p>
                </div>
                <div>
                  <h4 className="font-semibold">Apollonia</h4>
                  <p className="text-sm text-muted-foreground">Traditional capital with Cycladic architecture and local museums</p>
                </div>
                <div>
                  <h4 className="font-semibold">Artemonas</h4>
                  <p className="text-sm text-muted-foreground">Neoclassical mansions and authentic island atmosphere</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coastal Villages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">Kamares</h4>
                  <p className="text-sm text-muted-foreground">Main port with beach, restaurants, and ferry connections</p>
                </div>
                <div>
                  <h4 className="font-semibold">Faros</h4>
                  <p className="text-sm text-muted-foreground">Fishing village with lighthouse and excellent tavernas</p>
                </div>
                <div>
                  <h4 className="font-semibold">Platis Gialos</h4>  
                  <p className="text-sm text-muted-foreground">Beach resort with hotels, restaurants, and water sports</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Getting Around the Villages</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Most villages are connected by local bus service, but renting a car or scooter 
            gives you the freedom to explore at your own pace. Many villages are also 
            connected by scenic hiking trails.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/category/vehicle-rentals">Find Vehicle Rentals</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/portal">Travel Information</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Villages;