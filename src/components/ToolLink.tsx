import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ToolLinkProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  iconColor?: string;
}

export const ToolLink = ({ icon, title, description, href, onClick, iconColor = "text-purple-accent" }: ToolLinkProps) => {
  const content = (
    <div className="tool-item p-4 rounded-xl h-full">
      <i className={cn(`fas ${icon} text-2xl mb-2`, iconColor)}></i>
      <h4 className="text-foreground font-semibold text-sm">{title}</h4>
      <p className="text-muted-foreground text-xs mt-1">{description}</p>
    </div>
  );

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Link to={href} aria-label={`Open ${title} tool`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button 
      onClick={onClick} 
      className="w-full text-left"
      aria-label={`Open ${title} tool`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {content}
    </motion.button>
  );
};
