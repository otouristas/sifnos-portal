import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Globe } from 'lucide-react';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Business {
  id: string;
  name: string;
  category: string;
  village: string;
  description: string;
  rating: number;
  priceRange: string;
  phone?: string;
  website?: string;
  coordinates: [number, number];
  verified: boolean;
}

interface InteractiveMapProps {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

// Custom marker icons for different categories
const createCustomIcon = (category: string, verified: boolean) => {
  const color = verified ? '#1E2E48' : '#6B7280';
  const iconHtml = `
    <div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
    ">
      ${category.charAt(0)}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const InteractiveMap = ({ 
  businesses, 
  center = [36.9747, 24.7197], // Sifnos coordinates
  zoom = 12,
  height = "400px",
  className 
}: InteractiveMapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  // Component to fit bounds to all markers
  const FitBounds = ({ businesses }: { businesses: Business[] }) => {
    const map = useMap();
    
    useEffect(() => {
      if (businesses.length > 0) {
        const bounds = L.latLngBounds(businesses.map(b => b.coordinates));
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }, [businesses, map]);
    
    return null;
  };

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FitBounds businesses={businesses} />
        
        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={business.coordinates}
            icon={createCustomIcon(business.category, business.verified)}
          >
            <Popup className="custom-popup" maxWidth={300}>
              <Card className="border-0 shadow-none">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {business.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span className="text-primary font-medium">
                            {business.category}
                          </span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {business.village}
                          </div>
                        </div>
                      </div>
                      {business.verified && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {business.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{business.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {business.priceRange}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {business.phone && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      )}
                      {business.website && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Globe className="h-3 w-3 mr-1" />
                          Website
                        </Button>
                      )}
                      <Button size="sm" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export { InteractiveMap, type Business };
