// Category Tabs Component
// Tabbed interface for filtering URLs by platform

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Youtube, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Github,
  Music2,
  MessageCircle,
  Pin,
  BookOpen,
  Newspaper,
  Globe,
  LayoutGrid
} from "lucide-react";
import type { ParsedURL } from "@/utils/urlParser";
import { type LinkCategory, detectCategory, CATEGORIES } from "@/utils/linkCategories";

interface CategoryTabsProps {
  urls: ParsedURL[];
  activeCategory: LinkCategory | 'all';
  onCategoryChange: (category: LinkCategory | 'all') => void;
  className?: string;
}

// Icon mapping
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Youtube,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Music2,
  MessageCircle,
  Pin,
  BookOpen,
  Newspaper,
  Globe,
  LayoutGrid
};

export const CategoryTabs = ({ urls, activeCategory, onCategoryChange, className }: CategoryTabsProps) => {
  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<LinkCategory | 'all', number> = {
      all: urls.length,
      youtube: 0,
      linkedin: 0,
      twitter: 0,
      instagram: 0,
      facebook: 0,
      github: 0,
      tiktok: 0,
      reddit: 0,
      pinterest: 0,
      medium: 0,
      news: 0,
      other: 0
    };
    
    urls.forEach(url => {
      const category = detectCategory(url.host);
      counts[category]++;
    });
    
    return counts;
  }, [urls]);
  
  // Only show categories that have URLs
  const visibleCategories = useMemo(() => {
    const categories: (LinkCategory | 'all')[] = ['all'];
    
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      if (cat !== 'all' && count > 0) {
        categories.push(cat as LinkCategory);
      }
    });
    
    return categories;
  }, [categoryCounts]);
  
  const getIcon = (category: LinkCategory | 'all') => {
    if (category === 'all') {
      const Icon = ICONS.LayoutGrid;
      return <Icon className="h-4 w-4" />;
    }
    const iconName = CATEGORIES[category].icon;
    const Icon = ICONS[iconName] || ICONS.Globe;
    return <Icon className="h-4 w-4" />;
  };
  
  const getTabStyle = (category: LinkCategory | 'all', isActive: boolean) => {
    if (category === 'all') {
      return isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground';
    }
    
    const info = CATEGORIES[category];
    return isActive 
      ? `${info.bgColor} ${info.color} ring-1 ring-current/30` 
      : `bg-muted/50 hover:${info.bgColor} text-muted-foreground hover:${info.color}`;
  };
  
  return (
    <div className={cn("w-full", className)}>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {visibleCategories.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category];
            const label = category === 'all' ? 'All' : CATEGORIES[category].label;
            
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  getTabStyle(category, isActive)
                )}
              >
                {getIcon(category)}
                <span>{label}</span>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "ml-1 h-5 min-w-[20px] px-1.5 text-xs",
                    isActive && "bg-background/20 text-current"
                  )}
                >
                  {count}
                </Badge>
                
                {isActive && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute inset-0 rounded-lg ring-2 ring-primary/50"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
};
