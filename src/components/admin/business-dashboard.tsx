import { useState } from "react";
import { 
  BarChart3, 
  Eye, 
  Star, 
  Calendar, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Image,
  MapPin,
  Phone,
  Globe,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarRating } from "@/components/ui/review-system";

interface BusinessStats {
  views: number;
  bookings: number;
  reviews: number;
  averageRating: number;
  monthlyViews: number[];
}

interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  village: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  images: string[];
  verified: boolean;
  featured: boolean;
  openingHours: Record<string, string>;
  priceRange: string;
  amenities: string[];
}

const mockStats: BusinessStats = {
  views: 1247,
  bookings: 23,
  reviews: 18,
  averageRating: 4.7,
  monthlyViews: [120, 145, 98, 167, 189, 223, 198, 234, 267, 289, 198, 156]
};

const mockBusiness: BusinessProfile = {
  id: "omega3-taverna",
  name: "Omega3 Traditional Taverna",
  category: "Food & Drink",
  village: "Platis Gialos",
  description: "Seaside taverna serving fresh seafood and traditional Sifnian specialties with stunning sunset views.",
  phone: "+30 22840 71XXX",
  email: "info@omega3sifnos.com",
  website: "https://omega3sifnos.com",
  address: "Platis Gialos Beach, Sifnos 84003",
  images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
  verified: true,
  featured: false,
  openingHours: {
    monday: "18:00-24:00",
    tuesday: "18:00-24:00", 
    wednesday: "18:00-24:00",
    thursday: "18:00-24:00",
    friday: "18:00-24:00",
    saturday: "18:00-24:00",
    sunday: "18:00-24:00"
  },
  priceRange: "€€€",
  amenities: ["Sea View", "Outdoor Seating", "WiFi", "Parking"]
};

const BusinessDashboard = () => {
  const [business, setBusiness] = useState<BusinessProfile>(mockBusiness);
  const [isEditing, setIsEditing] = useState(false);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    trend?: string 
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">{trend}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{business.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={business.verified ? "bg-green-600" : "bg-gray-600"}>
              {business.verified ? "Verified" : "Pending"}
            </Badge>
            <Badge variant="outline">{business.category}</Badge>
            <Badge variant="outline">{business.village}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            View Public Profile
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value={mockStats.views.toLocaleString()}
          icon={Eye}
          trend="+12% from last month"
        />
        <StatCard
          title="Bookings"
          value={mockStats.bookings}
          icon={Calendar}
          trend="+8% from last month"
        />
        <StatCard
          title="Reviews"
          value={mockStats.reviews}
          icon={MessageSquare}
          trend="3 new this month"
        />
        <StatCard
          title="Average Rating"
          value={mockStats.averageRating}
          icon={Star}
          trend="Excellent rating"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">New review from John Doe</p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={5} size="sm" />
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">Booking request from Maria Smith</p>
                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Photos
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Respond to Reviews
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Update Availability
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {isEditing ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Business Name</Label>
                      <Input
                        id="name"
                        value={business.name}
                        onChange={(e) => setBusiness(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={business.category}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                          <SelectItem value="Accommodation">Accommodation</SelectItem>
                          <SelectItem value="Experiences">Experiences</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={business.description}
                      onChange={(e) => setBusiness(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={business.phone}
                        onChange={(e) => setBusiness(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={business.email}
                        onChange={(e) => setBusiness(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={business.website}
                      onChange={(e) => setBusiness(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={business.address}
                      onChange={(e) => setBusiness(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={business.website} className="text-primary hover:underline">
                        {business.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{business.address}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Opening Hours</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(business.openingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}:</span>
                            <span>{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {business.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Review management interface would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Booking management interface would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed analytics would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { BusinessDashboard };
