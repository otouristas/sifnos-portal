import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SubmitBusiness = () => {
  return (
    <Layout
      title="Submit Your Business - List on TravelSifnos.gr"
      description="List your business on the most complete directory for Sifnos island. Reach more customers and grow your business with TravelSifnos.gr."
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">List Your Business</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the most trusted business directory for Sifnos island. 
            Start with a free listing and upgrade anytime.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input id="business-name" required />
                </div>
                <div>
                  <Label htmlFor="contact-name">Contact Name *</Label>
                  <Input id="contact-name" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea id="description" rows={4} />
              </div>
              
              <Button className="w-full">Submit for Review</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitBusiness;