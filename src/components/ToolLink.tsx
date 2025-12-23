import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MaterialIcon } from "./MaterialIcon";

export interface ToolLinkProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export const ToolLink = ({ icon, title, description, href, onClick }: ToolLinkProps) => {
  const baseClasses = cn(
    "flex items-start gap-4 p-5 rounded-xl text-left w-full group",
    "bg-card border border-border shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  );

  // M3 motion tokens for smooth animations
  const cardVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 1px 2px 0 hsl(var(--foreground) / 0.05)"
    },
    hover: { 
      scale: 1.02, 
      y: -4,
      boxShadow: "0 10px 25px -5px hsl(var(--foreground) / 0.1), 0 8px 10px -6px hsl(var(--foreground) / 0.1)"
    },
    tap: { 
      scale: 0.98, 
      y: 0,
      boxShadow: "0 1px 2px 0 hsl(var(--foreground) / 0.05)"
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 3 },
    tap: { scale: 0.95, rotate: 0 }
  };

  const arrowVariants = {
    initial: { x: -8, opacity: 0 },
    hover: { x: 0, opacity: 1 },
    tap: { x: 2, opacity: 1 }
  };

  const content = (
    <>
      {/* Icon container with hover animation */}
      <motion.div 
        className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0 shadow-md"
        variants={iconVariants}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17,
          duration: 0.2
        }}
      >
        <MaterialIcon name={icon} className="text-white" />
      </motion.div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base text-foreground transition-colors duration-m3-short2 ease-m3-standard group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
      
      {/* Arrow indicator on hover */}
      <motion.div 
        className="self-center text-purple-600 dark:text-purple-400"
        variants={arrowVariants}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 25,
          duration: 0.15
        }}
      >
        <MaterialIcon name="chevron_right" size="sm" />
      </motion.div>
    </>
  );

  if (href) {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          duration: 0.2
        }}
      >
        <Link 
          to={href} 
          className={baseClasses}
          aria-label={`Open ${title} tool`}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button 
      onClick={onClick} 
      className={baseClasses}
      aria-label={`Open ${title} tool`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.2
      }}
    >
      {content}
    </motion.button>
  );
};
