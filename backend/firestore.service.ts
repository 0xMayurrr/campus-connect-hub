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
import { db } from './firebase';

export class FirestoreService {
  static async create(collectionName: string, data: any): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  }

  static async update(collectionName: string, docId: string, updates: any): Promise<void> {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updates);
  }

  static async delete(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  }

  static async getById(collectionName: string, docId: string): Promise<any | null> {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  static async getAll(collectionName: string): Promise<any[]> {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getWhere(collectionName: string, field: string, operator: any, value: any): Promise<any[]> {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getOrderedWhere(
    collectionName: string, 
    whereField: string, 
    operator: any, 
    value: any,
    orderField: string,
    orderDirection: 'asc' | 'desc' = 'desc'
  ): Promise<any[]> {
    const q = query(
      collection(db, collectionName),
      where(whereField, operator, value),
      orderBy(orderField, orderDirection)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static subscribeToCollection(
    collectionName: string,
    callback: (data: any[]) => void,
    whereField?: string,
    operator?: any,
    value?: any,
    orderField?: string,
    orderDirection: 'asc' | 'desc' = 'desc'
  ) {
    let q = collection(db, collectionName);
    
    if (whereField && operator && value !== undefined) {
      q = query(q, where(whereField, operator, value));
    }
    
    if (orderField) {
      q = query(q, orderBy(orderField, orderDirection));
    }
    
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
  }
}