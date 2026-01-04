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
      <div className="p-6 lg:p-8 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src="/Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png" alt="Campus Aid Buddy" className="w-12 h-12 lg:w-14 lg:h-14 shrink-0" />
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-sidebar-foreground text-base lg:text-lg truncate">Campus Aid Buddy</h2>
            <p className="text-xs lg:text-sm text-muted-foreground truncate">{roleLabel} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 lg:p-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 lg:h-14 text-sm lg:text-base font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 lg:p-6 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-accent/50">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm lg:text-base font-medium shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm lg:text-base font-medium truncate text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs lg:text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 h-12 lg:h-14 text-sm lg:text-base font-medium"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
