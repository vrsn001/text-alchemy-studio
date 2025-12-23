"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className, children, blur = "xl", opacity = 0.15, ...props }, ref) => {
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
          "relative overflow-hidden rounded-3xl border border-white/20",
          blurValues[blur],
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
          className="pointer-events-none absolute inset-0 rounded-3xl"
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

export { LiquidGlassCard, LiquidGlassItem, LiquidGlassWideItem };
