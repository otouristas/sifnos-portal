// SEO Utility Functions for TravelSifnos.com
// Generates unique, compelling meta titles and descriptions

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  image?: string;
}

// Truncate text to optimal length for meta descriptions
export const truncateDescription = (text: string, maxLength: number = 155): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string): string => {
  return `https://travelsifnos.com${path}`;
};

// Default Open Graph image - Beautiful Sifnos harbor view
const DEFAULT_OG_IMAGE = "https://travelsifnos.com/sifnos-hero.jpg";

// Homepage SEO
export const getHomepageSEO = (): SEOData => ({
  title: "TravelSifnos.com - Complete Sifnos Business Directory | Hotels, Restaurants & Experiences",
  description: "Discover 200+ verified businesses on Sifnos island. Find hotels, restaurants, pottery workshops, experiences & local services. Your complete guide to authentic Greek island life.",
  keywords: "Sifnos, Greece, Cyclades, business directory, hotels, restaurants, travel, tourism, pottery, experiences, accommodation, local businesses",
  canonical: generateCanonicalUrl('/'),
  image: DEFAULT_OG_IMAGE
});

// Categories page SEO
export const getCategoriesSEO = (): SEOData => ({
  title: "Business Categories in Sifnos - Hotels, Restaurants, Experiences & More | TravelSifnos.com",
  description: "Browse all business categories in Sifnos. Find accommodation, food & drink, pottery workshops, experiences, vehicle rentals, wellness, culture & beaches.",
  keywords: "Sifnos business categories, accommodation, restaurants, pottery workshops, experiences, vehicle rentals, wellness, culture, beaches",
  canonical: generateCanonicalUrl('/categories'),
  image: DEFAULT_OG_IMAGE
});

// Villages page SEO
export const getVillagesSEO = (): SEOData => ({
  title: "Sifnos Villages & Locations - Authentic Greek Island Destinations | TravelSifnos.com",
  description: "Explore all 8 villages in Sifnos. From capital Apollonia to medieval Kastro, discover authentic charm, local businesses & unique character in each area.",
  keywords: "Sifnos villages, Apollonia, Kamares, Kastro, Platis Gialos, Vathi, Faros, Artemonas, Chrissopigi, Greek island villages",
  canonical: generateCanonicalUrl('/villages'),
  image: DEFAULT_OG_IMAGE
});

// Beaches page SEO
export const getBeachesSEO = (): SEOData => ({
  title: "Sifnos Beaches - Crystal Clear Waters & Golden Sands | Swimming & Beach Guide",
  description: "Discover 20+ stunning beaches in Sifnos. From Blue Flag Platis Gialos to secluded Vathi bay, find crystal clear waters, golden sands & hidden coves.",
  keywords: "Sifnos beaches, Blue Flag beach, Platis Gialos, Kamares beach, Vathi beach, Chrysopigi, swimming, Greek islands beaches, Cyclades",
  canonical: generateCanonicalUrl('/beaches'),
  image: DEFAULT_OG_IMAGE
});

// Portal page SEO
export const getPortalSEO = (): SEOData => ({
  title: "Sifnos Island Guide - Complete Travel Information, Contacts & Local Tips | TravelSifnos.com",
  description: "Complete Sifnos travel guide with ferry schedules, local contacts, emergency numbers, transportation, local products & insider tips for authentic experiences.",
  keywords: "Sifnos travel guide, ferry schedules, local contacts, emergency numbers, transportation, local products, travel tips, island information",
  canonical: generateCanonicalUrl('/portal'),
  image: DEFAULT_OG_IMAGE
});

// Touristas AI page SEO
export const getTouristasAISEO = (): SEOData => ({
  title: "Touristas AI - Your Intelligent Sifnos Travel Companion | AI-Powered Trip Planning",
  description: "Meet Touristas AI, the world's first AI travel companion for Sifnos. Get personalized recommendations, ferry schedules, hotel bookings & local insights instantly.",
  keywords: "Touristas AI, Sifnos AI travel, Greek islands AI, travel chatbot, hotel recommendations, ferry schedules, AI trip planning, travel assistant",
  canonical: generateCanonicalUrl('/touristas-ai'),
  image: DEFAULT_OG_IMAGE
});

// About page SEO
export const getAboutSEO = (): SEOData => ({
  title: "About TravelSifnos.com - Your Trusted Sifnos Business Directory Since 2024",
  description: "Learn about TravelSifnos.com, the most comprehensive Sifnos business directory. Our mission to connect travelers with authentic local businesses & experiences.",
  keywords: "about TravelSifnos, Sifnos business directory, local businesses, authentic experiences, travel platform, Greek islands",
  canonical: generateCanonicalUrl('/about'),
  image: DEFAULT_OG_IMAGE
});

// Contact page SEO
export const getContactSEO = (): SEOData => ({
  title: "Contact TravelSifnos.com - Support, Business Listings & Local Information",
  description: "Get in touch with TravelSifnos.com for business listings, support, partnerships or local information. We're here to help with your Sifnos experience.",
  keywords: "contact TravelSifnos, business listings, support, partnerships, Sifnos information, customer service",
  canonical: generateCanonicalUrl('/contact'),
  image: DEFAULT_OG_IMAGE
});

// Blog page SEO
export const getBlogSEO = (): SEOData => ({
  title: "Sifnos Travel Blog - Local Stories, Tips & Island Life Insights | TravelSifnos.com",
  description: "Read authentic Sifnos stories, local tips & island life insights. Discover hidden gems, cultural traditions & insider knowledge from local experts.",
  keywords: "Sifnos blog, travel stories, local tips, island life, hidden gems, cultural traditions, insider knowledge, Greek islands blog",
  canonical: generateCanonicalUrl('/blog'),
  image: DEFAULT_OG_IMAGE
});

// Pricing page SEO
export const getPricingSEO = (): SEOData => ({
  title: "Business Listing Prices - Advertise Your Sifnos Business | TravelSifnos.com",
  description: "Affordable business listing packages for Sifnos businesses. From free basic listings to premium featured placements. Grow your business with TravelSifnos.com.",
  keywords: "Sifnos business advertising, business listings, premium listings, featured businesses, business growth, marketing packages",
  canonical: generateCanonicalUrl('/pricing'),
  image: DEFAULT_OG_IMAGE
});

// Submit Business page SEO
export const getSubmitBusinessSEO = (): SEOData => ({
  title: "Καταχώρηση Επιχείρησης - Προσθέστε την Επιχείρησή σας | TravelSifnos.com",
  description: "Καταχωρήστε την επιχείρησή σας στον πιο ολοκληρωμένο οδηγό της Σίφνου. Δωρεάν καταχώρηση με δυνατότητα αναβάθμισης σε premium πακέτα.",
  keywords: "καταχώρηση επιχείρησης Σίφνος, business listing, επιχειρήσεις Σίφνος, διαφήμιση επιχείρησης, τουρισμός Σίφνος",
  canonical: generateCanonicalUrl('/submit-business'),
  image: DEFAULT_OG_IMAGE
});

// Auth page SEO
export const getAuthSEO = (): SEOData => ({
  title: "Login to TravelSifnos.com - Manage Your Business Listing Account",
  description: "Sign in to your TravelSifnos.com account to manage your business listing, update information, view analytics and access premium features.",
  keywords: "TravelSifnos login, business account, manage listing, business dashboard, account access",
  canonical: generateCanonicalUrl('/auth'),
  image: DEFAULT_OG_IMAGE
});

// Dynamic page SEO generators

// Business detail page SEO
export const getBusinessSEO = (business: any): SEOData => {
  const businessType = business.categories?.name || 'business';
  const village = business.villages?.name || 'Sifnos';
  const priceRange = business.price_range ? ` • ${business.price_range}` : '';
  const features = business.features?.slice(0, 3).join(', ') || '';
  
  return {
    title: `${business.name} - ${businessType} in ${village}, Sifnos | Book Now | TravelSifnos.com`,
    description: truncateDescription(
      `${business.description || `Experience ${business.name} in ${village}, Sifnos.`} ${features ? `Features: ${features}.` : ''} Book online or call for reservations${priceRange}.`
    ),
    keywords: `${business.name}, ${village}, Sifnos, ${businessType}, ${business.tags?.join(', ') || ''}, Greek islands, Cyclades, booking`,
    canonical: generateCanonicalUrl(`/business/${business.slug}`),
    image: business.photo_urls?.[0] || DEFAULT_OG_IMAGE
  };
};

// Category detail page SEO
export const getCategorySEO = (category: any, businessCount: number = 0): SEOData => {
  const categoryName = category.name || 'Businesses';
  const description = category.description || `Find the best ${categoryName.toLowerCase()} in Sifnos.`;
  
  return {
    title: `${categoryName} in Sifnos - ${businessCount}+ Verified ${categoryName} Businesses | TravelSifnos.com`,
    description: truncateDescription(
      `${description} Discover ${businessCount}+ verified ${categoryName.toLowerCase()} businesses across Sifnos. Compare prices, read reviews & book online.`
    ),
    keywords: `Sifnos ${categoryName.toLowerCase()}, ${category.slug}, verified businesses, reviews, booking, Greek islands, Cyclades`,
    canonical: generateCanonicalUrl(`/categories/${category.slug}`),
    image: DEFAULT_OG_IMAGE
  };
};

// Village detail page SEO
export const getVillageSEO = (village: any, businessCount: number = 0, accommodationCount: number = 0, restaurantCount: number = 0): SEOData => {
  const villageName = village.name || 'Village';
  const description = village.description || `Discover ${villageName} village in Sifnos.`;
  
  return {
    title: `${villageName} Sifnos - Hotels, Restaurants & Things to Do | Complete Village Guide`,
    description: truncateDescription(
      `${description} Find ${accommodationCount} hotels, ${restaurantCount} restaurants & ${businessCount} local businesses. Complete guide to ${villageName} with authentic experiences.`
    ),
    keywords: `${villageName} Sifnos, ${villageName} hotels, ${villageName} restaurants, things to do ${villageName}, Greek island village, Cyclades`,
    canonical: generateCanonicalUrl(`/villages/${village.slug}`),
    image: DEFAULT_OG_IMAGE
  };
};

// Beach detail page SEO
export const getBeachSEO = (beach: any): SEOData => {
  const beachName = beach.name || 'Beach';
  const features = beach.perfect_for?.slice(0, 3).join(', ') || 'swimming, sunbathing';
  const access = beach.access_difficulty || 'accessible';
  
  return {
    title: `${beachName} Beach Sifnos - ${features} | Swimming, Sunbathing & Beach Guide`,
    description: truncateDescription(
      `${beach.description || `Discover ${beachName} beach in Sifnos.`} Perfect for ${features}. ${access} access with ${beach.facilities?.join(', ') || 'natural beauty'}. Complete beach guide with photos & tips.`
    ),
    keywords: `${beachName} beach, Sifnos beaches, ${features}, ${beach.location_description || 'Greek islands'}, swimming, Cyclades beaches`,
    canonical: generateCanonicalUrl(`/beaches/${beach.slug}`),
    image: beach.photos?.[0] || DEFAULT_OG_IMAGE
  };
};

// SEO data for all static pages
export const staticPagesSEO = {
  home: getHomepageSEO(),
  categories: getCategoriesSEO(),
  villages: getVillagesSEO(),
  beaches: getBeachesSEO(),
  portal: getPortalSEO(),
  touristasAI: getTouristasAISEO(),
  about: getAboutSEO(),
  contact: getContactSEO(),
  blog: getBlogSEO(),
  pricing: getPricingSEO(),
  submitBusiness: getSubmitBusinessSEO(),
  auth: getAuthSEO()
};
