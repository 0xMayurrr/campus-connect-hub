import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TicketCard, TicketList } from '@/components/tickets/TicketCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTickets } from '@/contexts/TicketContext';
import { TicketStatus } from '@/types';
import { Search, Plus, Filter } from 'lucide-react';

export default function Tickets() {
  const navigate = useNavigate();
  const { getUserTickets } = useTickets();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');

  const userTickets = getUserTickets();

  const filteredTickets = userTickets.filter((ticket) => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingTickets = filteredTickets.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const resolvedTickets = filteredTickets.filter(t => t.status === 'resolved');
  const escalatedTickets = filteredTickets.filter(t => t.status === 'escalated' || t.status === 'rejected');

  return (
    <DashboardLayout
      title="My Tickets"
      subtitle="View and track all your support tickets"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                placeholder="Search tickets..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={() => navigate('/submit')}>
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All ({filteredTickets.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingTickets.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({resolvedTickets.length})
            </TabsTrigger>
            <TabsTrigger value="other">
              Escalated ({escalatedTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketList
                  tickets={filteredTickets}
                  onTicketClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
                  emptyMessage="No tickets found. Submit a new request to get started."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending & In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketList
                  tickets={pendingTickets}
                  onTicketClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
                  emptyMessage="No pending tickets."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketList
                  tickets={resolvedTickets}
                  onTicketClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
                  emptyMessage="No resolved tickets yet."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Escalated & Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketList
                  tickets={escalatedTickets}
                  onTicketClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
                  emptyMessage="No escalated or rejected tickets."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
