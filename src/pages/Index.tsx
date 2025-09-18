import Hero from "@/components/Hero";
import Categories from "@/components/Categories"; 
import VillageSelector from "@/components/VillageSelector";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <VillageSelector />
      <FeaturedBusinesses />
    </div>
  );
};

export default Index;