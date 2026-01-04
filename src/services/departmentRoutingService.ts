import { RoutingService } from '../../backend/routing.service';
import { TicketCategory, UserRole } from '@/types';

export interface RoutingRule {
  category: TicketCategory;
  department: string;
  assignedRole: UserRole;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  escalationHours?: number;
}

export class DepartmentRoutingService {
  private static routingRules: RoutingRule[] = [
    { category: 'academic_query', department: 'Academic', assignedRole: 'tutor', escalationHours: 24 },
    { category: 'facility_issue', department: 'Maintenance', assignedRole: 'maintenance', escalationHours: 4 },
    { category: 'hostel_issue', department: 'Hostel', assignedRole: 'hostel_warden', escalationHours: 2 },
    { category: 'transport_issue', department: 'Transport', assignedRole: 'transport_officer', escalationHours: 8 },
    { category: 'security_issue', department: 'Security', assignedRole: 'security_staff', priority: 'urgent', escalationHours: 1 },
    { category: 'maintenance', department: 'Maintenance', assignedRole: 'maintenance', escalationHours: 6 },
    { category: 'service_request', department: 'Administration', assignedRole: 'department_staff', escalationHours: 48 },
    { category: 'complaint', department: 'Administration', assignedRole: 'department_staff', escalationHours: 24 },
    { category: 'other', department: 'Administration', assignedRole: 'department_staff', escalationHours: 48 }
  ];

  static getRouting(category: TicketCategory, userDepartment?: string): RoutingRule {
    let rule = this.routingRules.find(r => r.category === category);
    
    if (!rule) {
      rule = this.routingRules.find(r => r.category === 'other')!;
    }

    // Override department for academic queries to user's department
    if (category === 'academic_query' && userDepartment) {
      return { ...rule, department: userDepartment };
    }

    return rule;
  }

  static shouldEscalate(ticketCreatedAt: Date, category: TicketCategory): boolean {
    const rule = this.getRouting(category);
    const hoursElapsed = (Date.now() - ticketCreatedAt.getTime()) / (1000 * 60 * 60);
    return hoursElapsed > (rule.escalationHours || 24);
  }

  static getEscalationPath(currentRole: UserRole): UserRole {
    const escalationMap: Record<UserRole, UserRole> = {
      'tutor': 'teaching_staff',
      'teaching_staff': 'hod',
      'department_staff': 'hod',
      'maintenance': 'admin',
      'security_staff': 'admin',
      'transport_officer': 'admin',
      'hostel_warden': 'admin',
      'lab_assistant': 'hod',
      'supporting_staff': 'admin',
      'hod': 'admin',
      'admin': 'admin',
      'student': 'tutor'
    };

    return escalationMap[currentRole] || 'admin';
  }

  static getPriorityByCategory(category: TicketCategory): 'low' | 'medium' | 'high' | 'urgent' {
    const priorityMap: Record<TicketCategory, 'low' | 'medium' | 'high' | 'urgent'> = {
      'security_issue': 'urgent',
      'facility_issue': 'high',
      'hostel_issue': 'high',
      'maintenance': 'medium',
      'transport_issue': 'medium',
      'academic_query': 'medium',
      'service_request': 'low',
      'complaint': 'medium',
      'other': 'low'
    };

    return priorityMap[category] || 'medium';
  }

  // Use backend routing service for enhanced functionality
  static routeTicketToDepartment(category: string, issueType: string): string {
    return RoutingService.routeTicketToDepartment(category, issueType);
  }

  static canUserHandleTicket(userRole: UserRole, ticketDepartment: string): boolean {
    return RoutingService.canUserHandleTicket(userRole, ticketDepartment);
  }

  static getEstimatedResolutionTime(department: string, priority: string): number {
    return RoutingService.getEstimatedResolutionTime(department, priority);
  }
}