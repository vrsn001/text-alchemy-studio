// URL Status Pill Component
// Visual indicator for URL validation status

import { cn } from "@/lib/utils";
import { Check, AlertTriangle, XCircle, Link2 } from "lucide-react";
import type { URLStatus } from "@/utils/urlParser";

interface URLStatusPillProps {
  status: URLStatus;
  className?: string;
  showLabel?: boolean;
}

const statusConfig: Record<URLStatus, { 
  icon: typeof Check; 
  label: string; 
  className: string;
}> = {
  'valid': {
    icon: Check,
    label: 'Valid',
    className: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30'
  },
  'missing-scheme': {
    icon: AlertTriangle,
    label: 'Missing scheme',
    className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
  },
  'malformed': {
    icon: XCircle,
    label: 'Malformed',
    className: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30'
  },
  'shortener': {
    icon: Link2,
    label: 'Shortener',
    className: 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30'
  }
};

export const URLStatusPill = ({ status, className, showLabel = true }: URLStatusPillProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-colors",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
