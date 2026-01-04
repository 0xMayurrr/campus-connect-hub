import { FirestoreService } from '../firestore.service';

export interface CampusLocation {
  id: string;
  name: string;
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  qrCode?: string;
  building?: string;
  floor?: string;
}

export class LocationService {
  private static readonly COLLECTION = 'locations';

  static async createLocation(location: Omit<CampusLocation, 'id'>): Promise<string> {
    return await FirestoreService.create(this.COLLECTION, location);
  }

  static async getLocationById(locationId: string): Promise<CampusLocation | null> {
    return await FirestoreService.getById(this.COLLECTION, locationId);
  }

  static async getAllLocations(): Promise<CampusLocation[]> {
    return await FirestoreService.getAll(this.COLLECTION);
  }

  static async getLocationsByType(type: string): Promise<CampusLocation[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'type', '==', type);
  }

  static async getLocationsByBuilding(building: string): Promise<CampusLocation[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'building', '==', building);
  }

  static async updateLocation(locationId: string, updates: Partial<CampusLocation>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, locationId, updates);
  }

  static async deleteLocation(locationId: string): Promise<void> {
    await FirestoreService.delete(this.COLLECTION, locationId);
  }

  static async searchLocations(searchTerm: string): Promise<CampusLocation[]> {
    const allLocations = await this.getAllLocations();
    return allLocations.filter(location => 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.building?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}