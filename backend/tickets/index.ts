import { FirestoreService } from '../firestore.service';
import { Ticket } from '../../src/types';

export class TicketService {
  private static readonly COLLECTION = 'tickets';

  static async createTicket(ticket: Omit<Ticket, 'id'>): Promise<string> {
    return await FirestoreService.create(this.COLLECTION, ticket);
  }

  static async updateTicket(ticketId: string, updates: Partial<Ticket>): Promise<void> {
    await FirestoreService.update(this.COLLECTION, ticketId, updates);
  }

  static async getTicketById(ticketId: string): Promise<Ticket | null> {
    return await FirestoreService.getById(this.COLLECTION, ticketId);
  }

  static async getUserTickets(userId: string): Promise<Ticket[]> {
    return await FirestoreService.getOrderedWhere(
      this.COLLECTION,
      'submittedBy',
      '==',
      userId,
      'createdAt'
    );
  }

  static async getAllTickets(): Promise<Ticket[]> {
    return await FirestoreService.getAll(this.COLLECTION);
  }

  static async getTicketsByStatus(status: string): Promise<Ticket[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'status', '==', status);
  }

  static async getTicketsByDepartment(department: string): Promise<Ticket[]> {
    return await FirestoreService.getWhere(this.COLLECTION, 'department', '==', department);
  }

  static subscribeToUserTickets(userId: string, callback: (tickets: Ticket[]) => void) {
    return FirestoreService.subscribeToCollection(
      this.COLLECTION,
      callback,
      'submittedBy',
      '==',
      userId,
      'createdAt'
    );
  }

  static subscribeToAllTickets(callback: (tickets: Ticket[]) => void) {
    return FirestoreService.subscribeToCollection(
      this.COLLECTION,
      callback,
      undefined,
      undefined,
      undefined,
      'createdAt'
    );
  }
}