interface SparklesProps {
  className?: string;
  size?: number;
  density?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  minSize?: number | null;
  minSpeed?: number | null;
  direction?: string;
  opacitySpeed?: number;
  minOpacity?: number | null;
  mousemove?: boolean;
  hover?: boolean;
  background?: string;
  options?: Record<string, unknown>;
}

// Kept as a compatibility component for existing pages; decorative particles are intentionally disabled.
export function Sparkles(_props: SparklesProps) {
  return null;
}

export default Sparkles;