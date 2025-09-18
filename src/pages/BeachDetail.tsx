import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Car, Bus, Award, Waves, Camera, Users, Wind, ParkingCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapLocation, sifnosCoordinates } from "@/components/ui/map-location";
import { useBeaches } from "@/hooks/use-beaches";

const BeachDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: beaches, isLoading } = useBeaches();
  
  const beach = beaches?.find(b => b.slug === slug);

  if (isLoading) {
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

  if (!beach) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Beach Not Found</h1>
          <p className="text-muted-foreground">The beach you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const coordinates = sifnosCoordinates[beach.slug as keyof typeof sifnosCoordinates] || [36.9747, 24.7197];

  const getBeachTypeIcon = (type: string) => {
    switch (type) {
      case "sandy": return "🏖️";
      case "pebble": return "🪨";
      case "mixed": return "🏝️";
      default: return "🌊";
    }
  };

  const getWindProtectionColor = (protection: string) => {
    if (protection.includes('excellent')) return "text-green-600";
    if (protection.includes('good')) return "text-blue-600";
    if (protection.includes('moderate')) return "text-yellow-600";
    if (protection.includes('poor')) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <Layout>
      <Helmet>
        <title>{beach.name} Beach - Sifnos | TravelSifnos.gr</title>
        <meta 
          name="description" 
          content={`Discover ${beach.name} beach in Sifnos. ${beach.description.substring(0, 150)}...`} 
        />
        <meta 
          name="keywords" 
          content={`${beach.name} beach, Sifnos beaches, ${beach.location_description}, ${beach.perfect_for.join(', ')}, Greek islands, Cyclades`} 
        />
        <meta property="og:title" content={`${beach.name} Beach - Beautiful Sifnos`} />
        <meta property="og:description" content={beach.description} />
        <meta property="og:image" content={beach.photos?.[0]} />
        <meta property="og:type" content="place" />
      </Helmet>

      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Beaches", href: "/beaches" },
            { label: beach.name, current: true }
          ]}
          className="mb-6"
        />

        {/* Beach Hero */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Waves className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{beach.name} Beach</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{beach.location_description}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{beach.distance_from_apollonia}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {beach.blue_flag && (
                  <Badge className="bg-blue-600 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Blue Flag
                  </Badge>
                )}
                {beach.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Featured Beach
                  </Badge>
                )}
                <Badge variant="secondary">
                  {getBeachTypeIcon(beach.beach_type)} {beach.beach_type} beach
                </Badge>
                {beach.parking_available && (
                  <Badge variant="outline">
                    <ParkingCircle className="h-3 w-3 mr-1" />
                    Parking Available
                  </Badge>
                )}
              </div>

              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed">{beach.description}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="relative h-80 rounded-lg overflow-hidden mb-6">
                <img 
                  src={beach.photos?.[0] || "/api/placeholder/600/400"} 
                  alt={`${beach.name} beach in Sifnos`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Map */}
              <MapLocation
                name={`${beach.name} Beach`}
                coordinates={coordinates}
                description={beach.description}
                type="beach"
                height="250px"
                zoom={15}
              />
            </div>
          </div>
        </div>

        {/* Beach Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Key Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {beach.key_highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Beach Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Beach Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Water Quality:</span>
                <p className="font-medium">{beach.water_quality}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Wind Protection:</span>
                <p className={`font-medium capitalize ${getWindProtectionColor(beach.wind_protection)}`}>
                  {beach.wind_protection}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Beach Type:</span>
                <p className="font-medium capitalize">
                  {getBeachTypeIcon(beach.beach_type)} {beach.beach_type}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Access:</span>
                <p className="font-medium text-sm">{beach.access_method}</p>
              </div>
            </CardContent>
          </Card>

          {/* Facilities & Perfect For */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Facilities & Perfect For
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Facilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {beach.facilities.map((facility) => (
                    <Badge key={facility} variant="outline" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Perfect For:</h4>
                <div className="flex flex-wrap gap-1">
                  {beach.perfect_for.map((tag) => (
                    <Badge key={tag} className="text-xs bg-secondary text-secondary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Beaches */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Other Beautiful Beaches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beaches?.filter(b => b.id !== beach.id && b.featured).slice(0, 4).map((relatedBeach) => (
              <Card key={relatedBeach.id} className="group hover-lift cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative h-32 bg-muted">
                    <img 
                      src={relatedBeach.photos?.[0] || "/api/placeholder/300/200"} 
                      alt={relatedBeach.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    {relatedBeach.blue_flag && (
                      <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
                        Blue Flag
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {relatedBeach.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {relatedBeach.location_description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {relatedBeach.perfect_for.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Plan Your Beach Day</h3>
              <p className="text-muted-foreground mb-6">
                Find accommodation near {beach.name} beach for the perfect Sifnos experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/categories/accommodation">Find Hotels Nearby</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/beaches">Explore All Beaches</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BeachDetail;
