// Duplicate Badge Component
// Shows duplicate count for URLs

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

interface DuplicateBadgeProps {
  count: number;
  className?: string;
}

export const DuplicateBadge = ({ count, className }: DuplicateBadgeProps) => {
  if (count <= 1) return null;
  
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        "bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30",
        className
      )}
    >
      <Copy className="h-3 w-3" />
      <span>x{count}</span>
    </span>
  );
};
