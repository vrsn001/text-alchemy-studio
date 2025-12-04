import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  filled?: boolean;
}

const sizeMap = {
  sm: "text-[18px]",
  md: "text-[24px]",
  lg: "text-[32px]",
  xl: "text-[48px]",
};

export const MaterialIcon = ({ 
  name, 
  className, 
  size = "md",
  filled = false 
}: MaterialIconProps) => {
  return (
    <span 
      className={cn(
        "material-symbols-rounded select-none leading-none",
        sizeMap[size],
        className
      )}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
      }}
    >
      {name}
    </span>
  );
};
