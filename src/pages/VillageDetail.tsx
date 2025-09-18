import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Building2, Users, Star, Camera, Bus, Car, Utensils, Bed } from "lucide-react";
import Layout from "@/components/Layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapLocation, sifnosCoordinates } from "@/components/ui/map-location";
import { useVillage } from "@/hooks/use-villages";
import { useBusinesses } from "@/hooks/use-businesses";

const VillageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: village, isLoading: villageLoading } = useVillage(slug || '');
  const { data: businesses, isLoading: businessesLoading } = useBusinesses({
    village: slug
  });

  if (villageLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!village) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Village Not Found</h1>
          <p className="text-muted-foreground">The village you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const coordinates = sifnosCoordinates[village.slug as keyof typeof sifnosCoordinates] || [36.9747, 24.7197];

  // Village-specific information
  const villageInfo = {
    apollonia: {
      highlights: ['Island Capital', 'Traditional Architecture', 'Vibrant Nightlife', 'Museums', 'Shopping'],
      specialties: ['Traditional Cycladic architecture', 'Local museums and galleries', 'Vibrant nightlife scene', 'Authentic pottery shops'],
      transportation: 'Central bus hub with connections to all villages',
      bestFor: ['First-time visitors', 'Culture enthusiasts', 'Nightlife lovers', 'Shopping']
    },
    kamares: {
      highlights: ['Main Port', 'Sandy Beach', 'Ferry Terminal', 'Restaurants', 'Convenient'],
      specialties: ['Main arrival point', 'Beautiful sandy beach', 'Excellent tavernas', 'All essential services'],
      transportation: 'Ferry terminal and bus connections to all parts of the island',
      bestFor: ['Convenient arrivals', 'Beach lovers', 'Family holidays', 'First nights']
    },
    kastro: {
      highlights: ['Medieval Village', 'Historic Architecture', 'Sunset Views', 'Archaeological', 'Romantic'],
      specialties: ['Medieval fortress architecture', 'Spectacular sunset views', 'Archaeological museum', 'Romantic atmosphere'],
      transportation: 'Regular bus service from Apollonia, scenic walking paths',
      bestFor: ['History lovers', 'Romantic getaways', 'Photography', 'Cultural tourism']
    },
    artemonas: {
      highlights: ['Neoclassical Architecture', 'Elegant Mansions', 'Traditional', 'Peaceful', 'Cultural'],
      specialties: ['Beautiful neoclassical mansions', 'Traditional pottery workshops', 'Peaceful atmosphere', 'Cultural heritage'],
      transportation: 'Walking distance from Apollonia, bus connections available',
      bestFor: ['Architecture enthusiasts', 'Peaceful retreats', 'Cultural experiences', 'Photography']
    },
    vathi: {
      highlights: ['Peaceful Bay', 'Pottery Village', 'Sandy Beach', 'Tranquil', 'Archaeological'],
      specialties: ['Traditional pottery center', 'Sheltered sandy beach', 'Prehistoric archaeological site', 'Peaceful atmosphere'],
      transportation: 'Regular bus service from Apollonia, scenic coastal road',
      bestFor: ['Pottery enthusiasts', 'Peaceful holidays', 'Beach lovers', 'Cultural tourism']
    },
    faros: {
      highlights: ['Fishing Village', 'Three Beaches', 'Lighthouse', 'Traditional', 'Coastal'],
      specialties: ['Traditional fishing village', 'Three beautiful beaches', 'Ancient lighthouse site', 'Excellent seafood'],
      transportation: 'Bus service from Apollonia, coastal walking paths to other beaches',
      bestFor: ['Beach hoppers', 'Seafood lovers', 'Traditional atmosphere', 'Coastal walks']
    },
    chrissopigi: {
      highlights: ['Iconic Monastery', 'Most Photographed', 'Religious Site', 'Dramatic Views', 'Spiritual'],
      specialties: ['Famous monastery of Panagia Chrissopigi', 'Most photographed location', 'Annual religious festival', 'Dramatic coastal setting'],
      transportation: 'Bus to Faros then walking path, or direct road access',
      bestFor: ['Photography', 'Religious tourism', 'Scenic beauty', 'Cultural experiences']
    }
  };

  const info = villageInfo[village.slug as keyof typeof villageInfo] || {
    highlights: ['Traditional', 'Authentic', 'Scenic'],
    specialties: ['Authentic Greek island experience'],
    transportation: 'Connected by local bus service',
    bestFor: ['Authentic experiences']
  };

  const accommodationBusinesses = businesses?.filter(b => b.categories.slug === 'accommodation') || [];
  const restaurantBusinesses = businesses?.filter(b => b.categories.slug === 'food-drink') || [];
  const experienceBusinesses = businesses?.filter(b => !['accommodation', 'food-drink'].includes(b.categories.slug)) || [];

  return (
    <Layout>
      <Helmet>
        <title>{village.name} Village - Sifnos | TravelSifnos.gr</title>
        <meta 
          name="description" 
          content={`Discover ${village.name} village in Sifnos. ${village.description} Find accommodation, restaurants, and local businesses in this authentic Greek island destination.`} 
        />
        <meta 
          name="keywords" 
          content={`${village.name} Sifnos, ${info.highlights.join(', ')}, Greek island village, Cyclades, accommodation, restaurants`} 
        />
        <meta property="og:title" content={`${village.name} Village - Authentic Sifnos`} />
        <meta property="og:description" content={village.description} />
        <meta property="og:type" content="place" />
      </Helmet>

      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Villages", href: "/villages" },
            { label: village.name, current: true }
          ]}
          className="mb-6"
        />

        {/* Village Hero */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-primary/10">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{village.name}</h1>
                  {village.name === 'Apollonia' && (
                    <Badge className="bg-primary text-primary-foreground mt-2">
                      Island Capital
                    </Badge>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sifnos Island, Cyclades</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {info.highlights.map((highlight) => (
                  <Badge key={highlight} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
              </div>

              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed mb-4">{village.description}</p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold">Transportation: </span>
                      <span className="text-muted-foreground">{info.transportation}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Perfect for: </span>
                      <span className="text-muted-foreground">{info.bestFor.join(', ')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              {/* Map */}
              <MapLocation
                name={village.name}
                coordinates={coordinates}
                description={village.description}
                type="village"
                height="350px"
                zoom={15}
              />
            </div>
          </div>
        </div>

        {/* Village Specialties */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What Makes {village.name} Special</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {info.specialties.map((specialty, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>{specialty}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Businesses in Village */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Businesses in {village.name}</h3>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({businesses?.length || 0})</TabsTrigger>
              <TabsTrigger value="accommodation">
                <Bed className="h-4 w-4 mr-2" />
                Hotels ({accommodationBusinesses.length})
              </TabsTrigger>
              <TabsTrigger value="restaurants">
                <Utensils className="h-4 w-4 mr-2" />
                Dining ({restaurantBusinesses.length})
              </TabsTrigger>
              <TabsTrigger value="experiences">
                <Camera className="h-4 w-4 mr-2" />
                Other ({experienceBusinesses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses?.map((business) => (
                  <Card key={business.id} className="group hover-lift hover-glow cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-40 bg-muted">
                        <img 
                          src={business.photo_urls?.[0] || "/api/placeholder/400/300"} 
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                        {business.verified && (
                          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {business.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {business.categories.name}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {business.description}
                      </p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accommodation" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodationBusinesses.map((business) => (
                  <Card key={business.id} className="group hover-lift hover-glow cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-40 bg-muted">
                        <img 
                          src={business.photo_urls?.[0] || "/api/placeholder/400/300"} 
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                            {business.price_range || "€€"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {business.name}
                      </h4>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">4.8</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {business.price_range || "€€"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {business.description}
                      </p>
                      <Button size="sm" className="w-full">
                        View & Book
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="restaurants" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurantBusinesses.map((business) => (
                  <Card key={business.id} className="group hover-lift hover-glow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={business.photo_urls?.[0] || "/api/placeholder/100/100"} 
                            alt={business.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {business.name}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">4.8</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {business.price_range || "€€"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {business.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experiences" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experienceBusinesses.map((business) => (
                  <Card key={business.id} className="group hover-lift hover-glow cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-32 bg-muted">
                        <img 
                          src={business.photo_urls?.[0] || "/api/placeholder/400/200"} 
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {business.categories.name}
                        </Badge>
                      </div>
                      <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {business.name}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {business.description}
                      </p>
                      <Button size="sm" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Village Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{businesses?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total Businesses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{accommodationBusinesses.length}</div>
              <div className="text-sm text-muted-foreground">Hotels</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{restaurantBusinesses.length}</div>
              <div className="text-sm text-muted-foreground">Restaurants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{experienceBusinesses.length}</div>
              <div className="text-sm text-muted-foreground">Experiences</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Planning Your Stay in {village.name}?</h3>
              <p className="text-muted-foreground mb-6">
                Discover more about this beautiful village and find the perfect accommodation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href={`/categories/accommodation?village=${village.slug}`}>Find Hotels</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/villages">Explore Other Villages</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VillageDetail;
