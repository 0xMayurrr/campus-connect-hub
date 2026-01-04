import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets } from '@/contexts/TicketContext';
import { RoleDashboardService, DashboardModule } from '@/services/roleDashboardService';
import { 
  Send, Ticket, GraduationCap, Bot, Video, MapPin, MessageSquare, Upload, 
  BookOpen, Bell, Users, Filter, ArrowUp, FileText, Inbox, UserCheck, 
  Building, Activity, Eye, CheckCircle, BarChart, Download, Monitor, 
  Megaphone, QrCode, TrendingUp, Home, Wrench, AlertTriangle, Shield, 
  Clock, Route, Search, Package, Headphones, CheckSquare, History
} from 'lucide-react';

const iconMap = {
  Send, Ticket, GraduationCap, Bot, Video, MapPin, MessageSquare, Upload,
  BookOpen, Bell, Users, Filter, ArrowUp, FileText, Inbox, UserCheck,
  Building, Activity, Eye, CheckCircle, BarChart, Download, Monitor,
  Megaphone, QrCode, TrendingUp, Home, Wrench, AlertTriangle, Shield,
  Clock, Route, Search, Package, Headphones, CheckSquare, History
};

interface RoleDashboardProps {
  className?: string;
}

export function RoleDashboard({ className }: RoleDashboardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, getUserTickets } = useTickets();
  
  if (!user) return null;

  const userTickets = user.role === 'student' ? getUserTickets() : tickets;
  const modules = RoleDashboardService.getDashboardModules(user.role, userTickets);
  const insights = RoleDashboardService.getDashboardInsights(user.role, userTickets);

  const handleModuleClick = (module: DashboardModule) => {
    if (module.path) {
      navigate(module.path);
    } else if (module.action) {
      module.action();
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent || Send;
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getInsightColor = (color?: string) => {
    switch (color) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'destructive': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Role-specific Insights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-3 sm:p-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${getInsightColor(insight.color)} flex items-center justify-center mb-2 sm:mb-3`}>
                <span className="text-base sm:text-lg font-bold">{insight.value}</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">{insight.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role-specific Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {modules.map((module) => {
          const IconComponent = getIconComponent(module.icon);
          
          return (
            <Card 
              key={module.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
              onClick={() => handleModuleClick(module)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    {module.count !== undefined && (
                      <Badge variant="secondary" className="text-xs">{module.count}</Badge>
                    )}
                    {module.priority && (
                      <Badge variant={getPriorityColor(module.priority)} className="text-xs">
                        {module.priority}
                      </Badge>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold mb-1 text-sm sm:text-base leading-tight">{module.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{module.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Role-specific Quick Actions */}
      {user.role === 'student' && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={() => navigate('/submit')} size="sm" className="w-full sm:w-auto">
                Submit New Request
              </Button>
              <Button onClick={() => navigate('/ai-teacher')} variant="outline" size="sm" className="w-full sm:w-auto">
                Ask AI Teacher
              </Button>
              <Button onClick={() => navigate('/navigate')} variant="outline" size="sm" className="w-full sm:w-auto">
                Scan QR Code
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {(user.role === 'teaching_staff' || user.role === 'tutor') && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={() => navigate('/tickets')} size="sm" className="w-full sm:w-auto">
                Review Student Queries
              </Button>
              {user.role === 'teaching_staff' && (
                <>
                  <Button onClick={() => navigate('/syllabus')} variant="outline" size="sm" className="w-full sm:w-auto">
                    Upload Syllabus
                  </Button>
                  <Button onClick={() => navigate('/manage-lectures')} variant="outline" size="sm" className="w-full sm:w-auto">
                    Upload Lecture
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {(user.role === 'admin' || user.role === 'hod') && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Management Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={() => navigate('/tickets')} size="sm" className="w-full sm:w-auto">
                Review All Tickets
              </Button>
              <Button onClick={() => navigate('/notices')} variant="outline" size="sm" className="w-full sm:w-auto">
                Publish Notice
              </Button>
              {user.role === 'admin' && (
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Manage Users
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}