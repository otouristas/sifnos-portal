import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Star, 
  Languages,
  DollarSign,
  Tag,
  ExternalLink
} from "lucide-react";

const BusinessDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: business, isLoading, error } = useQuery({
    queryKey: ["business", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select(`
          *,
          categories (name, slug),
          villages (name, slug)
        `)
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !business) {
    return (
      <Layout title="Business Not Found">
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Business Not Found</h1>
          <p className="text-muted-foreground">The business you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.villages?.name,
      "addressCountry": "Greece"
    },
    "telephone": business.phone,
    "email": business.email,
    "url": business.website,
    "image": business.photo_urls?.[0],
    "priceRange": business.price_range,
    "openingHours": business.season
  };

  return (
    <Layout
      title={business.meta_title || `${business.name} - ${business.categories?.name} in ${business.villages?.name}, Sifnos`}
      description={business.meta_description || business.description || `${business.name} is a ${business.categories?.name?.toLowerCase()} located in ${business.villages?.name}, Sifnos. ${business.description}`}
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{business.categories?.name}</Badge>
                <Badge variant="outline">
                  <MapPin className="mr-1 h-3 w-3" />
                  {business.villages?.name}
                </Badge>
                {business.verified && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Star className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            {business.website && (
              <Button asChild>
                <a href={business.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
          
          {business.description && (
            <p className="text-lg text-muted-foreground">{business.description}</p>
          )}
        </div>

        {/* Images */}
        {business.photo_urls && business.photo_urls.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {business.photo_urls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${business.name} - Photo ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">{business.address}</p>
                    </div>
                  </div>
                )}
                
                {business.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href={`tel:${business.phone}`} className="text-primary hover:underline">
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {business.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {business.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a 
                        href={business.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {business.maps_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={business.maps_url} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Google Maps
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Features & Tags */}
            {(business.features?.length > 0 || business.tags?.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {business.features && business.features.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {business.features.map((feature, index) => (
                          <Badge key={index} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {business.tags && business.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {business.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.season && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Season</p>
                      <p className="text-muted-foreground">{business.season}</p>
                    </div>
                  </div>
                )}
                
                {business.price_range && (
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Price Range</p>
                      <p className="text-muted-foreground">{business.price_range}</p>
                    </div>
                  </div>
                )}
                
                {business.languages && business.languages.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <Languages className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Languages</p>
                      <p className="text-muted-foreground">{business.languages.join(", ")}</p>
                    </div>
                  </div>
                )}
                
                {business.booking && (
                  <div>
                    <p className="font-medium mb-1">Booking</p>
                    <p className="text-muted-foreground">{business.booking}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessDetail;