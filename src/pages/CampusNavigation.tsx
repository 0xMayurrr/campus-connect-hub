import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/useGeolocation';
import { campusLocations } from '@/data/campusLocations';
import { CampusLocation } from '@/types';
import { MapPin, Navigation, ExternalLink, QrCode, Loader2 } from 'lucide-react';
import { QRScanner } from '@/components/qr/QRScanner';
import { QRCodeService, QRCodeData } from '@/services/qrCodeService';

export default function Navigate() {
  const { location, isLoading: locationLoading, getLocation } = useGeolocation();
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
  };

  const getDistanceText = (campusLoc: CampusLocation) => {
    if (!location) return null;
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      campusLoc.latitude,
      campusLoc.longitude
    );
    if (distance < 1000) {
      return `${Math.round(distance)}m away`;
    }
    return `${(distance / 1000).toFixed(1)}km away`;
  };

  const openGoogleMaps = (campusLoc: CampusLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${campusLoc.latitude},${campusLoc.longitude}`;
    window.open(url, '_blank');
  };

  const handleQRScan = (qrData: QRCodeData) => {
    const scannedLocation = campusLocations.find(loc => loc.id === qrData.locationId);
    if (scannedLocation) {
      setSelectedLocation(scannedLocation);
      setShowQRScanner(false);
    }
  };

  const locationsByType = {
    academic: campusLocations.filter(l => l.type === 'academic'),
    hostel: campusLocations.filter(l => l.type === 'hostel'),
    facility: campusLocations.filter(l => l.type === 'facility'),
    admin: campusLocations.filter(l => l.type === 'admin'),
    transport: campusLocations.filter(l => l.type === 'transport'),
  };

  return (
    <DashboardLayout
      title="Campus Navigation"
      subtitle="Real-time location tracking and campus navigation with QR codes"
    >
      <div className="space-y-6">
        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle>Rathinam Technical Campus</CardTitle>
            <CardDescription>Real-time campus navigation</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Embedded Google Map */}
            <div className="relative rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.0!2d76.9463!3d10.9687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU4JzA3LjMiTiA3NsKwNTYnNDYuNyJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 right-4">
                <Button variant="secondary" size="sm" onClick={() => window.open('https://maps.google.com', '_blank')}>
                  Open Full Map
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Map Type Toggle */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">Road</Button>
              <Button variant="ghost" size="sm">Satellite</Button>
            </div>

            {/* Current Location */}
            {location ? (
              <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Your location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
                </div>
                <p className="text-sm text-muted mt-1">Accuracy: ±{Math.round(location.accuracy || 0)}m</p>
              </div>
            ) : locationLoading ? (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Getting your location...</span>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="default" onClick={getLocation} className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                View My Location
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowQRScanner(true)}
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Campus Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Campus Locations</CardTitle>
            <CardDescription>Browse all campus buildings and facilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {campusLocations.map((campusLoc) => (
              <div
                key={campusLoc.id}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent">
                    <MapPin className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{campusLoc.name}</h4>
                    <p className="text-sm text-muted capitalize">{campusLoc.type}</p>
                    {location && (
                      <p className="text-sm text-primary">{getDistanceText(campusLoc)}</p>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => openGoogleMaps(campusLoc)}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* QR Code Scanner */}
        {showQRScanner ? (
          <QRScanner 
            onScan={handleQRScan}
            onClose={() => setShowQRScanner(false)}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                QR Code Navigation
              </CardTitle>
              <CardDescription>
                Scan QR codes placed around campus to get instant navigation and location info
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 bg-muted/50 rounded-lg border-2 border-dashed border-border">
                <QrCode className="w-16 h-16 mx-auto text-muted mb-4" />
                <p className="text-muted mb-4">Point your camera at a campus QR code</p>
                <Button variant="outline" onClick={() => setShowQRScanner(true)}>
                  Open Scanner
                </Button>
              </div>
              {selectedLocation && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary">Scanned Location: {selectedLocation.name}</h4>
                  <p className="text-sm text-muted">{selectedLocation.description}</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => openGoogleMaps(selectedLocation)}
                  >
                    Get Directions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
