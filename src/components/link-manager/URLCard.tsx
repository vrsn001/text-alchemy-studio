// URL Card Component
// Mobile-first card for displaying individual URLs with actions

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { URLStatusPill } from "./URLStatusPill";
import { DuplicateBadge } from "./DuplicateBadge";
import { 
  Copy, 
  ExternalLink, 
  Wrench, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Check 
} from "lucide-react";
import { toast } from "sonner";
import { triggerHaptic } from "@/utils/haptics";
import type { ParsedURL } from "@/utils/urlParser";

interface URLCardProps {
  url: ParsedURL;
  onFix?: (id: string) => void;
  onRemove?: (id: string) => void;
  showLineNumber?: boolean;
}

export const URLCard = ({ url, onFix, onRemove, showLineNumber = true }: URLCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const truncatedUrl = url.url.length > 45 ? `${url.url.substring(0, 45)}...` : url.url;
  const needsTruncation = url.url.length > 45;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url.url);
    setCopied(true);
    triggerHaptic('success');
    toast.success("URL copied!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleOpen = () => {
    const urlToOpen = url.status === 'missing-scheme' ? `https://${url.original}` : url.url;
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
    triggerHaptic('light');
  };
  
  const handleFix = () => {
    onFix?.(url.id);
    triggerHaptic('success');
    toast.success("URL scheme added!");
  };
  
  const handleRemove = () => {
    onRemove?.(url.id);
    triggerHaptic('medium');
    toast.success("URL removed");
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "group relative p-3 rounded-lg border bg-card transition-all duration-200",
        "hover:shadow-md hover:border-primary/30",
        url.isDuplicate && "border-purple-500/30 bg-purple-500/5"
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          {/* Host prominently displayed */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-foreground truncate">{url.host}</span>
            <URLStatusPill status={url.status} showLabel={false} />
            {url.duplicateCount > 1 && <DuplicateBadge count={url.duplicateCount} />}
          </div>
          
          {/* URL preview */}
          <div className="text-sm text-muted-foreground break-all">
            {isExpanded ? url.url : truncatedUrl}
          </div>
        </div>
        
        {/* Expand button for long URLs */}
        {needsTruncation && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      
      {/* Meta info */}
      {showLineNumber && (
        <div className="text-xs text-muted-foreground mb-2">
          Line {url.lineNumber}
          {url.isDuplicate && url.duplicateOf && (
            <span className="ml-2 text-purple-600 dark:text-purple-400">
              • Duplicate
            </span>
          )}
        </div>
      )}
      
      {/* Action buttons - always visible on mobile */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 min-w-[44px] transition-all duration-200"
          onClick={handleCopy}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check className="h-4 w-4 text-green-600" />
                <span className="hidden sm:inline">Copied</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 min-w-[44px]"
          onClick={handleOpen}
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline ml-1.5">Open</span>
        </Button>
        
        {url.status === 'missing-scheme' && onFix && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 min-w-[44px] text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950"
            onClick={handleFix}
          >
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline ml-1.5">Fix</span>
          </Button>
        )}
        
        {onRemove && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 min-w-[44px] text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline ml-1.5">Remove</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
