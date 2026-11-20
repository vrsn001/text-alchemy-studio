import React from "react";
import { cn } from "@/lib/utils";

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "purple" | "pink";
}

export function GradientBorderCard({ children, className }: GradientBorderCardProps) {
  return (
    <div className={cn("w-full rounded-lg border border-border bg-card text-card-foreground", className)}>
      {children}
    </div>
  );
}

export function GradientBorderCardDemo() {
  return (
    <GradientBorderCard className="mx-auto max-w-[422px] px-6 py-16 text-center">
      <h1 className="text-xl font-semibold text-foreground">Create Group Effortlessly</h1>
      <p className="pt-2 text-base text-muted-foreground">
        Seamless chats, clear video, and reliable audio quality
      </p>
    </GradientBorderCard>
  );
}

export default GradientBorderCard;