import { LucideIcon } from "lucide-react";

interface ToolLinkProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export const ToolLink = ({ icon: Icon, title, description, onClick }: ToolLinkProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-m3 text-left w-full group"
    >
      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-m3 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-foreground group-hover:text-primary transition-m3">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </button>
  );
};
