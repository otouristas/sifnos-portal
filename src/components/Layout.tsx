import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import TouristasAIBot from "./TouristasAIBot";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
}

const Layout = ({ 
  children, 
  title = "TravelSifnos.gr - Complete Business Directory for Sifnos Island",
  description = "Discover the best businesses on Sifnos island. Find accommodation, restaurants, experiences, and local services. The most complete directory for Sifnos, Greece.",
  keywords = "Sifnos, Greece, Cyclades, business directory, hotels, restaurants, travel, tourism, pottery, experiences",
  image = "https://travelsifnos.com/sifnos-hero.jpg",
  canonical
}: LayoutProps) => {
  // Use travelsifnos.com for canonical URLs
  const getCanonicalUrl = () => {
    if (canonical) return canonical;
    
    const path = window.location.pathname;
    const search = window.location.search;
    return `https://travelsifnos.com${path}${search}`;
  };
  
  const currentUrl = getCanonicalUrl();
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="YncWAEGC8_F4b7iKVY4A9mtqoV2C6wyIPff5g8bOei4" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Beautiful Sifnos island harbor with traditional white buildings and crystal blue waters" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="TravelSifnos.com" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@travelsifnos" />
        <meta name="twitter:creator" content="@travelsifnos" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content="Beautiful Sifnos island harbor with traditional white buildings and crystal blue waters" />
        
        {/* Additional SEO */}
        <meta name="language" content="en" />
        <meta name="geo.region" content="GR" />
        <meta name="geo.position" content="36.9777;24.7129" />
        <meta name="ICBM" content="36.9777, 24.7129" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TravelSifnos.com",
            "description": description,
            "url": "https://travelsifnos.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://travelsifnos.com/categories?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TravelSifnos.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://travelsifnos.com/touristas-ai-logo.svg"
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://travelsifnos.com/sifnos-hero.jpg",
              "width": 1200,
              "height": 630,
              "alt": "Beautiful Sifnos island harbor with traditional white buildings and crystal blue waters"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        
        {/* Global Touristas AI Chatbot */}
        <TouristasAIBot />
      </div>
    </>
  );
};

export default Layout;