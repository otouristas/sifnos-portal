import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { BeachesGrid } from "@/components/beaches/beaches-grid";
import { BeachFAQ } from "@/components/beaches/beach-faq";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Award, MapPin, Car, Bus, Users } from "lucide-react";

const Beaches = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sifnos Beaches - Crystal Clear Waters & Golden Sands | TravelSifnos.gr</title>
        <meta 
          name="description" 
          content="Discover the most beautiful beaches in Sifnos. From Blue Flag Platis Gialos to secluded Fykiada, explore crystal clear waters, golden sands, and hidden coves of this Cycladic paradise." 
        />
        <meta 
          name="keywords" 
          content="Sifnos beaches, Blue Flag beach, Platis Gialos, Kamares beach, Vathi beach, Chrysopigi, Greek islands beaches, Cyclades beaches" 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Badge className="bg-blue-600 text-white px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                Blue Flag Certified Beaches
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Beaches of Sifnos Island
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Discover the pristine golden shores, crystal clear waters, and hidden coves of this enchanting Cycladic island. 
              From vibrant beach bars to secluded natural havens, Sifnos offers unforgettable coastal experiences.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Authentic Beaches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1</div>
                <div className="text-sm text-muted-foreground">Blue Flag Beach</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Beach Types</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beach Overview */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Waves className="h-6 w-6 text-primary" />
                      Why Sifnos Beaches Are Special
                    </h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Sifnos is blessed with some of the most beautiful beaches in the Cyclades, 
                        ranging from long stretches of golden sand to intimate coves framed by dramatic cliffs.
                      </p>
                      <p>
                        The island's varied coastline offers options for every preference – whether you seek 
                        vibrant beach bars and water sports or secluded spots for quiet relaxation.
                      </p>
                      <p>
                        Most beaches feature crystal-clear waters in stunning shades of blue and turquoise, 
                        with many easily accessible while others reward adventurous travelers with natural beauty and privacy.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-primary" />
                      Beach Access Guide
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Bus className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Public Transportation</h4>
                          <p className="text-sm text-muted-foreground">
                            Regular bus service connects Apollonia to major beaches like Platis Gialos, Kamares, and Vathi.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Car className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">By Car</h4>
                          <p className="text-sm text-muted-foreground">
                            Most beaches are accessible by car with parking available. Some require short walks from parking areas.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Hiking Adventures</h4>
                          <p className="text-sm text-muted-foreground">
                            Hidden beaches like Fykiada offer rewarding hikes through scenic coastal paths.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beaches Grid */}
      <BeachesGrid />
      
      {/* FAQ Section */}
      <BeachFAQ />
    </Layout>
  );
};

export default Beaches;
