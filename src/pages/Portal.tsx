import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staticPagesSEO } from "@/lib/seo-utils";
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
  ExternalLink,
  Ship,
  Phone,
  Building,
  ShoppingBag,
  Clock,
  Car,
  Plane
} from "lucide-react";

const Portal = () => {
  const seoData = staticPagesSEO.portal;
  
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
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonical={seoData.canonical}
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

        {/* Arrival Information */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Getting to Sifnos</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ship className="mr-2 h-5 w-5" />
                  Ferry Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Year-round connections from:</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• <strong>Piraeus</strong> - Main port (5-6 hrs conventional, 2-3 hrs high-speed)</p>
                      <p>• Milos, Kimolos, Serifos, Kythnos</p>
                      <p>• Sikinos, Ios, Folegandros, Santorini</p>
                      <p>• Paros, Syros</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Summer additional connections:</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Mykonos, Naxos, Lavrion</p>
                      <p>• More frequent services</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://www.ferryscanner.com/en/ferry/results?dep=PIR&arr=JTR&date=2025-09-19&tripType=oneWay&ref=ztdimtue" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Book Ferry Tickets - Ferryscanner.com
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plane className="mr-2 h-5 w-5" />
                  Airport Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Heliport:</p>
                    <p className="text-sm text-muted-foreground">Tholos area (northeast of island)</p>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Nearest airports:</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Paros, Milos, Syros</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">International airports:</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Santorini, Mykonos</p>
                      <p>• <strong>Athens International</strong> (Eleftherios Venizelos) - Most common route</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Port Authorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Sifnos Port Authority:</strong> 22840 33617</p>
                <p><strong>Piraeus Port Authority:</strong> 210 4511 310-7</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Travel Agencies & Ferry Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Aegean Thesaurus Travel:</strong> 22840 33151</p>
                <p><strong>Chrisopigi Travel:</strong> 22840 71523</p>
                <p><strong>Katsoulakis Travel:</strong> 22840 31700-31004</p>
                <p><strong>Xidis Travel:</strong> 22840 31895-31217</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Useful Information */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Useful Information & Contacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Municipal Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Municipal Offices:</strong> 22843 60310</p>
                <p><strong>Information Office:</strong> 22840 33661-31977</p>
                <p><strong>Citizen Service Centres:</strong> 22840 31006-31234</p>
                <p><strong>Hellenic Post Office:</strong> 22840 31329</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Police Station:</strong> 22840 31210</p>
                <p><strong>Port Authority:</strong> 22840 33617</p>
                <p><strong>Platy Gialos Fishing Refuge:</strong> 22840 71365</p>
                <p><strong>Fire Department:</strong> 199</p>
                <p><strong>Tourist Police:</strong> 171</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Regional Medical Centre:</strong> 22840 31315</p>
                <p><strong>Microbiology Lab (Kleinakis):</strong> 22840 31544-33677</p>
                <p><strong>Physiotherapy (Menegakis):</strong> 6986847059</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dental Care</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Dental Centre (Kottis):</strong> 6986005006</p>
                <p><strong>Dentist (Papaggeletos):</strong> 22840 32004</p>
                <p><strong>Dentist (Foutoulaki):</strong> 22840 32222</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pharmacies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Pharmacy (Vavritsas):</strong> 22840 33541</p>
                <p><strong>Pharmacy (Fotiadis):</strong> 22840 33033</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>National Bank of Greece:</strong> 22840 35603-33605</p>
                <p>• ATMs in Apollonia and Kamares</p>
                <p>• Most businesses accept cards</p>
                <p>• Cash preferred for small tavernas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Museums & Culture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Archaeological Museum:</strong> 22840 31022</p>
                <p><strong>Folk Museum:</strong> 22840 31341</p>
                <p><strong>Ecclesiastical Museum:</strong> 22840 31335</p>
                <p><strong>Acropolis Museum:</strong> 22840 31488</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Centres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>'Prokou Stylianou' Foundation:</strong> 22840 31639</p>
                <p><strong>'Marianthi Simou' Cultural Centre:</strong> 6972 421485</p>
                <p><strong>Radio Active (Local Radio):</strong> 22840 33104</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="mr-2 h-5 w-5" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Bus Services:</strong></p>
                <p>• "Depastas" Bus: 22840 31925</p>
                <p>• "Frantzis" Bus: 22840 31393</p>
                <p>• "Psathas" Bus: 22840 31578</p>
                <p>• "Municipal" Bus: 22840 33661</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Taxi Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p><strong>Taxi No2 (Kalogirou):</strong> 6944 742652</p>
                <p><strong>Taxi No3 (Komis):</strong> 69888 08888</p>
                <p><strong>Taxi No4 (Gerontopoulos):</strong> 6944 444904</p>
                <p><strong>Taxi No5 (Diaremes):</strong> 6944 642680</p>
                <p><strong>Taxi No6 (Anapliotis):</strong> 6944 696409</p>
                <p><strong>Taxi No7 (Depastas):</strong> 6932 403485</p>
                <p><strong>Taxi No8 (Karavis):</strong> 6944 936111</p>
                <p><strong>Taxi No9 (Chrysogelos):</strong> 6944 900972</p>
                <p><strong>Taxi No10 (Koulouris):</strong> 6973 209720</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Car & Motorcycle Rental</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p><strong>ELMAR (Kamares):</strong> 22840 31040</p>
                <p><strong>Miles Away (Platy Gialos):</strong> 22840 71373</p>
                <p><strong>Apollo (Apollonia & Kamares):</strong> 22840 33333</p>
                <p><strong>1o Moto (Kamares):</strong> 22840 33791</p>
                <p><strong>Sifnos Travel (Kamares):</strong> 22840 33383</p>
                <p><strong>Giannis (Apollonia):</strong> 22840 31155</p>
                <p><strong>Sun Trail (Kamares):</strong> 22840 33044</p>
                <p><strong>RAC (Kamares):</strong> 22840 35170</p>
                <p><strong>Sifnos Drive (Apollonia):</strong> 22840 31111</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Local Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Local Products & Specialties</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Take home authentic flavors and crafts from Sifnos. These local specialties make perfect souvenirs 
            or gifts, representing the island's rich culinary and artisanal traditions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Food Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Thyme honey</strong> - Finest quality from local beekeepers</li>
                  <li>• <strong>Xynomyzithra</strong> - White soft cheese</li>
                  <li>• <strong>Chloromanoura</strong> - Fresh hard white cheese</li>
                  <li>• <strong>Manoura gylomeno</strong> - Hard cheese matured in must and herbs</li>
                  <li>• <strong>Capers</strong> - Fresh, dried, or caper leaves</li>
                  <li>• <strong>Local wine</strong> - From small-scale producers</li>
                  <li>• <strong>Herbs</strong> - Oregano, sage, penny-royal, marjoram</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sweets & Pastries</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Honey pies</strong> - Traditional Sifnian dessert</li>
                  <li>• <strong>Sifnos biscuits</strong> - Local specialty cookies</li>
                  <li>• <strong>Boiled/baked almond sweets</strong></li>
                  <li>• <strong>Marzipan</strong> - Dusted with powdered sugar</li>
                  <li>• <strong>Pastelli</strong> - Honey and sesame bars</li>
                  <li>• <strong>Aniseed biscuits</strong></li>
                  <li>• <strong>Borekia</strong> - Phyllo pastry rolls</li>
                  <li>• <strong>Halvadopita</strong> - Nougat in rice paper</li>
                  <li>• <strong>Loukoumia</strong> - Greek delights</li>
                  <li>• <strong>Vanilla 'submarine'</strong> - Traditional fondant</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crafts & Arts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Sifnos pottery</strong> - Everyday use or decorative items</li>
                  <li>• <strong>Hand-woven blankets and rugs</strong> - Made on traditional looms</li>
                  <li>• <strong>Handmade jewellery</strong> - Local artisan designs</li>
                  <li>• <strong>Books by local writers</strong> - Stories inspired by Sifnos</li>
                  <li>• <strong>Cultural publications</strong> - From Sifnos Cultural Association</li>
                  <li>• <strong>Municipality publications</strong> - Local history and culture</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency & Practical Info */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Numbers</CardTitle>
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
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Banks:</strong> Mon-Thu 8am-2:30pm, Fri until 2pm</p>
                <p><strong>Shops:</strong> Usually close 2-5pm (siesta)</p>
                <p><strong>Tavernas:</strong> Dinner typically after 8pm</p>
                <p><strong>Museums:</strong> Vary by season</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Around</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• <strong>Ferry from Piraeus:</strong> 2-6 hours</p>
                <p>• <strong>Local buses:</strong> Connect all villages</p>
                <p>• <strong>Taxis:</strong> Available but limited</p>
                <p>• <strong>Car/scooter rental:</strong> Highly recommended</p>
                <p>• <strong>Walking:</strong> Many villages are walkable</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portal;