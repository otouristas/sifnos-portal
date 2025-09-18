import Layout from "@/components/Layout";
import VillageSelector from "@/components/VillageSelector";
import { staticPagesSEO } from "@/lib/seo-utils";

const Villages = () => {
  const seoData = staticPagesSEO.villages;
  
  return (
    <Layout
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonical={seoData.canonical}
    >

      <VillageSelector />
    </Layout>
  );
};

export default Villages;