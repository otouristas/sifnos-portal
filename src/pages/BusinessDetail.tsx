import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { 
  MapPin, Phone, Globe, Clock, Star, Award, Share2, Heart, 
  Calendar, Users, Euro, Camera, Navigation, ExternalLink,
  Mail, MessageSquare, ThumbsUp, Flag
} from "lucide-react";
import Layout from "@/components/Layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapLocation, sifnosCoordinates } from "@/components/ui/map-location";
import { BookingSystem } from "@/components/ui/booking-system";
import { ReviewSystem, StarRating } from "@/components/ui/review-system";
import { useBusiness } from "@/hooks/use-businesses";

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "Maria K.",
    userAvatar: "/api/placeholder/40/40",
    rating: 5,
    title: "Absolutely wonderful experience!",
    content: "The pottery workshop was incredible. The master potter was so patient and knowledgeable. I learned so much about traditional Sifnian techniques and created a beautiful piece to take home.",
    date: "2024-08-15",
    helpful: 12,
    verified: true,
    businessResponse: {
      content: "Thank you Maria! We're so glad you enjoyed the workshop. Your piece turned out beautifully and we hope to see you again next time you visit Sifnos!",
      date: "2024-08-16",
      responderName: "Artemon Pottery Team"
    }
  },
  {
    id: "2",
    userId: "user2",
    userName: "John D.",
    rating: 4,
    title: "Great traditional experience",
    content: "Authentic pottery workshop with real masters. The studio has been operating for generations and you can feel the history. Highly recommended for anyone interested in traditional crafts.",
    date: "2024-07-22",
    helpful: 8,
    verified: false
  }
];

const BusinessDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: business, isLoading } = useBusiness(slug || '');

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

  if (!business) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Business Not Found</h1>
          <p className="text-muted-foreground">The business you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const coordinates = sifnosCoordinates[business.villages.slug as keyof typeof sifnosCoordinates] || [36.9747, 24.7197];
  const averageRating = 4.8; // In real app, calculate from reviews
  const totalReviews = mockReviews.length;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: business.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const getBusinessTypeForBooking = () => {
    const category = business.categories.slug;
    if (category === 'accommodation') return 'accommodation';
    if (category === 'food-drink') return 'restaurant';
    if (category === 'experiences') return 'experience';
    if (category === 'vehicle-rentals') return 'rental';
    return 'experience';
  };

  return (
    <Layout>
      <Helmet>
        <title>{business.name} - {business.villages.name}, Sifnos | TravelSifnos.gr</title>
        <meta 
          name="description" 
          content={`${business.description} Located in ${business.villages.name}, Sifnos. Book now or get more information about this ${business.categories.name.toLowerCase()} business.`} 
        />
        <meta 
          name="keywords" 
          content={`${business.name}, ${business.villages.name}, Sifnos, ${business.categories.name}, ${business.tags?.join(', ')}, Greek islands, Cyclades`} 
        />
        <meta property="og:title" content={`${business.name} - ${business.villages.name}, Sifnos`} />
        <meta property="og:description" content={business.description} />
        <meta property="og:image" content={business.photo_urls?.[0]} />
        <meta property="og:type" content="business.business" />
        <meta property="business:contact_data:street_address" content={business.address} />
        <meta property="business:contact_data:locality" content={business.villages.name} />
        <meta property="business:contact_data:region" content="Sifnos" />
        <meta property="business:contact_data:country_name" content="Greece" />
      </Helmet>

      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Categories", href: "/categories" },
            { label: business.categories.name, href: `/categories/${business.categories.slug}` },
            { label: business.name, current: true }
          ]}
          className="mb-6"
        />

        {/* Business Hero */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative h-80 rounded-lg overflow-hidden mb-6">
                <img 
                  src={business.photo_urls?.[0] || "/api/placeholder/800/400"} 
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {business.verified && (
                    <Badge className="bg-green-600 text-white">
                      <Award className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {business.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleShare}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Business Info */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{business.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{business.villages.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{averageRating}</span>
                        <span>({totalReviews} reviews)</span>
                      </div>
                      <Badge variant="outline">
                        {business.categories.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {business.price_range || "€€"}
                    </div>
                    <div className="text-sm text-muted-foreground">Price Range</div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  {business.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {business.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking & Contact Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Book or Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <BookingSystem
                    businessId={business.id}
                    businessName={business.name}
                    businessType={getBusinessTypeForBooking()}
                    basePrice={50} // Mock price
                    externalBookingUrl={business.website}
                    className="w-full"
                  />
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    {business.phone && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={`tel:${business.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          {business.phone}
                        </a>
                      </Button>
                    )}
                    
                    {business.website && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={business.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      </Button>
                    )}
                    
                    {business.email && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={`mailto:${business.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{business.address || `${business.villages.name}, Sifnos`}</span>
                  </div>
                  
                  {business.season && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Open: {business.season}</span>
                    </div>
                  )}
                  
                  {business.languages && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Languages: {business.languages.join(', ')}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-muted-foreground" />
                    <span>Price Range: {business.price_range || "€€"}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <MapLocation
                name={business.name}
                coordinates={coordinates}
                description={business.description}
                type="business"
                height="200px"
                zoom={16}
              />
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About {business.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed mb-4">{business.description}</p>
                    
                    {business.tags && (
                      <div>
                        <h4 className="font-semibold mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {business.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium">{business.categories.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium">{business.villages.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price Range:</span>
                        <p className="font-medium">{business.price_range || "€€"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Season:</span>
                        <p className="font-medium">{business.season || "Year Round"}</p>
                      </div>
                    </div>
                    
                    {business.verified && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Verified Business
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  {business.features && business.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {business.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specific features listed.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ReviewSystem
                businessId={business.id}
                reviews={mockReviews}
                averageRating={averageRating}
                totalReviews={totalReviews}
                onAddReview={(review) => {
                  console.log('New review:', review);
                  // Handle review submission
                }}
              />
            </TabsContent>

            <TabsContent value="location" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Location & Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p className="text-muted-foreground">
                        {business.address || `${business.villages.name}, Sifnos 84003, Greece`}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">How to Get There</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span>🚌 Public bus from Apollonia to {business.villages.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🚗 Drive from Apollonia (approximately 10-15 minutes)</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        const [lat, lng] = coordinates;
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                      }}
                      className="w-full"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>

                <div>
                  <MapLocation
                    name={business.name}
                    coordinates={coordinates}
                    description={business.description}
                    type="business"
                    height="350px"
                    zoom={16}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessDetail;