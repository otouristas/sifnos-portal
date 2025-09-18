import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import VillageSelector from "@/components/VillageSelector";

const Villages = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sifnos Villages & Locations - Authentic Greek Island Destinations | TravelSifnos.gr</title>
        <meta 
          name="description" 
          content="Discover all villages and locations in Sifnos. From the capital Apollonia to medieval Kastro, find the perfect area to stay with authentic charm and attractions." 
        />
        <meta 
          name="keywords" 
          content="Sifnos villages, Apollonia, Kamares, Kastro, Platis Gialos, Vathi, Faros, Artemonas, Greek island villages, Cyclades locations" 
        />
      </Helmet>

      <VillageSelector />
    </Layout>
  );
};

export default Villages;