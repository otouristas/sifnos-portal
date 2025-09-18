import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories"; 
import VillageSelector from "@/components/VillageSelector";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import FeaturedBeaches from "@/components/featured-beaches";
import { staticPagesSEO } from "@/lib/seo-utils";

const Index = () => {
  const seoData = staticPagesSEO.home;
  
  return (
    <Layout
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonical={seoData.canonical}
      image={seoData.image}
    >
      <Hero />
      <Categories />
      <VillageSelector />
      <FeaturedBusinesses />
      <FeaturedBeaches />
    </Layout>
  );
};

export default Index;