import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  LayoutDashboard,
  Ticket,
  Send,
  Bell,
  MapPin,
  Settings,
  GraduationCap,
  Video,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const studentNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Send, label: 'Submit', path: '/submit' },
  { icon: Ticket, label: 'Tickets', path: '/tickets' },
  { icon: GraduationCap, label: 'AI Teacher', path: '/ai-teacher' },
  { icon: Video, label: 'Lectures', path: '/lectures' },
];

const staffNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ticket, label: 'Tickets', path: '/tickets' },
  { icon: Video, label: 'Lectures', path: '/manage-lectures' },
  { icon: GraduationCap, label: 'Syllabus', path: '/syllabus' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ticket, label: 'Tickets', path: '/tickets' },
  { icon: Bell, label: 'Notices', path: '/notices' },
  { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = user?.role === 'admin' 
    ? adminNavItems 
    : user?.role === 'student' 
      ? studentNavItems 
      : staffNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1",
                isActive && "text-primary bg-primary/10"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-xs truncate">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export function MobileTopBar() {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="lg:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="/Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png" 
          alt="Campus Aid Buddy" 
          className="w-8 h-8" 
        />
        <span className="font-semibold text-foreground">Campus Aid</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
        {user?.name?.charAt(0) || 'U'}
      </div>
    </div>
  );
}