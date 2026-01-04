import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, TicketStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, MapPin, ChevronRight, Ticket as TicketIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
  compact?: boolean;
}

const statusColors: Record<TicketStatus, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800' },
  resolved: { bg: 'bg-green-100', text: 'text-green-800' },
  escalated: { bg: 'bg-red-100', text: 'text-red-800' },
  rejected: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

const statusLabels: Record<TicketStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  escalated: 'Escalated',
  rejected: 'Rejected',
};

export function TicketCard({ ticket, onClick, compact = false }: TicketCardProps) {
  const statusStyle = statusColors[ticket.status];

  if (compact) {
    return (
      <div 
        className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:shadow-sm transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <TicketIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{ticket.title}</p>
            <p className="text-sm text-muted">{ticket.ticketNumber} • {ticket.department}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={cn(statusStyle.bg, statusStyle.text, "border-0")}>
            {statusLabels[ticket.status]}
          </Badge>
          <ChevronRight className="w-4 h-4 text-muted" />
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{ticket.title}</CardTitle>
            <p className="text-sm text-muted">#{ticket.ticketNumber}</p>
          </div>
          <Badge className={cn(statusStyle.bg, statusStyle.text, "border-0")}>
            {statusLabels[ticket.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted mb-4 line-clamp-2">{ticket.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
            </span>
            {ticket.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {ticket.location.campusZone || 'Campus'}
              </span>
            )}
          </div>
          <Badge variant="outline">{ticket.category.replace('_', ' ')}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick?: (ticket: Ticket) => void;
  emptyMessage?: string;
}

export function TicketList({ tickets, onTicketClick, emptyMessage = "No tickets found" }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-full bg-muted/50 mb-4">
          <TicketIcon className="w-8 h-8 text-muted" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">No Tickets</h3>
        <p className="text-sm text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <TicketCard 
          key={ticket.id} 
          ticket={ticket} 
          compact 
          onClick={() => onTicketClick?.(ticket)}
        />
      ))}
    </div>
  );
}
