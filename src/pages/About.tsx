import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <Layout
      title="About TravelSifnos.gr - Your Complete Guide to Sifnos Island"
      description="Learn about TravelSifnos.gr, the most comprehensive business directory for Sifnos island. Discover our mission, values, and commitment to authentic Greek island experiences."
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">About TravelSifnos.gr</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are the most complete and trusted business directory for Sifnos island, 
            connecting travelers with authentic local experiences and helping businesses 
            thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                TravelSifnos.gr was born from a passion for Sifnos and a vision to make 
                this beautiful Greek island more accessible to travelers worldwide. As one 
                of the most authentic destinations in the Cyclades, Sifnos deserves a platform 
                that showcases its unique character and connects visitors with local businesses.
              </p>
              <p>
                Founded by travel enthusiasts and powered by advanced AI technology from 
                Touristas AI, we've created more than just a directory – we've built a 
                comprehensive ecosystem that supports both travelers and local businesses.
              </p>
              <p>
                Our commitment to authenticity means every listing is carefully verified, 
                and our local expertise ensures you discover the real Sifnos, from family-run 
                tavernas to traditional pottery workshops.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                To preserve and promote the authentic character of Sifnos while providing 
                modern, accessible tools for travelers and businesses to connect meaningfully.
              </p>
              <p>
                We believe in sustainable tourism that benefits local communities, celebrates 
                traditional crafts like pottery, and maintains the island's unique cultural identity.
              </p>
              <p>
                Through technology and human expertise, we bridge the gap between authentic 
                local experiences and modern traveler expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Verified Listings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Every business is personally verified to ensure accuracy and authenticity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Local Expertise</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Our team knows Sifnos intimately and curates the best experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>AI-Powered</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Advanced AI helps you discover personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Comprehensive</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Complete coverage of all businesses and services on the island.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Network */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Network</h2>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TravelSifnos.gr is part of a trusted network of Greek island travel platforms, 
              ensuring comprehensive coverage and reliable service across the Cyclades.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                HotelsSifnos.com
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                HotelsSantorini.gr
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                GreeceCyclades.com
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                CycladesRentacar.com
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                DiscoverCyclades.gr
              </Badge>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Authenticity</h3>
              <p className="text-muted-foreground">
                We celebrate and preserve the genuine character of Sifnos, from traditional 
                pottery to family recipes passed down through generations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-muted-foreground">
                We support local businesses and communities, ensuring tourism benefits 
                everyone and preserves the island's unique way of life.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We leverage cutting-edge technology to make travel planning easier while 
                maintaining the personal touch that makes Sifnos special.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;