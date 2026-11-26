import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "notification";
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className, children, blur: _blur, variant: _variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative border-2 border-foreground bg-card text-card-foreground", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
LiquidGlassCard.displayName = "LiquidGlassCard";

interface LiquidGlassItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

const LiquidGlassItem = React.forwardRef<HTMLDivElement, LiquidGlassItemProps>(
  ({ className, children, active = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center border-2 border-foreground transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
LiquidGlassItem.displayName = "LiquidGlassItem";

interface LiquidGlassWideItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

const LiquidGlassWideItem = React.forwardRef<HTMLDivElement, LiquidGlassWideItemProps>(
  ({ className, children, active = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer items-center gap-3 border-2 border-foreground p-4 transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
LiquidGlassWideItem.displayName = "LiquidGlassWideItem";

interface LiquidGlassNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showDivider?: boolean;
}

const LiquidGlassNotification = React.forwardRef<HTMLDivElement, LiquidGlassNotificationProps>(
  ({ className, children, showDivider = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex w-full items-start gap-3 p-3.5", showDivider && "border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
LiquidGlassNotification.displayName = "LiquidGlassNotification";

interface LiquidGlassAppIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const LiquidGlassAppIcon = React.forwardRef<HTMLDivElement, LiquidGlassAppIconProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 rounded-md",
      md: "h-10 w-10 rounded-lg",
      lg: "h-12 w-12 rounded-lg",
    };

    return (
      <div
        ref={ref}
        className={cn("flex shrink-0 items-center justify-center bg-accent text-accent-foreground", sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LiquidGlassAppIcon.displayName = "LiquidGlassAppIcon";

export {
  LiquidGlassCard,
  LiquidGlassItem,
  LiquidGlassWideItem,
  LiquidGlassNotification,
  LiquidGlassAppIcon,
};