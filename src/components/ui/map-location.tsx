import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapLocationProps {
  name: string;
  coordinates: [number, number];
  description?: string;
  type?: 'village' | 'beach' | 'business';
  zoom?: number;
  height?: string;
  className?: string;
  showDirections?: boolean;
}

// Sifnos coordinates for different locations
const sifnosCoordinates = {
  // Villages
  apollonia: [36.9747, 24.7197] as [number, number],
  kamares: [36.9525, 24.6897] as [number, number],
  kastro: [36.9889, 24.7075] as [number, number],
  artemonas: [36.9792, 24.7158] as [number, number],
  vathi: [36.9358, 24.6742] as [number, number],
  faros: [36.9542, 24.7489] as [number, number],
  chrissopigi: [36.9444, 24.7583] as [number, number],
  
  // Beaches
  'platis-gialos': [36.9444, 24.7500] as [number, number],
  'kamares-beach': [36.9525, 24.6897] as [number, number],
  'vathi-beach': [36.9358, 24.6742] as [number, number],
  'chrissopigi-beach': [36.9444, 24.7583] as [number, number],
  'faros-beach': [36.9542, 24.7489] as [number, number],
  'herronisos-beach': [36.9958, 24.7000] as [number, number],
  'vroulidia-beach': [36.9975, 24.7017] as [number, number],
  'fykiada-beach': [36.9400, 24.7300] as [number, number],
};

const createCustomIcon = (type: 'village' | 'beach' | 'business') => {
  const colors = {
    village: '#1E2E48',
    beach: '#0EA5E9', 
    business: '#059669'
  };
  
  const icons = {
    village: '🏘️',
    beach: '🏖️',
    business: '🏢'
  };
  
  const iconHtml = `
    <div style="
      background-color: ${colors[type]};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    ">
      ${icons[type]}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const MapLocation = ({ 
  name,
  coordinates,
  description,
  type = 'village',
  zoom = 14,
  height = "300px",
  className,
  showDirections = true
}: MapLocationProps) => {
  const mapRef = useRef<L.Map | null>(null);

  const openDirections = () => {
    const [lat, lng] = coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="relative" style={{ height }}>
          <MapContainer
            center={coordinates}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker
              position={coordinates}
              icon={createCustomIcon(type)}
            >
              <Popup className="custom-popup" maxWidth={250}>
                <div className="p-2">
                  <h3 className="font-semibold text-lg mb-2">{name}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          
          {showDirections && (
            <div className="absolute top-4 right-4">
              <Badge 
                className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary-dark transition-colors"
                onClick={openDirections}
              >
                <Navigation className="h-3 w-3 mr-1" />
                Directions
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { MapLocation, sifnosCoordinates };
