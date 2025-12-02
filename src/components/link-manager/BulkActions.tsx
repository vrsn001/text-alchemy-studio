// Bulk Actions Component
// Sticky action bar for bulk URL operations

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Copy, 
  Trash2, 
  Wrench, 
  Download, 
  SortAsc,
  Check,
  ChevronDown,
  FileText,
  FileCode,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "sonner";
import { triggerHaptic } from "@/utils/haptics";
import { 
  urlsToText, 
  exportAsCSV, 
  exportAsMarkdown, 
  exportAsHTML,
  type ParsedURL 
} from "@/utils/urlParser";
import { downloadAsText } from "@/utils/download";

interface BulkActionsProps {
  urls: ParsedURL[];
  onRemoveDuplicates: () => void;
  onFixAllSchemes: () => void;
  onSort?: (type: 'alphabetical' | 'domain') => void;
  isProcessing?: boolean;
  className?: string;
}

export const BulkActions = ({ 
  urls, 
  onRemoveDuplicates, 
  onFixAllSchemes,
  onSort,
  isProcessing,
  className 
}: BulkActionsProps) => {
  const [copiedAll, setCopiedAll] = useState(false);
  
  const missingSchemeCount = urls.filter(u => u.status === 'missing-scheme').length;
  const duplicateCount = urls.filter(u => u.isDuplicate).length;
  
  const handleCopyAll = async () => {
    const text = urlsToText(urls);
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    triggerHaptic('success');
    toast.success(`${urls.length} URLs copied!`);
    setTimeout(() => setCopiedAll(false), 2000);
  };
  
  const handleExport = (format: 'txt' | 'csv' | 'md' | 'html') => {
    let content: string;
    let filename: string;
    
    switch (format) {
      case 'csv':
        content = exportAsCSV(urls);
        filename = 'urls-export.csv';
        break;
      case 'md':
        content = exportAsMarkdown(urls);
        filename = 'urls-export.md';
        break;
      case 'html':
        content = exportAsHTML(urls);
        filename = 'urls-export.html';
        break;
      default:
        content = urlsToText(urls);
        filename = 'urls-export.txt';
    }
    
    downloadAsText(content, filename);
    triggerHaptic('success');
    toast.success(`Exported as ${format.toUpperCase()}`);
  };
  
  if (urls.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "sticky bottom-20 md:bottom-4 z-40",
        "flex flex-wrap items-center justify-center gap-2 p-3",
        "bg-card/95 backdrop-blur-md border rounded-xl shadow-lg",
        "mx-auto max-w-fit",
        className
      )}
    >
      {/* Copy All */}
      <Button
        variant="default"
        size="sm"
        className="h-10 px-4"
        onClick={handleCopyAll}
        disabled={isProcessing}
      >
        <AnimatePresence mode="wait">
          {copiedAll ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy All
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      
      {/* Fix All Missing Schemes */}
      {missingSchemeCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-4 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950"
          onClick={onFixAllSchemes}
          disabled={isProcessing}
        >
          <Wrench className="h-4 w-4 mr-2" />
          Fix All ({missingSchemeCount})
        </Button>
      )}
      
      {/* Remove Duplicates */}
      {duplicateCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950"
          onClick={onRemoveDuplicates}
          disabled={isProcessing}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove Dups ({duplicateCount})
        </Button>
      )}
      
      {/* Sort Menu */}
      {onSort && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 px-4">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSort('alphabetical')}>
              Alphabetical (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort('domain')}>
              By Domain
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {/* Export Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 px-4">
            <Download className="h-4 w-4 mr-2" />
            Export
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport('txt')}>
            <FileText className="h-4 w-4 mr-2" />
            Plain Text (.txt)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('csv')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            CSV (.csv)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport('md')}>
            <FileText className="h-4 w-4 mr-2" />
            Markdown (.md)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('html')}>
            <FileCode className="h-4 w-4 mr-2" />
            HTML (.html)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};
