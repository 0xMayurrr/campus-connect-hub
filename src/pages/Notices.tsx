import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, AlertTriangle, Info, Megaphone } from 'lucide-react';

const notices = [
  {
    id: '1',
    title: 'Mid-Semester Examination Schedule Released',
    content: 'The mid-semester examination schedule for all departments has been released. Please check the examination portal for your specific dates and timings.',
    category: 'Academic',
    priority: 'important',
    department: 'Examination Cell',
    publishedAt: new Date(Date.now() - 86400000),
    isRead: false,
  },
  {
    id: '2',
    title: 'Campus Wifi Maintenance Notice',
    content: 'Scheduled maintenance for campus wifi infrastructure on Saturday from 2 AM to 6 AM. Internet services may be disrupted during this period.',
    category: 'IT Services',
    priority: 'normal',
    department: 'IT Department',
    publishedAt: new Date(Date.now() - 172800000),
    isRead: true,
  },
  {
    id: '3',
    title: 'Library Extended Hours During Exams',
    content: 'The central library will remain open until 11 PM during the examination period. Students are encouraged to utilize this facility for exam preparation.',
    category: 'Library',
    priority: 'normal',
    department: 'Library',
    publishedAt: new Date(Date.now() - 259200000),
    isRead: true,
  },
  {
    id: '4',
    title: 'Important: Fee Payment Deadline',
    content: 'This is a reminder that the last date for fee payment is approaching. Please ensure your fees are paid by the deadline to avoid late payment charges.',
    category: 'Finance',
    priority: 'urgent',
    department: 'Accounts',
    publishedAt: new Date(Date.now() - 43200000),
    isRead: false,
  },
  {
    id: '5',
    title: 'Sports Day Registration Open',
    content: 'Registration for the Annual Sports Day events is now open. Interested students can register at the sports complex or through the student portal.',
    category: 'Sports',
    priority: 'normal',
    department: 'Physical Education',
    publishedAt: new Date(Date.now() - 345600000),
    isRead: true,
  },
];

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return <AlertTriangle className="w-4 h-4 text-destructive" />;
    case 'important':
      return <Megaphone className="w-4 h-4 text-yellow-600" />;
    default:
      return <Info className="w-4 h-4 text-primary" />;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return <Badge variant="destructive">Urgent</Badge>;
    case 'important':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Important</Badge>;
    default:
      return <Badge variant="secondary">Normal</Badge>;
  }
};

export default function Notices() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const unreadCount = notices.filter(n => !n.isRead).length;

  return (
    <DashboardLayout
      title="Campus Notices"
      subtitle={`Stay updated with campus announcements (${unreadCount} unread)`}
    >
      <div className="space-y-4">
        {notices.map((notice) => (
          <Card 
            key={notice.id} 
            className={`transition-all ${!notice.isRead ? 'border-l-4 border-l-primary shadow-md' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent">
                    {getPriorityIcon(notice.priority)}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {notice.title}
                      {!notice.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(notice.publishedAt)} • {notice.department}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(notice.priority)}
                  <Badge variant="outline">{notice.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted">{notice.content}</p>
            </CardContent>
          </Card>
        ))}

        {notices.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="w-12 h-12 text-muted mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Notices</h3>
              <p className="text-muted">There are no notices to display at this time.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
