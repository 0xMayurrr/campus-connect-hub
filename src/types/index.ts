// User roles for the campus system
export type UserRole = 
  | 'student'
  | 'teaching_staff'
  | 'tutor'
  | 'department_staff'
  | 'hod'
  | 'admin'
  | 'hostel_warden'
  | 'security_staff'
  | 'maintenance'
  | 'transport_officer'
  | 'lab_assistant'
  | 'supporting_staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  rollNumber?: string;
  avatar?: string;
  createdAt: Date;
}

// Ticket system types
export type TicketStatus = 'pending' | 'in_progress' | 'resolved' | 'escalated' | 'rejected';
export type TicketCategory = 
  | 'complaint'
  | 'service_request'
  | 'facility_issue'
  | 'academic_query'
  | 'hostel_issue'
  | 'transport_issue'
  | 'security_issue'
  | 'maintenance'
  | 'other';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketLocation {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
  campusZone?: string;
  timestamp: Date;
}

export interface TicketActivityLog {
  id: string;
  ticketId: string;
  action: string;
  performedBy: string;
  performedByRole: UserRole;
  timestamp: Date;
  notes?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  department: string;
  submittedBy: string;
  submitterName: string;
  submitterEmail: string;
  submitterRollNumber?: string;
  assignedTo?: string;
  assignedRole?: UserRole;
  location?: TicketLocation;
  attachments?: string[];
  activityLog: TicketActivityLog[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

// Campus location types
export interface CampusLocation {
  id: string;
  name: string;
  type: 'academic' | 'hostel' | 'facility' | 'admin' | 'transport' | 'other';
  description?: string;
  latitude: number;
  longitude: number;
  qrCode?: string;
  building?: string;
  floor?: string;
}

// Notice types
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  department?: string;
  targetRoles: UserRole[];
  priority: 'normal' | 'important' | 'urgent';
  publishedBy: string;
  publishedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

// Lecture/Video types
export interface Lecture {
  id: string;
  title: string;
  description?: string;
  department: string;
  course: string;
  semester: string;
  subject: string;
  topic?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: number;
  uploadedBy: string;
  uploadedAt: Date;
  isPublished: boolean;
}

// Syllabus types
export interface Syllabus {
  id: string;
  title: string;
  department: string;
  course: string;
  semester: string;
  subject: string;
  fileUrl: string;
  extractedContent?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Department types
export interface Department {
  id: string;
  name: string;
  code: string;
  hodId?: string;
  description?: string;
}
