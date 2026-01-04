import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Ticket, TicketStatus, TicketCategory, TicketPriority, TicketLocation, TicketActivityLog } from '@/types';
import { useAuth } from './AuthContext';

interface TicketContextType {
  tickets: Ticket[];
  isLoading: boolean;
  createTicket: (data: CreateTicketData) => Promise<Ticket>;
  updateTicketStatus: (ticketId: string, status: TicketStatus, notes?: string) => Promise<void>;
  getTicketById: (ticketId: string) => Ticket | undefined;
  getUserTickets: () => Ticket[];
}

interface CreateTicketData {
  title: string;
  description: string;
  category: TicketCategory;
  department: string;
  priority?: TicketPriority;
  location?: TicketLocation;
  attachments?: string[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Generate ticket number
const generateTicketNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TKT${year}${month}${random}`;
};

// Mock initial tickets
const initialTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TKT240101',
    title: 'AC not working in Lab 3',
    description: 'The air conditioning unit in Computer Lab 3 is not functioning properly. Room temperature is too high.',
    category: 'facility_issue',
    status: 'in_progress',
    priority: 'high',
    department: 'Computer Science',
    submittedBy: '1',
    submitterName: 'John Student',
    submitterEmail: 'student@campus.edu',
    submitterRollNumber: 'CS2024001',
    assignedTo: 'maintenance-1',
    assignedRole: 'maintenance',
    location: {
      latitude: 10.9687,
      longitude: 76.9463,
      address: 'Computer Lab 3, CS Block',
      campusZone: 'Academic Zone',
      timestamp: new Date(),
    },
    activityLog: [
      {
        id: '1',
        ticketId: '1',
        action: 'Ticket created',
        performedBy: '1',
        performedByRole: 'student',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        ticketId: '1',
        action: 'Assigned to maintenance team',
        performedBy: 'admin-1',
        performedByRole: 'admin',
        timestamp: new Date(Date.now() - 43200000),
      },
    ],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    id: '2',
    ticketNumber: 'TKT240102',
    title: 'Library book return issue',
    description: 'System showing wrong due date for returned books. Please check and update.',
    category: 'service_request',
    status: 'pending',
    priority: 'medium',
    department: 'Library',
    submittedBy: '1',
    submitterName: 'John Student',
    submitterEmail: 'student@campus.edu',
    submitterRollNumber: 'CS2024001',
    activityLog: [
      {
        id: '1',
        ticketId: '2',
        action: 'Ticket created',
        performedBy: '1',
        performedByRole: 'student',
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    ticketNumber: 'TKT240103',
    title: 'Hostel water supply interrupted',
    description: 'No water supply in Hostel Block A since morning.',
    category: 'hostel_issue',
    status: 'resolved',
    priority: 'urgent',
    department: 'Hostel',
    submittedBy: '1',
    submitterName: 'John Student',
    submitterEmail: 'student@campus.edu',
    submitterRollNumber: 'CS2024001',
    assignedTo: 'warden-1',
    assignedRole: 'hostel_warden',
    activityLog: [
      {
        id: '1',
        ticketId: '3',
        action: 'Ticket created',
        performedBy: '1',
        performedByRole: 'student',
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: '2',
        ticketId: '3',
        action: 'Issue resolved - water supply restored',
        performedBy: 'warden-1',
        performedByRole: 'hostel_warden',
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 86400000),
    resolvedAt: new Date(Date.now() - 86400000),
  },
];

export function TicketProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [isLoading, setIsLoading] = useState(false);

  const createTicket = async (data: CreateTicketData): Promise<Ticket> => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      ticketNumber: generateTicketNumber(),
      title: data.title,
      description: data.description,
      category: data.category,
      status: 'pending',
      priority: data.priority || 'medium',
      department: data.department,
      submittedBy: user.id,
      submitterName: user.name,
      submitterEmail: user.email,
      submitterRollNumber: user.rollNumber,
      location: data.location,
      attachments: data.attachments,
      activityLog: [
        {
          id: crypto.randomUUID(),
          ticketId: '',
          action: 'Ticket created',
          performedBy: user.id,
          performedByRole: user.role,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    newTicket.activityLog[0].ticketId = newTicket.id;
    setTickets((prev) => [newTicket, ...prev]);
    setIsLoading(false);
    return newTicket;
  };

  const updateTicketStatus = async (ticketId: string, status: TicketStatus, notes?: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          const newLog: TicketActivityLog = {
            id: crypto.randomUUID(),
            ticketId,
            action: `Status changed to ${status}${notes ? `: ${notes}` : ''}`,
            performedBy: user.id,
            performedByRole: user.role,
            timestamp: new Date(),
            notes,
          };
          return {
            ...ticket,
            status,
            updatedAt: new Date(),
            resolvedAt: status === 'resolved' ? new Date() : ticket.resolvedAt,
            activityLog: [...ticket.activityLog, newLog],
          };
        }
        return ticket;
      })
    );
    setIsLoading(false);
  };

  const getTicketById = (ticketId: string) => {
    return tickets.find((t) => t.id === ticketId);
  };

  const getUserTickets = () => {
    if (!user) return [];
    return tickets.filter((t) => t.submittedBy === user.id);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        isLoading,
        createTicket,
        updateTicketStatus,
        getTicketById,
        getUserTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}
