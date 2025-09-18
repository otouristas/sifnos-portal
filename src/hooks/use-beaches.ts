import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Beach {
  id: string;
  name: string;
  slug: string;
  description: string;
  village_id: string;
  location_description: string;
  distance_from_apollonia: string;
  beach_type: string;
  water_quality: string;
  wind_protection: string;
  access_method: string;
  parking_available: boolean;
  facilities: string[];
  perfect_for: string[];
  key_highlights: string[];
  blue_flag: boolean;
  featured: boolean;
  photos: string[];
  villages?: {
    id: string;
    name: string;
    slug: string;
  };
}

export function useBeaches() {
  return useQuery({
    queryKey: ['beaches'],
    queryFn: async (): Promise<Beach[]> => {
      // First check if beaches table exists
      try {
        const { data: tableExists, error: checkError } = await supabase
          .from('beaches')
          .select('id')
          .limit(1);

        if (checkError) {
          console.log('Beaches table not found, using mock data');
          return mockBeaches;
        }
      } catch (err) {
        console.log('Beaches table not accessible, using mock data');
        return mockBeaches;
      }

      const { data, error } = await supabase
        .from('beaches')
        .select(`
          *,
          villages (
            id,
            name,
            slug
          )
        `)
        .order('featured', { ascending: false })
        .order('name');

      if (error) {
        console.warn('Beaches table not found, using mock data:', error);
        return mockBeaches;
      }

      return data || mockBeaches;
    },
  });
}

export function useFeaturedBeaches() {
  return useQuery({
    queryKey: ['beaches', 'featured'],
    queryFn: async (): Promise<Beach[]> => {
      // First check if beaches table exists
      try {
        const { data: tableExists, error: checkError } = await supabase
          .from('beaches')
          .select('id')
          .limit(1);

        if (checkError) {
          console.log('Beaches table not found, using mock data');
          return mockBeaches.filter(beach => beach.featured);
        }
      } catch (err) {
        console.log('Beaches table not accessible, using mock data');
        return mockBeaches.filter(beach => beach.featured);
      }

      const { data, error } = await supabase
        .from('beaches')
        .select(`
          *,
          villages (
            id,
            name,
            slug
          )
        `)
        .eq('featured', true)
        .order('name')
        .limit(4);

      if (error) {
        console.warn('Beaches table not found, using mock data:', error);
        return mockBeaches.filter(beach => beach.featured);
      }

      return data || mockBeaches.filter(beach => beach.featured);
    },
  });
}

// Import authentic Sifnos beach images
import platisGialosImg from '@/assets/beaches/plats-gialos.webp';
import kamaresImg from '@/assets/beaches/kamares.webp';
import vathiImg from '@/assets/beaches/vathi.webp';
import chrissopigi from '@/assets/beaches/chrysopigi.webp';
import farosImg from '@/assets/beaches/faros.webp';
import heronisoosImg from '@/assets/beaches/heronissos.webp';
import vroulidiaImg from '@/assets/beaches/vroulidia.webp';
import fykiadaImg from '@/assets/beaches/fykiada.webp';

// Mock data for when beaches table doesn't exist yet
const mockBeaches: Beach[] = [
  {
    id: "platis-gialos",
    name: "Platis Gialos",
    slug: "platis-gialos",
    description: "One of the largest and most popular sandy beaches on Sifnos, especially beloved by Greek visitors. It consistently earns the Blue Flag from the FEE, thanks to its compliance with 32 strict environmental and quality criteria. Nearby attractions include the White Tower (1.5 km northeast), the best-preserved of Sifnos' 77 ancient beacon towers. The area features a lively mix of accommodations, restaurants, shops, cafés, and pottery studios.",
    village_id: "platis-gialos-id",
    location_description: "Southern Sifnos",
    distance_from_apollonia: "7 km from Apollonia",
    beach_type: "sandy",
    water_quality: "Blue Flag certified crystal clear waters",
    wind_protection: "moderate - protected from north winds",
    access_method: "Bus service from Apollonia or by car with parking available",
    parking_available: true,
    facilities: ["Sunbeds & Umbrellas", "Restaurants", "Water Sports", "Beach Bars", "Shops", "Pottery Studios"],
    perfect_for: ["Families", "Swimming", "Food Lovers", "Blue Flag Beach"],
    key_highlights: ["Blue Flag awarded beach", "White Tower (ancient beacon) nearby", "Hiking routes to southern villages", "View of Kitriani islet with ancient church"],
    blue_flag: true,
    featured: true,
    photos: [platisGialosImg]
  },
  {
    id: "kamares",
    name: "Kamares",
    slug: "kamares-beach",
    description: "The main port of Sifnos and the island's largest coastal village, just 5 km from the capital Apollonia. As the main arrival point, it offers the highest concentration of hotels, rooms to let, tavernas, grocery stores, cafés, bakeries, pottery workshops, and tourist services. It also hosts essential facilities such as the Port Authority and the Municipal Information Office.",
    village_id: "kamares-id",
    location_description: "Western Sifnos (Port)",
    distance_from_apollonia: "5 km from Apollonia",
    beach_type: "sandy",
    water_quality: "crystal clear protected bay waters",
    wind_protection: "good - protected bay",
    access_method: "Main port arrival point, walking distance from the port, bus service from Apollonia",
    parking_available: true,
    facilities: ["Sunbeds & Umbrellas", "Restaurants", "Beach Bars", "Shops", "Natural Shade", "Port Authority", "Municipal Information Office", "Grocery Stores", "Bakeries", "Pottery Workshops"],
    perfect_for: ["Convenience", "Families", "Port Proximity", "Hiking"],
    key_highlights: ["Main arrival port for ferries", "Starting point for scenic hiking routes", "Trails to Church of the Nymfon and Mavri Spilia (Black Cave)", "Connection to NATURA protected areas"],
    blue_flag: false,
    featured: true,
    photos: [kamaresImg]
  },
  {
    id: "vathi",
    name: "Vathi",
    slug: "vathi-beach",
    description: "Located 10 km west of Apollonia, Vathi is a peaceful coastal village known for its wide, sandy beach and tranquil vibe. Once a major pottery hub, the village retains its artisanal charm. Excavations at 'Punta tou Polemikou' reveal prehistoric tombs and settlements. Nature lovers can enjoy the rare sand lilies that bloom in August.",
    village_id: "vathi-id",
    location_description: "Western Sifnos",
    distance_from_apollonia: "10 km from Apollonia",
    beach_type: "sandy",
    water_quality: "crystal clear sheltered waters",
    wind_protection: "excellent - one of the most sheltered beaches",
    access_method: "Bus service from Apollonia, road access with parking",
    parking_available: true,
    facilities: ["Sunbeds & Umbrellas", "Restaurants", "Beach Bars", "Natural Shade", "Pottery Studios"],
    perfect_for: ["Tranquility", "Scenery", "Swimming", "Archaeology", "Nature"],
    key_highlights: ["Prehistoric archaeological site", "Rare sand lilies (August blooming)", "16th-century Church of Taxiarches", "Hiking trails to Platy Gialos and Fykiada"],
    blue_flag: false,
    featured: true,
    photos: [vathiImg]
  },
  {
    id: "chrissopigi",
    name: "Chrissopigi",
    slug: "chrissopigi-beach",
    description: "Located 10 km from Apollonia, near Platy Gialos, Chrissopigi is the most photographed and revered location on the island. It's home to the Monastery of Panagia Chrissopigi (1523), the patron saint of Sifnos. The annual festival on the eve of Ascension Day includes a moving procession of the holy icon. The peninsula features dramatic rocks perfect for diving, the peaceful Apokoftou beach with just two tavernas.",
    village_id: "chrissopigi-id",
    location_description: "Southeastern Sifnos",
    distance_from_apollonia: "10 km from Apollonia",
    beach_type: "mixed",
    water_quality: "crystal clear waters with dramatic rocks",
    wind_protection: "moderate - depends on which side of the peninsula",
    access_method: "Bus to Faros then 15-minute walk, or drive with limited parking",
    parking_available: false,
    facilities: ["Restaurant", "Limited Sunbeds", "Monastery"],
    perfect_for: ["Photography", "Snorkeling", "Natural Beauty", "Religious Interest"],
    key_highlights: ["Monastery of Panagia Chrissopigi (1523)", "Patron saint of Sifnos", "Annual religious festival", "Nearby White Tower ancient beacon"],
    blue_flag: false,
    featured: true,
    photos: [chrissopigi]
  },
  {
    id: "faros",
    name: "Faros",
    slug: "faros-beach",
    description: "Seven kilometers from Apollonia, Faros is a traditional fishing village and once the main port of Sifnos. Named after the ancient lighthouse ('faros'), it offers serene beaches and cultural experiences. Glyfou beach, known for its brackish water well, is the starting point of a beautiful lit path leading to Apokoftou and Chrysopigi beaches. Nearby, remnants of ancient ore-loading facilities can be seen.",
    village_id: "faros-id",
    location_description: "Southeastern Sifnos",
    distance_from_apollonia: "7 km from Apollonia",
    beach_type: "sandy",
    water_quality: "crystal clear protected bay waters",
    wind_protection: "good - sheltered bay",
    access_method: "Bus service from Apollonia, road access with parking",
    parking_available: true,
    facilities: ["Sunbeds & Umbrellas", "Restaurants", "Natural Shade", "Lit Walking Path"],
    perfect_for: ["Relaxation", "Swimming", "Local Atmosphere", "Coastal Walks"],
    key_highlights: ["Traditional fishing village", "Ancient lighthouse history", "Monastery of Stavros on Fasolou beach", "Hiking trails to Agios Andreas Acropolis and Kastro"],
    blue_flag: false,
    featured: false,
    photos: [farosImg]
  },
  {
    id: "herronisos",
    name: "Herronisos",
    slug: "herronisos-beach",
    description: "The northernmost beach of Sifnos, 15 km from Apollonia, Herronisos is a secluded fishing village famed for its peaceful atmosphere, traditional pottery, and small beach. Local highlights include Agios Georgios church and an ancient beacon tower above the village. On the road to Herronisos, travelers pass through Troullaki and Diavroucha, where more pottery workshops can be found.",
    village_id: "herronisos-id",
    location_description: "Northern Sifnos",
    distance_from_apollonia: "15 km from Apollonia",
    beach_type: "pebble",
    water_quality: "crystal clear waters",
    wind_protection: "moderate - exposed to north winds",
    access_method: "Limited bus service, better accessible by car with parking",
    parking_available: true,
    facilities: ["Small Tavernas", "Traditional Pottery"],
    perfect_for: ["Seclusion", "Traditional Charm", "Pottery"],
    key_highlights: ["Northernmost beach on the island", "Traditional fishing village", "Ancient beacon tower", "Agios Georgios church"],
    blue_flag: false,
    featured: false,
    photos: [heronisoosImg]
  },
  {
    id: "vroulidia",
    name: "Vroulidia",
    slug: "vroulidia-beach",
    description: "Located just 1 km from Herronisos and 14 km from Apollonia, Vroulidia is a tranquil pebble beach ideal for relaxation. It offers two seaside cafés that provide umbrellas and sunbeds for visitors, maintaining its natural beauty and quiet atmosphere.",
    village_id: "vroulidia-id",
    location_description: "Northern Sifnos",
    distance_from_apollonia: "14 km from Apollonia",
    beach_type: "pebble",
    water_quality: "crystal clear turquoise waters",
    wind_protection: "poor - exposed to south winds",
    access_method: "Dirt road access with limited parking, then 10-minute hike down",
    parking_available: false,
    facilities: ["Two Seaside Cafés", "Umbrellas & Sunbeds"],
    perfect_for: ["Seclusion", "Natural Beauty", "Snorkeling", "Peace and Quiet"],
    key_highlights: ["Tranquil pebble beach", "Crystal clear waters", "Unspoiled natural setting"],
    blue_flag: false,
    featured: false,
    photos: [vroulidiaImg]
  },
  {
    id: "fykiada",
    name: "Fykiada",
    slug: "fykiada-beach",
    description: "A secluded sandy beach accessible only by sea or hiking trails from Platy Gialos and Vathi. Near the beach stands the chapel of Agios Georgios and one of the island's oldest olive trees, offering a truly unspoiled experience for those seeking natural beauty away from crowds.",
    village_id: "fykiada-id",
    location_description: "Between Platy Gialos and Vathi",
    distance_from_apollonia: "8 km from Apollonia",
    beach_type: "sandy",
    water_quality: "pristine crystal clear waters",
    wind_protection: "variable - somewhat exposed",
    access_method: "Only by foot via hiking trails from Platy Gialos or Vathi, or by boat",
    parking_available: false,
    facilities: ["None - Unspoiled Beach"],
    perfect_for: ["Adventure", "Hiking", "Complete Seclusion"],
    key_highlights: ["Completely undeveloped beach", "Ancient olive tree", "Chapel of Agios Georgios", "Only accessible by hiking or boat"],
    blue_flag: false,
    featured: false,
    photos: [fykiadaImg]
  }
];
