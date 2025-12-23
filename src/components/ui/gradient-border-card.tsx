import React from 'react';
import { cn } from '@/lib/utils';

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'purple' | 'pink';
}

export function GradientBorderCard({ 
  children, 
  className,
  variant = 'default'
}: GradientBorderCardProps) {
  const variantClasses = {
    default: 'animated-border',
    purple: 'animated-border-purple',
    pink: 'animated-border-pink',
  };

  return (
    <div 
      className={cn(
        'w-full rounded-2xl',
        variantClasses[variant],
        className
      )}
    >
      <div className="relative z-10 h-full rounded-2xl">
        {children}
      </div>
    </div>
  );
}

// Demo component
export function GradientBorderCardDemo() {
  return (
    <GradientBorderCard variant="purple" className="max-w-[422px] mx-auto">
      <div className="relative text-center px-6 py-16">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Create Group Effortlessly
        </h1>
        <p className="text-base pt-2 text-muted-foreground capitalize">
          Seamless chats, crystal-clear videos, and <br />
          premium audio quality
        </p>
      </div>
    </GradientBorderCard>
  );
}

export default GradientBorderCard;
