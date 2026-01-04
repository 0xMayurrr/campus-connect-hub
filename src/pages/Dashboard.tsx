import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TicketList } from '@/components/tickets/TicketCard';
import { RoleDashboard } from '@/components/dashboard/RoleDashboard';
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

  const getRoleTitle = () => {
    const roleMap: Record<string, string> = {
      'student': 'Student Dashboard',
      'teaching_staff': 'Teaching Staff Dashboard',
      'tutor': 'Tutor Dashboard',
      'department_staff': 'Department Staff Dashboard',
      'hod': 'Head of Department Dashboard',
      'admin': 'Administrator Dashboard',
      'hostel_warden': 'Hostel Warden Dashboard',
      'maintenance': 'Maintenance Dashboard',
      'security_staff': 'Security Dashboard',
      'transport_officer': 'Transport Officer Dashboard',
      'lab_assistant': 'Lab Assistant Dashboard',
      'supporting_staff': 'Supporting Staff Dashboard'
    };
    return roleMap[user?.role || ''] || 'Dashboard';
  };

  const getRoleSubtitle = () => {
    if (user?.role === 'student') {
      return 'Submit requests and track your campus support tickets';
    }
    return `Manage ${user?.role?.replace('_', ' ')} responsibilities and workflows`;
  };

  return (
    <DashboardLayout 
      title={getRoleTitle()}
      subtitle={getRoleSubtitle()}
    >
      <div className="space-y-8">
        {/* Role-specific Dashboard Content */}
        <RoleDashboard />

        {/* Student-specific sections (only for students) */}
        {user?.role === 'student' && (
          <>
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
