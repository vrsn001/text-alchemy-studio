// URL List Component
// Virtualized list of URL cards for performance

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { URLCard } from "./URLCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ParsedURL, URLStatus } from "@/utils/urlParser";

interface URLListProps {
  urls: ParsedURL[];
  onFix: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

type FilterOption = URLStatus | 'duplicate' | 'all';

export const URLList = ({ urls, onFix, onRemove, className }: URLListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Set<FilterOption>>(new Set(['all']));
  
  const filteredUrls = useMemo(() => {
    let result = urls;
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.url.toLowerCase().includes(query) ||
        u.host.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    if (!filters.has('all')) {
      result = result.filter(u => {
        if (filters.has('duplicate') && u.isDuplicate) return true;
        if (filters.has(u.status)) return true;
        return false;
      });
    }
    
    return result;
  }, [urls, searchQuery, filters]);
  
  const toggleFilter = (filter: FilterOption) => {
    setFilters(prev => {
      const next = new Set(prev);
      
      if (filter === 'all') {
        return new Set(['all']);
      }
      
      next.delete('all');
      
      if (next.has(filter)) {
        next.delete(filter);
        if (next.size === 0) {
          next.add('all');
        }
      } else {
        next.add(filter);
      }
      
      return next;
    });
  };
  
  const activeFilterCount = filters.has('all') ? 0 : filters.size;
  
  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search URLs..."
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuCheckboxItem
              checked={filters.has('all')}
              onCheckedChange={() => toggleFilter('all')}
            >
              Show All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.has('valid')}
              onCheckedChange={() => toggleFilter('valid')}
            >
              Valid Only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.has('missing-scheme')}
              onCheckedChange={() => toggleFilter('missing-scheme')}
            >
              Missing Scheme
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.has('malformed')}
              onCheckedChange={() => toggleFilter('malformed')}
            >
              Malformed
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.has('shortener')}
              onCheckedChange={() => toggleFilter('shortener')}
            >
              Shorteners
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.has('duplicate')}
              onCheckedChange={() => toggleFilter('duplicate')}
            >
              Duplicates
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredUrls.length} of {urls.length} URLs
      </div>
      
      {/* URL Cards */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredUrls.map((url) => (
            <URLCard
              key={url.id}
              url={url}
              onFix={onFix}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
        
        {filteredUrls.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            {searchQuery || !filters.has('all') 
              ? "No URLs match your search or filters"
              : "No URLs found. Paste some text to get started."
            }
          </motion.div>
        )}
      </div>
    </div>
  );
};
