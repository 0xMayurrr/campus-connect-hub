import { FirestoreService } from '../firestore.service';
import { Notice } from '../../src/types';

export class NoticeService {
  private static readonly COLLECTION = 'notices';

  static async createNotice(notice: Omit<Notice, 'id'>): Promise<string> {
    return await FirestoreService.create(this.COLLECTION, notice);
  }

  static async getNoticeById(noticeId: string): Promise<Notice | null> {
    return await FirestoreService.getById(this.COLLECTION, noticeId);
  }

  static async getNoticesForRole(role: string): Promise<Notice[]> {
    const notices = await FirestoreService.getOrderedWhere(
      this.COLLECTION,
      'isActive',
      '==',
      true,
      'publishedAt'
    );
    return notices.filter(notice => notice.targetRoles.includes(role));
  }

  static async getAllNotices(): Promise<Notice[]> {
    return await FirestoreService.getOrderedWhere(
      this.COLLECTION,
      'isActive',
      '==',
      true,
      'publishedAt'
    );
  }

  static async updateNotice(noticeId: string, updates: Partial<Notice>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, noticeId, updates);
  }

  static async deleteNotice(noticeId: string): Promise<void> {
    await FirestoreService.delete(this.COLLECTION, noticeId);
  }

  static async deactivateNotice(noticeId: string): Promise<void> {
    await this.updateNotice(noticeId, { isActive: false });
  }

  static async activateNotice(noticeId: string): Promise<void> {
    await this.updateNotice(noticeId, { isActive: true });
  }
}