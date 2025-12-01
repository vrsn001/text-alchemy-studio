import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ToolLinkProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export const ToolLink = ({ icon: Icon, title, description, href, onClick }: ToolLinkProps) => {
  const baseClasses = cn(
    "flex items-start gap-4 p-5 rounded-2xl text-left w-full group",
    "bg-surface-1 elevation-1 hover:elevation-3 active:elevation-1",
    "transition-all duration-200 ease-out",
    "border border-border/50",
    "active:scale-[0.98]",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  );

  const content = (
    <>
      {/* Icon container with hover animation */}
      <motion.div 
        className="p-3 bg-primary/10 rounded-xl flex-shrink-0 transition-colors duration-200 group-hover:bg-primary/15"
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </motion.div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
      
      {/* Arrow indicator on hover */}
      <motion.div 
        className="self-center opacity-0 group-hover:opacity-100 text-primary transition-opacity duration-200"
        initial={{ x: -4 }}
        whileHover={{ x: 0 }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </motion.div>
    </>
  );

  if (href) {
    return (
      <Link 
        to={href} 
        className={baseClasses}
        aria-label={`Open ${title} tool`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={baseClasses}
      aria-label={`Open ${title} tool`}
    >
      {content}
    </button>
  );
};
