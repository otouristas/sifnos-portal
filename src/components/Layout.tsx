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
  image = "/sifnos-hero.jpg",
  canonical
}: LayoutProps) => {
  const currentUrl = canonical || window.location.href;
  
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
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="TravelSifnos.gr" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
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
            "name": "TravelSifnos.gr",
            "description": description,
            "url": "https://travelsifnos.gr",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://travelsifnos.gr/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TravelSifnos.gr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://travelsifnos.gr/logo.png"
              }
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