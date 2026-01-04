import { FirestoreService } from '../firestore.service';
import { LocationService, CampusLocation } from '../locations';

export interface QRCodeData {
  id: string;
  locationId: string;
  qrCode: string;
  createdAt: Date;
  isActive: boolean;
}

export class QRService {
  private static readonly COLLECTION = 'qr_codes';

  static async createQRCode(qrData: Omit<QRCodeData, 'id'>): Promise<string> {
    return await FirestoreService.create(this.COLLECTION, qrData);
  }

  static async getQRCodeById(qrId: string): Promise<QRCodeData | null> {
    return await FirestoreService.getById(this.COLLECTION, qrId);
  }

  static async getQRCodeByCode(qrCode: string): Promise<QRCodeData | null> {
    const qrCodes = await FirestoreService.getWhere(this.COLLECTION, 'qrCode', '==', qrCode);
    return qrCodes.length > 0 ? qrCodes[0] : null;
  }

  static async getLocationByQRCode(qrCode: string): Promise<CampusLocation | null> {
    const qrData = await this.getQRCodeByCode(qrCode);
    if (!qrData || !qrData.isActive) {
      return null;
    }
    return await LocationService.getLocationById(qrData.locationId);
  }

  static async getAllQRCodes(): Promise<QRCodeData[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'isActive', '==', true);
  }

  static async updateQRCode(qrId: string, updates: Partial<QRCodeData>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, qrId, updates);
  }

  static async deactivateQRCode(qrId: string): Promise<void> {
    await this.updateQRCode(qrId, { isActive: false });
  }

  static async activateQRCode(qrId: string): Promise<void> {
    await this.updateQRCode(qrId, { isActive: true });
  }

  static generateQRCode(): string {
    return `QR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}