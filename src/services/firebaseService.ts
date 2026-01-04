import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Ticket, User, Lecture, Syllabus, Notice } from '@/types';

export class FirebaseService {
  // Ticket operations
  static async createTicket(ticket: Omit<Ticket, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'tickets'), ticket);
    return docRef.id;
  }

  static async updateTicket(ticketId: string, updates: Partial<Ticket>): Promise<void> {
    const ticketRef = doc(db, 'tickets', ticketId);
    await updateDoc(ticketRef, updates);
  }

  static async getUserTickets(userId: string): Promise<Ticket[]> {
    const q = query(
      collection(db, 'tickets'),
      where('submittedBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
  }

  // User operations
  static async createUser(user: Omit<User, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'users'), user);
    return docRef.id;
  }

  static async getUser(userId: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as User : null;
  }

  // Lecture operations
  static async uploadLecture(lecture: Omit<Lecture, 'id' | 'videoUrl'>, videoFile: File): Promise<string> {
    // Upload video file
    const videoRef = ref(storage, `lectures/${Date.now()}_${videoFile.name}`);
    const videoSnapshot = await uploadBytes(videoRef, videoFile);
    const videoUrl = await getDownloadURL(videoSnapshot.ref);

    // Create lecture document
    const lectureData = { ...lecture, videoUrl };
    const docRef = await addDoc(collection(db, 'lectures'), lectureData);
    return docRef.id;
  }

  static async getLecturesByDepartment(department: string): Promise<Lecture[]> {
    const q = query(
      collection(db, 'lectures'),
      where('department', '==', department),
      where('isPublished', '==', true),
      orderBy('uploadedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lecture));
  }

  // Syllabus operations
  static async uploadSyllabus(syllabus: Omit<Syllabus, 'id' | 'fileUrl'>, file: File): Promise<string> {
    // Upload syllabus file
    const fileRef = ref(storage, `syllabus/${Date.now()}_${file.name}`);
    const fileSnapshot = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileSnapshot.ref);

    // Create syllabus document
    const syllabusData = { ...syllabus, fileUrl };
    const docRef = await addDoc(collection(db, 'syllabus'), syllabusData);
    return docRef.id;
  }

  // Notice operations
  static async createNotice(notice: Omit<Notice, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'notices'), notice);
    return docRef.id;
  }

  static async getNoticesForRole(role: string): Promise<Notice[]> {
    const q = query(
      collection(db, 'notices'),
      where('targetRoles', 'array-contains', role),
      where('isActive', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
  }

  // Real-time subscriptions
  static subscribeToUserTickets(userId: string, callback: (tickets: Ticket[]) => void) {
    const q = query(
      collection(db, 'tickets'),
      where('submittedBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
      callback(tickets);
    });
  }
}