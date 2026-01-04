import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  Send,
  Bell,
  MapPin,
  Settings,
  LogOut,
  GraduationCap,
  Video,
  Bot,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const studentNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ticket, label: 'My Tickets', path: '/tickets' },
  { icon: Send, label: 'Submit Request', path: '/submit' },
  { icon: Bell, label: 'Notices', path: '/notices' },
  { icon: MapPin, label: 'Navigate Campus', path: '/navigate' },
  { icon: GraduationCap, label: 'AI Teacher', path: '/ai-teacher' },
  { icon: Video, label: 'Lectures', path: '/lectures' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const staffNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ticket, label: 'Tickets', path: '/tickets' },
  { icon: Bell, label: 'Notices', path: '/notices' },
  { icon: Video, label: 'Manage Lectures', path: '/manage-lectures' },
  { icon: GraduationCap, label: 'Syllabus', path: '/syllabus' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ticket, label: 'All Tickets', path: '/tickets' },
  { icon: Bell, label: 'Manage Notices', path: '/notices' },
  { icon: MapPin, label: 'Locations', path: '/locations' },
  { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function DashboardSidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = user?.role === 'admin' 
    ? adminNavItems 
    : user?.role === 'student' 
      ? studentNavItems 
      : staffNavItems;

  const roleLabel = user?.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'User';

  return (
    <aside className={cn(
      "flex flex-col h-screen w-full bg-sidebar border-r border-sidebar-border",
      className
    )}>
      {/* Logo & Role */}
      <div className="p-4 sm:p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src="/Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png" alt="Campus Aid Buddy" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-sidebar-foreground text-sm sm:text-base truncate">Campus Aid Buddy</h2>
            <p className="text-xs text-muted-foreground truncate">{roleLabel} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10 sm:h-11 text-sm",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-3 sm:p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 h-10 text-sm"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
