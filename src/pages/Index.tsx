import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories"; 
import VillageSelector from "@/components/VillageSelector";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";

const Index = () => {
  return (
    <Layout
      title="TravelSifnos.gr - Complete Business Directory for Sifnos Island"
      description="Discover the best businesses on Sifnos island. Find accommodation, restaurants, pottery workshops, experiences, and local services. The most complete directory for authentic Greek island experiences."
      keywords="Sifnos, Greece, Cyclades, business directory, hotels, restaurants, travel, tourism, pottery, experiences, accommodation, local businesses"
    >
      <Hero />
      <Categories />
      <VillageSelector />
      <FeaturedBusinesses />
    </Layout>
  );
};

export default Index;