import { TicketService } from '../../backend/tickets';
import { LectureService } from '../../backend/lectures';
import { SyllabusService } from '../../backend/syllabus';
import { AuthService } from '../../backend/auth';
import { NoticeService } from '../../backend/notices';
import { Ticket, User, Lecture, Syllabus, Notice } from '@/types';

export class FirebaseService {
  // Ticket operations
  static async createTicket(ticket: Omit<Ticket, 'id'>): Promise<string> {
    return await TicketService.createTicket(ticket);
  }

  static async updateTicket(ticketId: string, updates: Partial<Ticket>): Promise<void> {
    await TicketService.updateTicket(ticketId, updates);
  }

  static async getUserTickets(userId: string): Promise<Ticket[]> {
    return await TicketService.getUserTickets(userId);
  }

  // User operations
  static async createUser(user: Omit<User, 'id'>): Promise<string> {
    return await AuthService.createUser(user);
  }

  static async getUser(userId: string): Promise<User | null> {
    return await AuthService.getUserById(userId);
  }

  // Lecture operations
  static async uploadLecture(lecture: Omit<Lecture, 'id' | 'videoUrl'>, videoFile: File): Promise<string> {
    return await LectureService.uploadLecture(lecture, videoFile);
  }

  static async getLecturesByDepartment(department: string): Promise<Lecture[]> {
    return await LectureService.getLecturesByDepartment(department);
  }

  // Syllabus operations
  static async uploadSyllabus(syllabus: Omit<Syllabus, 'id' | 'fileUrl'>, file: File): Promise<string> {
    return await SyllabusService.uploadSyllabus(syllabus, file);
  }

  // Notice operations
  static async createNotice(notice: Omit<Notice, 'id'>): Promise<string> {
    return await NoticeService.createNotice(notice);
  }

  static async getNoticesForRole(role: string): Promise<Notice[]> {
    return await NoticeService.getNoticesForRole(role);
  }

  // Real-time subscriptions
  static subscribeToUserTickets(userId: string, callback: (tickets: Ticket[]) => void) {
    return TicketService.subscribeToUserTickets(userId, callback);
  }
}