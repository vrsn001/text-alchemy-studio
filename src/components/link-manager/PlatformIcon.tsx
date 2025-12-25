// Platform Icon Component
// Displays the appropriate icon for a URL's platform/category

import { cn } from "@/lib/utils";
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
  Globe
} from "lucide-react";
import { type LinkCategory, getCategoryInfo } from "@/utils/linkCategories";

interface PlatformIconProps {
  category: LinkCategory;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
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
  Globe
};

const SIZE_CLASSES = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

const CONTAINER_SIZES = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
};

export const PlatformIcon = ({ 
  category, 
  size = 'md', 
  showBackground = true,
  className 
}: PlatformIconProps) => {
  const info = getCategoryInfo(category);
  const IconComponent = ICONS[info.icon] || ICONS.Globe;
  
  if (!showBackground) {
    return (
      <IconComponent 
        className={cn(SIZE_CLASSES[size], info.color, className)} 
      />
    );
  }
  
  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-lg",
        CONTAINER_SIZES[size],
        info.bgColor,
        className
      )}
    >
      <IconComponent 
        className={cn(SIZE_CLASSES[size], info.color)} 
      />
    </div>
  );
};
