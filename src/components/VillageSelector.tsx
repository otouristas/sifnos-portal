import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Village {
  id: string;
  name: string;
  description: string;
  businessCount: number;
  isCapital?: boolean;
}

const villages: Village[] = [
  {
    id: "apollonia",
    name: "Apollonia",
    description: "The charming capital with traditional architecture",
    businessCount: 52,
    isCapital: true
  },
  {
    id: "artemonas",
    name: "Artemonas",
    description: "Historic village with stunning mansions",
    businessCount: 28
  },
  {
    id: "kastro",
    name: "Kastro",
    description: "Medieval village perched on clifftops",
    businessCount: 18
  },
  {
    id: "kamares",
    name: "Kamares",
    description: "Main port with beautiful beach",
    businessCount: 34
  },
  {
    id: "faros",
    name: "Faros",
    description: "Scenic lighthouse village",
    businessCount: 21
  },
  {
    id: "vathi",
    name: "Vathi",
    description: "Traditional pottery center",
    businessCount: 16
  },
  {
    id: "platis-gialos",
    name: "Platis Gialos",
    description: "Popular beach destination",
    businessCount: 25
  },
  {
    id: "chrissopigi",
    name: "Chrissopigi",
    description: "Spiritual heart with famous monastery",
    businessCount: 8
  }
];

const VillageSelector = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Villages of Sifnos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each village has its own character and charm. Discover local businesses in every corner of the island.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {villages.map((village) => (
            <Card 
              key={village.id}
              className={`group hover:shadow-medium transition-smooth cursor-pointer border-border/50 hover:border-primary/30 ${
                village.isCapital ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10' : 'bg-card'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-5 w-5 ${village.isCapital ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {village.name}
                    </h3>
                  </div>
                  {village.isCapital && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      Capital
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {village.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {village.businessCount} businesses
                  </div>
                  <div className="text-primary font-semibold group-hover:text-primary-dark transition-smooth">
                    Explore →
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillageSelector;