import { UserRole } from '../src/types';

export class RoutingService {
  private static readonly DEPARTMENT_ROUTING = {
    'academic': ['teaching_staff', 'tutor', 'hod'],
    'hostel': ['hostel_warden'],
    'transport': ['transport_officer'],
    'maintenance': ['maintenance'],
    'security': ['security_staff'],
    'lab': ['lab_assistant', 'teaching_staff'],
    'library': ['supporting_staff'],
    'administration': ['admin', 'department_staff'],
    'it': ['admin', 'department_staff'],
    'general': ['admin']
  };

  static routeTicketToDepartment(category: string, issueType: string): string {
    // Academic issues
    if (category === 'academic' || issueType.includes('syllabus') || issueType.includes('lecture')) {
      return 'academic';
    }
    
    // Hostel issues
    if (category === 'hostel' || issueType.includes('room') || issueType.includes('mess')) {
      return 'hostel';
    }
    
    // Transport issues
    if (category === 'transport' || issueType.includes('bus') || issueType.includes('vehicle')) {
      return 'transport';
    }
    
    // Maintenance issues
    if (category === 'maintenance' || issueType.includes('repair') || issueType.includes('cleaning')) {
      return 'maintenance';
    }
    
    // Security issues
    if (category === 'security' || issueType.includes('safety') || issueType.includes('access')) {
      return 'security';
    }
    
    // Lab issues
    if (category === 'lab' || issueType.includes('equipment') || issueType.includes('computer')) {
      return 'lab';
    }
    
    // Library issues
    if (category === 'library' || issueType.includes('book') || issueType.includes('resource')) {
      return 'library';
    }
    
    // IT issues
    if (category === 'it' || issueType.includes('network') || issueType.includes('software')) {
      return 'it';
    }
    
    // Default to general administration
    return 'general';
  }

  static getAssignableRoles(department: string): UserRole[] {
    return this.DEPARTMENT_ROUTING[department] || ['admin'];
  }

  static canUserHandleTicket(userRole: UserRole, ticketDepartment: string): boolean {
    const assignableRoles = this.getAssignableRoles(ticketDepartment);
    return assignableRoles.includes(userRole) || userRole === 'admin';
  }

  static getPriorityLevel(category: string, issueType: string): 'low' | 'medium' | 'high' {
    // High priority issues
    if (category === 'security' || issueType.includes('emergency') || issueType.includes('urgent')) {
      return 'high';
    }
    
    // Medium priority issues
    if (category === 'academic' || category === 'lab' || issueType.includes('exam')) {
      return 'medium';
    }
    
    // Default to low priority
    return 'low';
  }

  static getEstimatedResolutionTime(department: string, priority: string): number {
    const baseTimes = {
      'security': 1, // 1 hour
      'it': 4, // 4 hours
      'maintenance': 24, // 24 hours
      'academic': 48, // 48 hours
      'general': 72 // 72 hours
    };
    
    const baseTime = baseTimes[department] || 72;
    
    switch (priority) {
      case 'high': return baseTime * 0.5;
      case 'medium': return baseTime;
      case 'low': return baseTime * 2;
      default: return baseTime;
    }
  }
}