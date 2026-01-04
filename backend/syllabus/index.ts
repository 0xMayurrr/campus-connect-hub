import { FirestoreService } from '../firestore.service';
import { StorageService } from '../storage.service';
import { Syllabus } from '../../src/types';

export class SyllabusService {
  private static readonly COLLECTION = 'syllabus';
  private static readonly STORAGE_FOLDER = 'syllabus';

  static async uploadSyllabus(syllabus: Omit<Syllabus, 'id' | 'fileUrl'>, file: File): Promise<string> {
    // Upload syllabus file
    const filePath = StorageService.generateFilePath(this.STORAGE_FOLDER, file.name);
    const fileUrl = await StorageService.uploadFile(filePath, file);

    // Create syllabus document
    const syllabusData = { ...syllabus, fileUrl };
    return await FirestoreService.create(this.COLLECTION, syllabusData);
  }

  static async getSyllabusById(syllabusId: string): Promise<Syllabus | null> {
    return await FirestoreService.getById(this.COLLECTION, syllabusId);
  }

  static async getSyllabusByDepartment(department: string): Promise<Syllabus[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'department', '==', department);
  }

  static async getSyllabusBySubject(subject: string): Promise<Syllabus[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'subject', '==', subject);
  }

  static async getAllSyllabus(): Promise<Syllabus[]> {
    return await FirestoreService.getAll(this.COLLECTION);
  }

  static async updateSyllabus(syllabusId: string, updates: Partial<Syllabus>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, syllabusId, updates);
  }

  static async deleteSyllabus(syllabusId: string): Promise<void> {
    const syllabus = await this.getSyllabusById(syllabusId);
    if (syllabus?.fileUrl) {
      // Extract path from URL and delete file
      const path = syllabus.fileUrl.split('/').pop();
      if (path) {
        await StorageService.deleteFile(`${this.STORAGE_FOLDER}/${path}`);
      }
    }
    await FirestoreService.delete(this.COLLECTION, syllabusId);
  }
}