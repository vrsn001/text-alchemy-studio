import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
    "state-layer",
    "border border-border/50"
  );

  const content = (
    <>
      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-200 mt-0.5 flex-shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};
