import { FirestoreService } from '../firestore.service';
import { StorageService } from '../storage.service';
import { Lecture } from '../../src/types';

export class LectureService {
  private static readonly COLLECTION = 'lectures';
  private static readonly STORAGE_FOLDER = 'lectures';

  static async uploadLecture(lecture: Omit<Lecture, 'id' | 'videoUrl'>, videoFile: File): Promise<string> {
    // Upload video file
    const videoPath = StorageService.generateFilePath(this.STORAGE_FOLDER, videoFile.name);
    const videoUrl = await StorageService.uploadFile(videoPath, videoFile);

    // Create lecture document
    const lectureData = { ...lecture, videoUrl };
    return await FirestoreService.create(this.COLLECTION, lectureData);
  }

  static async getLectureById(lectureId: string): Promise<Lecture | null> {
    return await FirestoreService.getById(this.COLLECTION, lectureId);
  }

  static async getLecturesByDepartment(department: string): Promise<Lecture[]> {
    const lectures = await FirestoreService.getWhere(this.COLLECTION, 'department', '==', department);
    return lectures.filter(lecture => lecture.isPublished);
  }

  static async getAllLectures(): Promise<Lecture[]> {
    return await FirestoreService.getAll(this.COLLECTION);
  }

  static async updateLecture(lectureId: string, updates: Partial<Lecture>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, lectureId, updates);
  }

  static async deleteLecture(lectureId: string): Promise<void> {
    const lecture = await this.getLectureById(lectureId);
    if (lecture?.videoUrl) {
      // Extract path from URL and delete file
      const path = lecture.videoUrl.split('/').pop();
      if (path) {
        await StorageService.deleteFile(`${this.STORAGE_FOLDER}/${path}`);
      }
    }
    await FirestoreService.delete(this.COLLECTION, lectureId);
  }

  static async publishLecture(lectureId: string): Promise<void> {
    await this.updateLecture(lectureId, { isPublished: true });
  }

  static async unpublishLecture(lectureId: string): Promise<void> {
    await this.updateLecture(lectureId, { isPublished: false });
  }
}