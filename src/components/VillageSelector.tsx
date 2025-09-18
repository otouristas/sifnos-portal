import { MapPin, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryCardSkeleton } from "@/components/ui/skeleton-loader";
import { useVillages } from "@/hooks/use-villages";

// Import village images
import apolloniaImg from '@/assets/villages/apollonia.webp';
import kamaresImg from '@/assets/villages/kamares.webp';
import platisGialosImg from '@/assets/villages/plats-gialos.webp';
import kastroImg from '@/assets/villages/kastro.webp';
import vathiImg from '@/assets/villages/vathi.webp';
import farosImg from '@/assets/villages/faros.webp';
import artemonasImg from '@/assets/villages/artemonas.webp';
import agiosLoukasImg from '@/assets/villages/agios-loukaswebp.webp';
import exambelaImg from '@/assets/villages/exampela.webp';
import katavatiImg from '@/assets/villages/katavati.webp';
import katoPetaliImg from '@/assets/villages/kato-petali.webp';
import panoPetaliImg from '@/assets/villages/panopetali.webp';
import troullakiImg from '@/assets/villages/troullaki.webp';
import herronisosImg from '@/assets/villages/heronissos.webp';
import chrissopigi from '@/assets/villages/chrysopigi.webp';

interface Village {
  id: string;
  name: string;
  description: string;
  hotelCount: number;
  image: string;
  highlights: string[];
  isCapital?: boolean;
}

// Authentic Sifnos villages with real data
const sifnosVillages: Village[] = [
  {
    id: "apollonia",
    name: "Apollonia",
    description: "The capital of Sifnos, known for its picturesque streets and vibrant nightlife.",
    hotelCount: 12,
    image: apolloniaImg,
    highlights: ["Capital City", "Vibrant Nightlife", "Picturesque Streets"],
    isCapital: true
  },
  {
    id: "kamares",
    name: "Kamares",
    description: "The main port of Sifnos with a beautiful sandy beach and waterfront restaurants.",
    hotelCount: 15,
    image: kamaresImg,
    highlights: ["Main Port", "Sandy Beach", "Waterfront Dining"]
  },
  {
    id: "platis-gialos",
    name: "Platis Gialos",
    description: "One of the most popular beaches with golden sand and shallow waters perfect for families.",
    hotelCount: 18,
    image: platisGialosImg,
    highlights: ["Popular Beach", "Family Friendly", "Golden Sand"]
  },
  {
    id: "kastro",
    name: "Kastro",
    description: "The medieval capital of Sifnos with impressive architecture and stunning sea views.",
    hotelCount: 5,
    image: kastroImg,
    highlights: ["Medieval Capital", "Historic Architecture", "Sea Views"]
  },
  {
    id: "vathi",
    name: "Vathi",
    description: "A tranquil fishing village with a sheltered bay, sandy beach, and peaceful atmosphere.",
    hotelCount: 7,
    image: vathiImg,
    highlights: ["Tranquil Bay", "Fishing Village", "Peaceful"]
  },
  {
    id: "faros",
    name: "Faros",
    description: "A charming coastal settlement with three beautiful beaches and a relaxed atmosphere.",
    hotelCount: 8,
    image: farosImg,
    highlights: ["Coastal Settlement", "Three Beaches", "Relaxed"]
  },
  {
    id: "artemonas",
    name: "Artemonas",
    description: "An elegant village known for its neoclassical mansions and beautiful architecture.",
    hotelCount: 6,
    image: artemonasImg,
    highlights: ["Elegant Village", "Neoclassical Mansions", "Beautiful Architecture"]
  },
  {
    id: "agios-loukas",
    name: "Agios Loukas",
    description: "A small, quiet settlement offering authentic island living and scenic views.",
    hotelCount: 3,
    image: agiosLoukasImg,
    highlights: ["Quiet Settlement", "Authentic Living", "Scenic Views"]
  },
  {
    id: "exambela",
    name: "Exambela",
    description: "A traditional village with panoramic views and authentic Cycladic character.",
    hotelCount: 4,
    image: exambelaImg,
    highlights: ["Traditional Village", "Panoramic Views", "Cycladic Character"]
  },
  {
    id: "katavati",
    name: "Katavati",
    description: "A picturesque inland village with traditional character and central location.",
    hotelCount: 3,
    image: katavatiImg,
    highlights: ["Inland Village", "Traditional Character", "Central Location"]
  },
  {
    id: "kato-petali",
    name: "Kato Petali",
    description: "A quiet village with traditional character near the island's capital.",
    hotelCount: 2,
    image: katoPetaliImg,
    highlights: ["Quiet Village", "Traditional", "Near Capital"]
  },
  {
    id: "pano-petali",
    name: "Pano Petali",
    description: "An elevated village offering spectacular views and traditional atmosphere.",
    hotelCount: 3,
    image: panoPetaliImg,
    highlights: ["Elevated Village", "Spectacular Views", "Traditional"]
  },
  {
    id: "troullaki",
    name: "Troullaki",
    description: "A small, peaceful settlement with rural charm and natural beauty.",
    hotelCount: 1,
    image: troullakiImg,
    highlights: ["Peaceful Settlement", "Rural Charm", "Natural Beauty"]
  },
  {
    id: "herronisos",
    name: "Herronisos",
    description: "A remote fishing village on the northern tip of the island with authentic charm.",
    hotelCount: 2,
    image: herronisosImg,
    highlights: ["Remote Village", "Fishing", "Northern Tip"]
  },
  {
    id: "chrissopigi",
    name: "Chrissopigi",
    description: "A scenic area famous for its iconic monastery and beautiful beaches.",
    hotelCount: 4,
    image: chrissopigi,
    highlights: ["Iconic Monastery", "Beautiful Beaches", "Scenic Area"]
  }
];

const VillageSelector = () => {
  const { data: dbVillages, isLoading } = useVillages();

  // Use database villages if available, otherwise use static data
  const villages = dbVillages?.length ? 
    dbVillages.map(village => {
      const staticVillage = sifnosVillages.find(v => v.name.toLowerCase() === village.name.toLowerCase());
      return {
        ...village,
        hotelCount: staticVillage?.hotelCount || 0,
        image: staticVillage?.image || '/api/placeholder/400/300',
        highlights: staticVillage?.highlights || ['Traditional', 'Authentic', 'Scenic'],
        isCapital: village.name === 'Apollonia'
      };
    }) : sifnosVillages;

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Locations in Sifnos Island
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the perfect area to stay in beautiful Sifnos. Each location offers its own unique charm and attractions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Locations in Sifnos Island
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the perfect area to stay in beautiful Sifnos. Each location offers its own unique charm and attractions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villages.slice(0, 15).map((village) => (
            <Card 
              key={village.id}
              className={`group hover-lift hover-glow cursor-pointer bg-gradient-card border-border/50 hover:border-primary/20 overflow-hidden ${
                village.isCapital ? 'ring-2 ring-primary/30' : ''
              }`}
              onClick={() => window.location.href = `/villages/${village.slug || village.name.toLowerCase()}`}
            >
              <CardHeader className="p-0">
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img 
                    src={village.image} 
                    alt={`${village.name}, Sifnos`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {village.isCapital && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Capital
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{village.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{village.hotelCount} hotels</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {village.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {village.highlights.map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-hero hover:bg-primary-dark transition-smooth group"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/villages/${village.slug || village.name.toLowerCase()}`;
                    }}
                  >
                    View hotels
                    <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Finding Your Perfect Stay in Sifnos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground">
                <div className="space-y-4">
                  <p>
                    Choosing the right location for your stay in Sifnos can significantly enhance your experience on this beautiful Cycladic island. Each area offers distinct advantages depending on your preferences and travel style.
                  </p>
                  <p>
                    <strong>Apollonia</strong>, the capital, provides a central location with easy access to restaurants, bars, and boutique shops. It's ideal for those who enjoy nightlife and want to be in the heart of the action. <strong>Kamares</strong>, as the main port, offers convenience for arrivals and departures along with a lovely beach and waterfront dining options.
                  </p>
                  <p>
                    For beach lovers, <strong>Platis Gialos</strong> presents one of the island's most beautiful shores with numerous beachfront accommodations. Families particularly appreciate its shallow waters and range of facilities.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    Those seeking a more authentic and historical experience might prefer <strong>Kastro</strong>, the medieval former capital, where traditional architecture and spectacular sea views create an unforgettable setting.
                  </p>
                  <p>
                    <strong>Vathi</strong> provides a quieter, more secluded experience in a picturesque bay setting, while <strong>Faros</strong> combines beautiful beaches with a relaxed fishing village atmosphere. The elegant village of <strong>Artemonas</strong> offers neoclassical architecture and refined ambiance, just a short walk from Apollonia.
                  </p>
                  <p>
                    For travelers seeking authentic experiences, smaller settlements like <strong>Agios Loukas</strong>, <strong>Exambela</strong>, <strong>Katavati</strong>, and others offer glimpses into traditional island life. Whichever location you choose, Sifnos' excellent bus system makes it easy to explore the entire island.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VillageSelector;