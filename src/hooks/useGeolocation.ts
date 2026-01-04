import { useState, useCallback } from 'react';
import { TicketLocation } from '@/types';

interface GeolocationState {
  location: TicketLocation | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    isLoading: false,
  });

  const getLocation = useCallback(async (): Promise<TicketLocation | null> => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      });
      return null;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Try to get address using reverse geocoding (simplified)
          let address = '';
          let campusZone = 'Main Campus';
          
          try {
            // For demo, we'll use a placeholder. In production, use Google Geocoding API
            address = `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
            
            // Determine campus zone based on coordinates (simplified logic)
            if (latitude > 10.97) {
              campusZone = 'North Campus';
            } else if (latitude < 10.96) {
              campusZone = 'South Campus';
            } else {
              campusZone = 'Main Campus';
            }
          } catch (e) {
            console.log('Geocoding not available');
          }

          const locationData: TicketLocation = {
            latitude,
            longitude,
            accuracy,
            address,
            campusZone,
            timestamp: new Date(),
          };

          setState({
            location: locationData,
            error: null,
            isLoading: false,
          });
          resolve(locationData);
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          setState({
            location: null,
            error: errorMessage,
            isLoading: false,
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  const clearLocation = useCallback(() => {
    setState({
      location: null,
      error: null,
      isLoading: false,
    });
  }, []);

  return {
    ...state,
    getLocation,
    clearLocation,
  };
}
