import { CampusLocation } from '@/types';

export interface QRCodeData {
  locationId: string;
  type: 'location' | 'facility';
  coordinates: {
    latitude: number;
    longitude: number;
  };
  metadata?: {
    building?: string;
    floor?: string;
    description?: string;
  };
}

export class QRCodeService {
  static generateQRData(location: CampusLocation): QRCodeData {
    return {
      locationId: location.id,
      type: 'location',
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      metadata: {
        building: location.building,
        floor: location.floor,
        description: location.description
      }
    };
  }

  static parseQRData(qrString: string): QRCodeData | null {
    try {
      return JSON.parse(qrString);
    } catch {
      return null;
    }
  }

  static generateQRString(location: CampusLocation): string {
    return JSON.stringify(this.generateQRData(location));
  }
}