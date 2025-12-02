// URL Statistics Component
// Shows summary of parsed URLs with status breakdown

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, AlertTriangle, XCircle, Link2, Copy, Link } from "lucide-react";
import type { ParseResult } from "@/utils/urlParser";

interface URLStatsProps {
  result: ParseResult;
  className?: string;
}

const stats = [
  { key: 'totalCount', label: 'Total', icon: Link, color: 'text-foreground' },
  { key: 'validCount', label: 'Valid', icon: Check, color: 'text-green-600 dark:text-green-400' },
  { key: 'missingSchemeCount', label: 'Missing Scheme', icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400' },
  { key: 'malformedCount', label: 'Malformed', icon: XCircle, color: 'text-red-600 dark:text-red-400' },
  { key: 'shortenerCount', label: 'Shorteners', icon: Link2, color: 'text-purple-600 dark:text-purple-400' },
  { key: 'duplicateCount', label: 'Duplicates', icon: Copy, color: 'text-purple-600 dark:text-purple-400' },
] as const;

export const URLStats = ({ result, className }: URLStatsProps) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3", className)}>
      {stats.map(({ key, label, icon: Icon, color }, index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50 border border-border/50"
        >
          <Icon className={cn("h-5 w-5 mb-1", color)} />
          <span className="text-2xl font-bold text-foreground">
            {result[key]}
          </span>
          <span className="text-xs text-muted-foreground text-center">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
