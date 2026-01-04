import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export class StorageService {
  static async uploadFile(path: string, file: File): Promise<string> {
    const fileRef = ref(storage, path);
    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  static async deleteFile(path: string): Promise<void> {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  }

  static generateFilePath(folder: string, fileName: string): string {
    return `${folder}/${Date.now()}_${fileName}`;
  }
}