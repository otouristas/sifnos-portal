import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Camera, 
  Calendar, 
  Users, 
  Waves, 
  Mountain, 
  Utensils,
  Palette,
  Info,
  ExternalLink
} from "lucide-react";

const Portal = () => {
  const portalSections = [
    {
      title: "Island Information",
      icon: Info,
      items: [
        "Population: ~2,650 residents",
        "Area: 73.9 km²",
        "Highest Point: Profitis Ilias (682m)",
        "Main Port: Kamares",
        "Capital: Apollonia"
      ]
    },
    {
      title: "Getting Around",
      icon: MapPin,
      items: [
        "Local bus network connects all villages",
        "Rent cars, scooters, or ATVs",
        "Traditional boat trips available",
        "Many villages are walkable",
        "Hiking trails between settlements"
      ]
    },
    {
      title: "Best Beaches",
      icon: Waves,
      items: [
        "Platis Gialos - Family-friendly sandy beach",
        "Kamares - The port beach with amenities",
        "Vathi - Secluded bay perfect for swimming",
        "Faros - Lighthouse beach with tavernas",
        "Chrissopigi - Monastery beach, very scenic"
      ]
    },
    {
      title: "Cultural Highlights",
      icon: Palette,
      items: [
        "Pottery workshops in Artemonas & Apollonia",
        "Medieval Kastro village",
        "Panagia Chryssopigi Monastery",
        "Archaeological Museum",
        "Traditional architecture tour"
      ]
    }
  ];

  const seasonalInfo = [
    {
      season: "Spring (Mar-May)",
      description: "Mild weather, wildflowers bloom, fewer crowds. Perfect for hiking.",
      temperature: "15-22°C",
      activities: ["Hiking", "Photography", "Local festivals"]
    },
    {
      season: "Summer (Jun-Aug)",
      description: "Peak season, hot weather, all services open. Beach season.",
      temperature: "22-28°C", 
      activities: ["Swimming", "Beach activities", "Nightlife"]
    },
    {
      season: "Autumn (Sep-Nov)",
      description: "Warm sea, pleasant weather, harvest season. Great for pottery.",
      temperature: "18-25°C",
      activities: ["Swimming", "Pottery workshops", "Local cuisine"]
    },
    {
      season: "Winter (Dec-Feb)",
      description: "Cool and quiet, many businesses closed. Authentic local life.",
      temperature: "10-15°C",
      activities: ["Local culture", "Ceramics", "Peaceful walks"]
    }
  ];

  return (
    <Layout
      title="Sifnos Portal - Complete Island Guide & Local Information | TravelSifnos.gr"
      description="Your complete guide to Sifnos island. Discover beaches, villages, culture, pottery traditions, local transportation, seasonal information, and insider tips for authentic Greek island experiences."
      keywords="Sifnos guide, Greek island portal, Cyclades information, Sifnos beaches, pottery workshops, local transportation, island culture"
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Sifnos Island Portal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your complete insider guide to Sifnos. Everything you need to know about 
            this authentic Greek island, from practical information to hidden gems 
            that only locals share.
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {portalSections.map((section, index) => (
            <Card key={index}>
              <CardHeader className="text-center pb-3">
                <section.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seasonal Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">When to Visit Sifnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalInfo.map((season, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{season.season}</CardTitle>
                  <Badge variant="outline" className="mx-auto w-fit">
                    {season.temperature}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {season.description}
                  </p>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Popular Activities:</p>
                    {season.activities.map((activity, actIndex) => (
                      <Badge key={actIndex} variant="secondary" className="text-xs mr-1">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Local Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Local Insider Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5" />
                  Food & Dining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Try mastelo (lamb cooked in wine) - it's the local specialty</li>
                  <li>• Revithada (chickpea stew) is traditionally eaten on Sundays</li>
                  <li>• Local honey and thyme are exceptional quality</li>
                  <li>• Many tavernas close 3-6pm (Greek siesta time)</li>
                  <li>• Dinner is typically served after 8pm</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Photography Spots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Kastro village at sunset - medieval architecture</li>
                  <li>• Chrissopigi Monastery - iconic white chapel on rocks</li>
                  <li>• Artemonas village - neoclassical mansions</li>
                  <li>• Potter workshops - traditional craft in action</li>
                  <li>• Hiking trails - panoramic island views</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Local Etiquette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Greet locals with "Yassas" (hello/goodbye)</li>
                  <li>• Respect siesta time (2-5pm) - keep noise down</li>
                  <li>• Dress modestly when visiting monasteries</li>
                  <li>• Tipping 10% is appreciated but not mandatory</li>
                  <li>• Many locals speak English, especially in tourism</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Local Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sifnos Festival (July-August) - music and arts</li>
                  <li>• Pottery exhibitions throughout summer</li>
                  <li>• Religious festivals at various monasteries</li>
                  <li>• Cooking workshops with local chefs</li>
                  <li>• Hiking group meetups (spring/autumn)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency & Practical Info */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Practical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Police:</strong> 22840 31210</p>
                <p><strong>Medical Center:</strong> 22840 31315</p>
                <p><strong>Port Authority:</strong> 22840 33617</p>
                <p><strong>Fire Department:</strong> 199</p>
                <p><strong>Tourist Police:</strong> 171</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banking & ATMs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• ATMs in Apollonia and Kamares</p>
                <p>• Most businesses accept cards</p>
                <p>• Cash preferred for small tavernas</p>
                <p>• Banks open Mon-Thu 8am-2:30pm</p>
                <p>• Friday until 2pm</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transportation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Ferry from Piraeus (3-5 hours)</p>
                <p>• High-speed ferry (2.5-3 hours)</p>
                <p>• Local bus connects villages</p>
                <p>• Taxi available but limited</p>
                <p>• Car/scooter rental recommended</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portal;