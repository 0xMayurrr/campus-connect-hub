import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets } from '@/contexts/TicketContext';
import { Ticket, TicketStatus, UserRole } from '@/types';
import { 
  Clock, MapPin, User, ArrowUp, CheckCircle, X, 
  MessageSquare, AlertTriangle, Eye 
} from 'lucide-react';

interface RoleTicketManagerProps {
  tickets: Ticket[];
  onTicketUpdate?: (ticketId: string, status: TicketStatus, notes?: string) => void;
}

export function RoleTicketManager({ tickets, onTicketUpdate }: RoleTicketManagerProps) {
  const { user } = useAuth();
  const { updateTicketStatus } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'default';
      case 'resolved': return 'success';
      case 'escalated': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getAvailableActions = (ticket: Ticket): TicketStatus[] => {
    const actions: TicketStatus[] = [];
    
    switch (user?.role) {
      case 'tutor':
      case 'teaching_staff':
        if (ticket.status === 'pending') {
          actions.push('in_progress', 'escalated');
        }
        if (ticket.status === 'in_progress') {
          actions.push('resolved', 'escalated');
        }
        break;
      
      case 'department_staff':
        if (ticket.status === 'pending') {
          actions.push('in_progress');
        }
        if (ticket.status === 'in_progress') {
          actions.push('resolved', 'escalated');
        }
        break;
      
      case 'hod':
      case 'admin':
        actions.push('in_progress', 'resolved', 'escalated', 'rejected');
        break;
      
      case 'maintenance':
      case 'security_staff':
      case 'hostel_warden':
      case 'transport_officer':
      case 'lab_assistant':
      case 'supporting_staff':
        if (ticket.status === 'pending') {
          actions.push('in_progress');
        }
        if (ticket.status === 'in_progress') {
          actions.push('resolved');
        }
        break;
    }
    
    return actions.filter(action => action !== ticket.status);
  };

  const handleStatusUpdate = async (ticketId: string, newStatus: TicketStatus) => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(ticketId, newStatus, actionNotes);
      if (onTicketUpdate) {
        onTicketUpdate(ticketId, newStatus, actionNotes);
      }
      setActionNotes('');
      setSelectedTicket(null);
    } catch (error) {
      console.error('Failed to update ticket:', error);
    }
    setIsUpdating(false);
  };

  const canViewTicket = (ticket: Ticket): boolean => {
    switch (user?.role) {
      case 'admin':
      case 'hod':
        return true;
      case 'department_staff':
        return ticket.department === user?.department;
      case 'tutor':
      case 'teaching_staff':
        return ticket.category === 'academic_query';
      case 'hostel_warden':
        return ticket.category === 'hostel_issue';
      case 'maintenance':
        return ticket.category === 'facility_issue' || ticket.category === 'maintenance';
      case 'security_staff':
        return ticket.category === 'security_issue';
      case 'transport_officer':
        return ticket.category === 'transport_issue';
      default:
        return false;
    }
  };

  const filteredTickets = tickets.filter(canViewTicket);

  return (
    <div className="space-y-4">
      {/* Ticket List */}
      <div className="grid gap-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{ticket.ticketNumber}</Badge>
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium mb-1">{ticket.title}</h4>
                  <p className="text-sm text-muted mb-2 line-clamp-2">{ticket.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {ticket.submitterName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ticket.createdAt.toLocaleDateString()}
                    </div>
                    {ticket.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {ticket.location.campusZone}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  
                  {getAvailableActions(ticket).length > 0 && (
                    <Select onValueChange={(value) => handleStatusUpdate(ticket.id, value as TicketStatus)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Action" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableActions(ticket).map((action) => (
                          <SelectItem key={action} value={action}>
                            {action.replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Tickets Found</h3>
            <p className="text-muted">No tickets assigned to your role at the moment.</p>
          </CardContent>
        </Card>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ticket Details</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{selectedTicket.ticketNumber}</Badge>
                  <Badge variant={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{selectedTicket.title}</h4>
                <p className="text-sm text-muted">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Submitted by:</span>
                  <p>{selectedTicket.submitterName}</p>
                </div>
                <div>
                  <span className="font-medium">Department:</span>
                  <p>{selectedTicket.department}</p>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <p>{selectedTicket.category.replace('_', ' ')}</p>
                </div>
                <div>
                  <span className="font-medium">Priority:</span>
                  <p>{selectedTicket.priority}</p>
                </div>
              </div>

              {selectedTicket.location && (
                <div>
                  <span className="font-medium">Location:</span>
                  <p className="text-sm text-muted">
                    {selectedTicket.location.address || 
                     `${selectedTicket.location.latitude}, ${selectedTicket.location.longitude}`}
                  </p>
                </div>
              )}

              {/* Activity Log */}
              <div>
                <h5 className="font-medium mb-2">Activity Log</h5>
                <div className="space-y-2">
                  {selectedTicket.activityLog.map((log) => (
                    <div key={log.id} className="text-sm border-l-2 border-muted pl-3">
                      <p className="font-medium">{log.action}</p>
                      <p className="text-muted">
                        by {log.performedByRole} • {log.timestamp.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              {getAvailableActions(selectedTicket).length > 0 && (
                <div className="border-t pt-4">
                  <h5 className="font-medium mb-2">Take Action</h5>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add notes (optional)..."
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                    />
                    <div className="flex gap-2">
                      {getAvailableActions(selectedTicket).map((action) => (
                        <Button
                          key={action}
                          size="sm"
                          disabled={isUpdating}
                          onClick={() => handleStatusUpdate(selectedTicket.id, action)}
                          variant={action === 'resolved' ? 'default' : 'outline'}
                        >
                          {action.replace('_', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}