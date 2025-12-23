"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  variant?: "default" | "notification";
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className, children, blur = "xl", opacity = 0.15, variant = "default", ...props }, ref) => {
    const blurValues = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden border border-white/20 transition-all duration-300",
          blurValues[blur],
          variant === "notification" 
            ? "rounded-[28px] hover:scale-[1.02]" 
            : "rounded-3xl",
          className
        )}
        style={{
          background: `rgba(255, 255, 255, ${opacity})`,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
        }}
        {...props}
      >
        {/* Liquid highlight effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `
              radial-gradient(
                ellipse 80% 50% at 50% -20%,
                rgba(255, 255, 255, 0.3),
                transparent
              )
            `,
          }}
        />
        {children}
      </div>
    );
  }
);

LiquidGlassCard.displayName = "LiquidGlassCard";

interface LiquidGlassItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

const LiquidGlassItem = React.forwardRef<HTMLDivElement, LiquidGlassItemProps>(
  ({ className, children, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex aspect-square cursor-pointer items-center justify-center rounded-2xl transition-all duration-200",
          active
            ? "bg-white/90 text-gray-900 shadow-lg"
            : "bg-white/10 text-white hover:bg-white/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGlassItem.displayName = "LiquidGlassItem";

interface LiquidGlassWideItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

const LiquidGlassWideItem = React.forwardRef<HTMLDivElement, LiquidGlassWideItemProps>(
  ({ className, children, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition-all duration-200",
          active
            ? "bg-white/90 text-gray-900 shadow-lg"
            : "bg-white/10 text-white hover:bg-white/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGlassWideItem.displayName = "LiquidGlassWideItem";

interface LiquidGlassNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showDivider?: boolean;
}

const LiquidGlassNotification = React.forwardRef<HTMLDivElement, LiquidGlassNotificationProps>(
  ({ className, children, showDivider = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full items-start gap-3 p-3.5",
          showDivider && "border-t border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGlassNotification.displayName = "LiquidGlassNotification";

interface LiquidGlassAppIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const LiquidGlassAppIcon = React.forwardRef<HTMLDivElement, LiquidGlassAppIconProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 rounded-lg",
      md: "h-10 w-10 rounded-xl",
      lg: "h-12 w-12 rounded-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGlassAppIcon.displayName = "LiquidGlassAppIcon";

export { 
  LiquidGlassCard, 
  LiquidGlassItem, 
  LiquidGlassWideItem, 
  LiquidGlassNotification,
  LiquidGlassAppIcon 
};
