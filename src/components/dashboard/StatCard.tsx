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
    <Card className={cn("hover:shadow-lg transition-all duration-200 border-0 shadow-sm", className)}>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-sm lg:text-base font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-sm lg:text-base text-primary truncate font-medium">{subtitle}</p>
            )}
            {trend && (
              <p className={cn(
                "text-sm lg:text-base font-medium",
                trend.isPositive ? "text-green-600" : "text-destructive"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last week
              </p>
            )}
          </div>
          <div className={cn("p-3 lg:p-4 rounded-xl shrink-0 ml-3", iconBgColor)}>
            <Icon className={cn("w-6 h-6 lg:w-8 lg:h-8", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
