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
      <div className="hidden lg:block w-64 xl:w-72">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 lg:h-18 border-b border-border bg-card px-4 lg:px-6 xl:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
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
              {title && <h1 className="text-xl lg:text-2xl font-semibold text-foreground truncate">{title}</h1>}
              {subtitle && <p className="text-sm lg:text-base text-muted-foreground truncate hidden sm:block mt-1">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center gap-2 bg-background rounded-lg px-4 py-2 border border-border min-w-0">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <Input 
                placeholder="Search tickets, users, or content..." 
                className="border-0 bg-transparent h-6 w-64 xl:w-80 focus-visible:ring-0 px-0 text-sm"
              />
            </div>

            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User Avatar */}
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm lg:text-base">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={cn(
          "flex-1 overflow-y-auto",
          "p-4 lg:p-6 xl:p-8",
          isMobile && "pb-20" // Add bottom padding for mobile nav
        )}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
