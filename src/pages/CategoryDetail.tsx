import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Filter, Grid, List, MapPin, Star, Euro } from "lucide-react";
import Layout from "@/components/Layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BusinessCardSkeleton } from "@/components/ui/skeleton-loader";
import { useCategory } from "@/hooks/use-categories";
import { useBusinesses } from "@/hooks/use-businesses";
import { useVillages } from "@/hooks/use-villages";

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [priceRange, setPriceRange] = useState([1, 4]);
  const [minRating, setMinRating] = useState(0);

  const { data: category, isLoading: categoryLoading } = useCategory(slug || '');
  const { data: villages } = useVillages();
  const { data: businesses, isLoading: businessesLoading } = useBusinesses({
    category: slug,
    village: selectedVillage && selectedVillage !== 'all' ? selectedVillage : undefined,
    priceRange: priceRange[0] === 1 && priceRange[1] === 4 ? undefined : [`€`.repeat(priceRange[0]), `€`.repeat(priceRange[1])]
  });

  if (categoryLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const categoryDescriptions = {
    'accommodation': {
      title: 'Accommodation in Sifnos',
      description: 'Discover the perfect place to stay in Sifnos. From luxury hotels with stunning sea views to traditional guesthouses in charming villages, find accommodation that matches your style and budget.',
      seoDescription: 'Find the best hotels, villas, and guesthouses in Sifnos. Book authentic accommodation with sea views, traditional architecture, and Greek hospitality on this beautiful Cycladic island.',
      highlights: ['Luxury Hotels', 'Traditional Guesthouses', 'Sea View Properties', 'Village Locations', 'Family-Friendly Options']
    },
    'food-drink': {
      title: 'Restaurants & Tavernas in Sifnos',
      description: 'Experience authentic Sifnian cuisine at the island\'s best restaurants and tavernas. From fresh seafood by the sea to traditional recipes passed down through generations.',
      seoDescription: 'Discover the best restaurants, tavernas, and cafés in Sifnos. Enjoy fresh seafood, traditional Greek cuisine, and local specialties with stunning views across the Cyclades.',
      highlights: ['Fresh Seafood', 'Traditional Tavernas', 'Local Specialties', 'Sea View Dining', 'Family Recipes']
    },
    'pottery-crafts': {
      title: 'Pottery & Traditional Crafts in Sifnos',
      description: 'Discover Sifnos\' renowned pottery tradition and authentic crafts. Visit working studios, meet master artisans, and take home unique pieces of Sifnian heritage.',
      seoDescription: 'Explore traditional pottery workshops and craft studios in Sifnos. Buy authentic ceramics, watch master potters at work, and discover the island\'s rich artisanal heritage.',
      highlights: ['Traditional Pottery', 'Master Artisans', 'Authentic Ceramics', 'Working Studios', 'Cultural Heritage']
    },
    'experiences': {
      title: 'Experiences & Activities in Sifnos',
      description: 'Create unforgettable memories with authentic Sifnos experiences. From guided hiking tours to cultural workshops, discover the island through local eyes.',
      seoDescription: 'Book unique experiences and activities in Sifnos. Guided hiking tours, pottery workshops, cultural experiences, and local adventures on this beautiful Greek island.',
      highlights: ['Guided Tours', 'Cultural Workshops', 'Hiking Adventures', 'Local Experiences', 'Photography Tours']
    },
    'vehicle-rentals': {
      title: 'Vehicle Rentals in Sifnos',
      description: 'Explore Sifnos at your own pace with reliable vehicle rentals. From scooters to cars, find the perfect way to discover hidden beaches and charming villages.',
      seoDescription: 'Rent cars, scooters, and ATVs in Sifnos. Explore the island independently with reliable vehicles, full insurance, and local support for your Greek island adventure.',
      highlights: ['Car Rentals', 'Scooter Rentals', 'ATV Adventures', 'Island Exploration', 'Full Insurance']
    },
    'wellness': {
      title: 'Wellness & Spa in Sifnos',
      description: 'Rejuvenate your mind and body in the peaceful setting of Sifnos. Discover wellness retreats, spa treatments, and yoga experiences in this serene Cycladic paradise.',
      seoDescription: 'Find wellness retreats, spa treatments, and yoga experiences in Sifnos. Relax and rejuvenate on this peaceful Greek island with holistic wellness offerings.',
      highlights: ['Wellness Retreats', 'Spa Treatments', 'Yoga Classes', 'Meditation', 'Holistic Health']
    },
    'culture': {
      title: 'Culture & History in Sifnos',
      description: 'Immerse yourself in the rich cultural heritage of Sifnos. Visit museums, historical sites, and cultural centers that tell the story of this fascinating island.',
      seoDescription: 'Explore the culture and history of Sifnos. Visit museums, archaeological sites, churches, and cultural attractions on this historically rich Greek island.',
      highlights: ['Museums', 'Historical Sites', 'Archaeological Sites', 'Churches', 'Cultural Heritage']
    },
    'beaches-nature': {
      title: 'Beaches & Nature in Sifnos',
      description: 'Discover the natural beauty of Sifnos through its pristine beaches, hiking trails, and protected areas. Experience the island\'s diverse landscapes and ecosystems.',
      seoDescription: 'Explore the beaches and nature of Sifnos. Discover Blue Flag beaches, hiking trails, natural parks, and protected areas on this beautiful Cycladic island.',
      highlights: ['Blue Flag Beaches', 'Hiking Trails', 'Natural Parks', 'Protected Areas', 'Scenic Views']
    }
  };

  const categoryInfo = categoryDescriptions[slug as keyof typeof categoryDescriptions] || {
    title: category.name,
    description: category.description || '',
    seoDescription: category.description || '',
    highlights: []
  };

  const filteredBusinesses = businesses?.filter(business => {
    if (minRating > 0) {
      // In a real app, you'd filter by actual ratings
      return true; // Placeholder
    }
    return true;
  });

  const sortedBusinesses = filteredBusinesses?.sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <Helmet>
        <title>{categoryInfo.title} | TravelSifnos.gr</title>
        <meta name="description" content={categoryInfo.seoDescription} />
        <meta name="keywords" content={`Sifnos ${category.name.toLowerCase()}, ${categoryInfo.highlights.join(', ').toLowerCase()}, Greek islands, Cyclades`} />
        <meta property="og:title" content={categoryInfo.title} />
        <meta property="og:description" content={categoryInfo.seoDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Categories", href: "/categories" },
            { label: category.name, current: true }
          ]}
          className="mb-6"
        />

        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <div className="h-8 w-8 text-primary">
                {/* Category icon would go here */}
                📂
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{categoryInfo.title}</h1>
              <p className="text-muted-foreground mt-2">
                {businesses?.length || 0} businesses found
              </p>
            </div>
          </div>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-6">{categoryInfo.description}</p>
              <div className="flex flex-wrap gap-2">
                {categoryInfo.highlights.map((highlight) => (
                  <Badge key={highlight} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Controls */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Sorting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Village Filter */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                    <SelectTrigger>
                      <SelectValue placeholder="All villages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All villages</SelectItem>
                      {villages?.map((village) => (
                        <SelectItem key={village.id} value={village.slug}>
                          {village.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Price Range
                  </Label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={4}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>€</span>
                      <span>€€</span>
                      <span>€€€</span>
                      <span>€€€€</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Minimum Rating
                  </Label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="3">3+ stars</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="5">5 stars only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured First</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {sortedBusinesses?.length || 0} businesses found
                  </span>
                  {(selectedVillage && selectedVillage !== 'all' || priceRange[0] !== 1 || priceRange[1] !== 4 || minRating > 0) && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedVillage('all');
                        setPriceRange([1, 4]);
                        setMinRating(0);
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Businesses Grid/List */}
        {businessesLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedBusinesses?.map((business) => (
              <Card 
                key={business.id}
                className={`group hover-lift hover-glow cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 overflow-hidden ${
                  viewMode === 'list' ? 'flex-row' : ''
                }`}
              >
                <CardHeader className="p-0">
                  <div className={`relative bg-muted ${viewMode === 'grid' ? 'h-48' : 'h-32 w-48 flex-shrink-0'}`}>
                    <img 
                      src={business.photo_urls?.[0] || "/api/placeholder/400/300"} 
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {business.verified && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Verified
                        </Badge>
                      )}
                      {business.featured && (
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                        {business.price_range || "€€"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth mb-1">
                        {business.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{business.villages.name}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {business.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {business.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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
        )}

        {/* No Results */}
        {!businessesLoading && sortedBusinesses?.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedVillage('');
                  setPriceRange([1, 4]);
                  setMinRating(0);
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
              <p className="text-muted-foreground mb-6">
                Help us improve by suggesting a business or let us know what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/submit-business">Suggest a Business</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
