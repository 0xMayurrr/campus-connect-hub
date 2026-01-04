import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TicketList } from '@/components/tickets/TicketCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets } from '@/contexts/TicketContext';
import { Ticket, HelpCircle, CheckCircle, Bell, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, getUserTickets } = useTickets();

  const userTickets = getUserTickets();
  const pendingCount = userTickets.filter((t) => t.status === 'pending').length;
  const inProgressCount = userTickets.filter((t) => t.status === 'in_progress').length;
  const resolvedCount = userTickets.filter((t) => t.status === 'resolved').length;

  const recentTickets = userTickets.slice(0, 5);

  return (
    <DashboardLayout 
      title={`${user?.role === 'student' ? 'Student' : user?.role === 'admin' ? 'Admin' : 'Staff'} Dashboard`}
      subtitle="Submit requests and track your campus support tickets"
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="My Tickets"
            value={userTickets.length}
            subtitle="Total submitted"
            icon={Ticket}
            iconColor="text-primary"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending"
            value={pendingCount + inProgressCount}
            subtitle="In progress"
            icon={HelpCircle}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />
          <StatCard
            title="Resolved"
            value={resolvedCount}
            subtitle="Completed"
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="New Notices"
            value={12}
            subtitle="Unread"
            icon={Bell}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Recent Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Recent Tickets</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/tickets')}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <Card className="border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">My Tickets</CardTitle>
                <p className="text-sm text-muted">
                  {recentTickets.length > 0 ? `${recentTickets.length} tickets` : 'No Tickets'}
                </p>
              </CardHeader>
              <CardContent>
                <TicketList
                  tickets={recentTickets}
                  onTicketClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
                  emptyMessage="Submit your first help request to get started."
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
            onClick={() => navigate('/submit')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Submit Request</h3>
              <p className="text-sm text-muted">Create a new support ticket</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
            onClick={() => navigate('/navigate')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Navigate Campus</h3>
              <p className="text-sm text-muted">Find locations & get directions</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
            onClick={() => navigate('/ai-teacher')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">AI Teacher</h3>
              <p className="text-sm text-muted">Ask academic questions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
