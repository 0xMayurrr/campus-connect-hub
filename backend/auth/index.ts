import { FirestoreService } from '../firestore.service';
import { User } from '../../src/types';

export class AuthService {
  private static readonly COLLECTION = 'users';

  static async createUser(user: Omit<User, 'id'>): Promise<string> {
    return await FirestoreService.create(this.COLLECTION, user);
  }

  static async getUserById(userId: string): Promise<User | null> {
    return await FirestoreService.getById(this.COLLECTION, userId);
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const users = await FirestoreService.getWhere(this.COLLECTION, 'email', '==', email);
    return users.length > 0 ? users[0] : null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, userId, updates);
  }

  static async getUsersByRole(role: string): Promise<User[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'role', '==', role);
  }

  static async getUsersByDepartment(department: string): Promise<User[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'department', '==', department);
  }

  static async getAllUsers(): Promise<User[]> {
    return await FirestoreService.getAll(this.COLLECTION);
  }
}