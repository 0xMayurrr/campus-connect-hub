import { UserRole, Ticket } from '@/types';

export interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  path?: string;
  action?: () => void;
  count?: number;
  priority?: 'high' | 'medium' | 'low';
}

export interface DashboardInsight {
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'stable';
  color?: 'primary' | 'success' | 'warning' | 'destructive';
}

export class RoleDashboardService {
  static getDashboardModules(role: UserRole, tickets: Ticket[] = []): DashboardModule[] {
    const roleTickets = this.getFilteredTickets(role, tickets);
    
    switch (role) {
      case 'student':
        return this.getStudentModules(roleTickets);
      case 'teaching_staff':
        return this.getTeachingStaffModules(roleTickets);
      case 'tutor':
        return this.getTutorModules(roleTickets);
      case 'department_staff':
        return this.getDepartmentStaffModules(roleTickets);
      case 'hod':
        return this.getHODModules(roleTickets);
      case 'admin':
        return this.getAdminModules(roleTickets);
      case 'hostel_warden':
        return this.getWardenModules(roleTickets);
      case 'maintenance':
        return this.getMaintenanceModules(roleTickets);
      case 'security_staff':
        return this.getSecurityModules(roleTickets);
      case 'transport_officer':
        return this.getTransportModules(roleTickets);
      case 'lab_assistant':
        return this.getLabAssistantModules(roleTickets);
      case 'supporting_staff':
        return this.getSupportingStaffModules(roleTickets);
      default:
        return [];
    }
  }

  static getDashboardInsights(role: UserRole, tickets: Ticket[] = []): DashboardInsight[] {
    const roleTickets = this.getFilteredTickets(role, tickets);
    
    const baseInsights = [
      {
        label: 'Total Tickets',
        value: roleTickets.length,
        color: 'primary' as const
      },
      {
        label: 'Pending',
        value: roleTickets.filter(t => t.status === 'pending').length,
        color: 'warning' as const
      },
      {
        label: 'In Progress',
        value: roleTickets.filter(t => t.status === 'in_progress').length,
        color: 'primary' as const
      },
      {
        label: 'Resolved',
        value: roleTickets.filter(t => t.status === 'resolved').length,
        color: 'success' as const
      }
    ];

    return baseInsights;
  }

  private static getFilteredTickets(role: UserRole, tickets: Ticket[]): Ticket[] {
    switch (role) {
      case 'student':
        return tickets; // Already filtered by user in context
      case 'teaching_staff':
      case 'tutor':
        return tickets.filter(t => t.category === 'academic_query');
      case 'hostel_warden':
        return tickets.filter(t => t.category === 'hostel_issue');
      case 'maintenance':
        return tickets.filter(t => t.category === 'facility_issue' || t.category === 'maintenance');
      case 'security_staff':
        return tickets.filter(t => t.category === 'security_issue');
      case 'transport_officer':
        return tickets.filter(t => t.category === 'transport_issue');
      default:
        return tickets;
    }
  }

  private static getStudentModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'submit-request',
        title: 'Submit Request',
        description: 'Create new support ticket',
        icon: 'Send',
        path: '/submit'
      },
      {
        id: 'my-tickets',
        title: 'My Tickets',
        description: 'Track request status',
        icon: 'Ticket',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'ai-teacher',
        title: 'AI Teacher',
        description: 'Academic assistance',
        icon: 'GraduationCap',
        path: '/ai-teacher'
      },
      {
        id: 'campus-assistant',
        title: 'Campus Assistant',
        description: 'General campus help',
        icon: 'Bot',
        path: '/ai-assistant'
      },
      {
        id: 'lectures',
        title: 'Video Lectures',
        description: 'Access course materials',
        icon: 'Video',
        path: '/lectures'
      },
      {
        id: 'navigation',
        title: 'Campus Navigation',
        description: 'QR codes & directions',
        icon: 'MapPin',
        path: '/navigate'
      }
    ];
  }

  private static getTeachingStaffModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'student-queries',
        title: 'Student Queries',
        description: 'Academic questions assigned',
        icon: 'MessageSquare',
        path: '/tickets',
        count: tickets.filter(t => t.status === 'pending').length
      },
      {
        id: 'upload-lectures',
        title: 'Upload Lectures',
        description: 'Manage video content',
        icon: 'Upload',
        path: '/manage-lectures'
      },
      {
        id: 'syllabus-management',
        title: 'Syllabus Management',
        description: 'Upload course materials',
        icon: 'BookOpen',
        path: '/syllabus'
      },
      {
        id: 'ai-teacher-validation',
        title: 'AI Teacher Review',
        description: 'Validate AI responses',
        icon: 'GraduationCap',
        path: '/ai-teacher'
      },
      {
        id: 'department-notices',
        title: 'Department Notices',
        description: 'Publish announcements',
        icon: 'Bell',
        path: '/notices'
      }
    ];
  }

  private static getTutorModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'student-tickets',
        title: 'Student Issues',
        description: 'Assigned student requests',
        icon: 'Users',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'screening-queue',
        title: 'Screening Queue',
        description: 'First-level verification',
        icon: 'Filter',
        count: tickets.filter(t => t.status === 'pending').length
      },
      {
        id: 'escalation-center',
        title: 'Escalation Center',
        description: 'Forward to HOD/Staff',
        icon: 'ArrowUp'
      },
      {
        id: 'mentoring-notes',
        title: 'Mentoring Notes',
        description: 'Student guidance records',
        icon: 'FileText'
      }
    ];
  }

  private static getDepartmentStaffModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'department-inbox',
        title: 'Department Inbox',
        description: 'Department-level tickets',
        icon: 'Inbox',
        path: '/tickets',
        count: tickets.filter(t => t.status === 'pending').length
      },
      {
        id: 'ticket-assignment',
        title: 'Ticket Assignment',
        description: 'Assign to handlers',
        icon: 'UserCheck'
      },
      {
        id: 'facility-tracking',
        title: 'Facility Issues',
        description: 'Infrastructure problems',
        icon: 'Building',
        count: tickets.filter(t => t.category === 'facility_issue').length
      },
      {
        id: 'service-logs',
        title: 'Service Logs',
        description: 'Department activity',
        icon: 'Activity'
      }
    ];
  }

  private static getHODModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'department-overview',
        title: 'Department Overview',
        description: 'Full department visibility',
        icon: 'Eye',
        path: '/tickets'
      },
      {
        id: 'approval-center',
        title: 'Approval Center',
        description: 'Approve/reject requests',
        icon: 'CheckCircle',
        count: tickets.filter(t => t.status === 'escalated').length
      },
      {
        id: 'faculty-monitoring',
        title: 'Faculty Activity',
        description: 'Monitor resolution activity',
        icon: 'Users'
      },
      {
        id: 'analytics-dashboard',
        title: 'Department Analytics',
        description: 'Performance insights',
        icon: 'BarChart'
      },
      {
        id: 'report-export',
        title: 'Export Reports',
        description: 'Generate department reports',
        icon: 'Download'
      }
    ];
  }

  private static getAdminModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'system-monitoring',
        title: 'System Monitoring',
        description: 'Full system visibility',
        icon: 'Monitor',
        path: '/tickets'
      },
      {
        id: 'user-management',
        title: 'User Management',
        description: 'Manage roles & users',
        icon: 'Users'
      },
      {
        id: 'global-announcements',
        title: 'Global Announcements',
        description: 'System-wide notices',
        icon: 'Megaphone',
        path: '/notices'
      },
      {
        id: 'qr-registry',
        title: 'QR Location Registry',
        description: 'Manage campus QR codes',
        icon: 'QrCode'
      },
      {
        id: 'system-analytics',
        title: 'System Analytics',
        description: 'Platform insights',
        icon: 'TrendingUp'
      }
    ];
  }

  private static getWardenModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'hostel-complaints',
        title: 'Hostel Complaints',
        description: 'Water, electricity, safety',
        icon: 'Home',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'maintenance-assignment',
        title: 'Maintenance Tasks',
        description: 'Assign to technicians',
        icon: 'Wrench'
      },
      {
        id: 'block-monitoring',
        title: 'Block Monitoring',
        description: 'Room/block issues',
        icon: 'Building'
      },
      {
        id: 'safety-alerts',
        title: 'Safety Alerts',
        description: 'Emergency notifications',
        icon: 'AlertTriangle',
        priority: 'high'
      }
    ];
  }

  private static getMaintenanceModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'facility-complaints',
        title: 'Facility Issues',
        description: 'Infrastructure problems',
        icon: 'Building',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'location-mapping',
        title: 'Location Mapping',
        description: 'QR-based issue tracking',
        icon: 'MapPin'
      },
      {
        id: 'task-assignment',
        title: 'Task Assignment',
        description: 'Assign to technicians',
        icon: 'UserCheck'
      },
      {
        id: 'work-logs',
        title: 'Work Status',
        description: 'Update progress',
        icon: 'Activity'
      }
    ];
  }

  private static getSecurityModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'incident-reports',
        title: 'Incident Reports',
        description: 'Security-related issues',
        icon: 'Shield',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'emergency-alerts',
        title: 'Emergency Alerts',
        description: 'Priority incidents',
        icon: 'AlertTriangle',
        priority: 'high',
        count: tickets.filter(t => t.priority === 'urgent').length
      },
      {
        id: 'patrol-logs',
        title: 'Patrol Logs',
        description: 'Shift/post logs',
        icon: 'Clock'
      },
      {
        id: 'location-incidents',
        title: 'Location Mapping',
        description: 'Incident locations',
        icon: 'MapPin'
      }
    ];
  }

  private static getTransportModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'transport-requests',
        title: 'Transport Requests',
        description: 'Service requests',
        icon: 'Bus',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'route-management',
        title: 'Route Management',
        description: 'Bus timing & routes',
        icon: 'Route'
      },
      {
        id: 'student-communication',
        title: 'Student Communication',
        description: 'Updates & notifications',
        icon: 'MessageSquare'
      },
      {
        id: 'lost-found',
        title: 'Lost & Found',
        description: 'Item reports',
        icon: 'Search'
      }
    ];
  }

  private static getLabAssistantModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'equipment-issues',
        title: 'Equipment Issues',
        description: 'Lab equipment problems',
        icon: 'Monitor',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'safety-notifications',
        title: 'Safety Alerts',
        description: 'Hazard notifications',
        icon: 'AlertTriangle',
        priority: 'high'
      },
      {
        id: 'maintenance-requests',
        title: 'Maintenance Requests',
        description: 'Forward to IT/Maintenance',
        icon: 'Wrench'
      },
      {
        id: 'asset-logs',
        title: 'Asset Management',
        description: 'Lab equipment tracking',
        icon: 'Package'
      }
    ];
  }

  private static getSupportingStaffModules(tickets: Ticket[]): DashboardModule[] {
    return [
      {
        id: 'service-tickets',
        title: 'Service Tickets',
        description: 'General support requests',
        icon: 'Headphones',
        path: '/tickets',
        count: tickets.length
      },
      {
        id: 'task-list',
        title: 'Task Assignment',
        description: 'Work assignments',
        icon: 'CheckSquare'
      },
      {
        id: 'completion-updates',
        title: 'Update Status',
        description: 'Mark tasks complete',
        icon: 'CheckCircle'
      },
      {
        id: 'work-history',
        title: 'Work History',
        description: 'Department logs',
        icon: 'History'
      }
    ];
  }
}