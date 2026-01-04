import React, { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { MobileBottomNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-14 sm:h-16 border-b border-border bg-card px-3 sm:px-4 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 sm:w-80">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              {title && <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">{title}</h1>}
              {subtitle && <p className="text-xs sm:text-sm text-muted-foreground truncate hidden sm:block">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search your tickets..." 
                className="border-0 bg-transparent h-6 w-48 focus-visible:ring-0 px-0"
              />
            </div>

            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User Avatar */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={cn(
          "flex-1 overflow-y-auto p-3 sm:p-4 lg:p-8",
          isMobile && "pb-20" // Add bottom padding for mobile nav
        )}>
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
