import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs sm:text-sm text-primary truncate">{subtitle}</p>
            )}
            {trend && (
              <p className={cn(
                "text-xs sm:text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-destructive"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last week
              </p>
            )}
          </div>
          <div className={cn("p-2 sm:p-3 rounded-lg shrink-0 ml-2", iconBgColor)}>
            <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
