import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimateSvgProps {
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  className?: string;
  path: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
  animationDuration?: number;
  animationDelay?: number;
  animationBounce?: number;
  reverseAnimation?: boolean;
  enableHoverAnimation?: boolean;
  hoverAnimationType?: "redraw" | "color" | "glow";
  hoverStrokeColor?: string;
  fill?: string;
}

export const AnimateSvg = ({
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  className = "",
  path,
  strokeColor = "currentColor",
  strokeWidth = 2,
  strokeLinecap = "round",
  animationDuration = 1.5,
  animationDelay = 0,
  animationBounce = 0.3,
  reverseAnimation = false,
  enableHoverAnimation = false,
  hoverAnimationType = "redraw",
  hoverStrokeColor,
  fill = "none",
}: AnimateSvgProps) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  const pathVariants: Variants = {
    hidden: {
      pathLength: reverseAnimation ? 1 : 0,
      opacity: 0,
    },
    visible: {
      pathLength: reverseAnimation ? 0 : 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: animationDuration,
          delay: animationDelay,
          ease: [0.22, 1, 0.36, 1],
          bounce: animationBounce,
        },
        opacity: {
          duration: 0.2,
          delay: animationDelay,
        },
      },
    },
    hover: {
      pathLength: hoverAnimationType === "redraw" ? [0, 1] : 1,
      stroke: hoverStrokeColor || strokeColor,
      filter: hoverAnimationType === "glow" ? "drop-shadow(0 0 8px currentColor)" : "none",
      transition: {
        pathLength: {
          duration: animationDuration * 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
        stroke: {
          duration: 0.3,
        },
        filter: {
          duration: 0.3,
        },
      },
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleHoverStart = () => {
    if (enableHoverAnimation) {
      setIsHovered(true);
      controls.start("hover");
    }
  };

  const handleHoverEnd = () => {
    if (enableHoverAnimation) {
      setIsHovered(false);
      controls.start("visible");
    }
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{ overflow: "visible" }}
    >
      <motion.path
        d={path}
        stroke={isHovered && hoverStrokeColor ? hoverStrokeColor : strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        fill={fill}
        initial="hidden"
        animate={controls}
        variants={pathVariants}
      />
    </motion.svg>
  );
};

// Preset decorative paths
export const decorativePaths = {
  wave: "M 0 50 Q 25 30, 50 50 T 100 50",
  spiral: "M 50 50 C 50 40, 60 30, 70 30 C 80 30, 90 40, 90 50 C 90 60, 80 70, 70 70 C 60 70, 50 60, 50 50",
  heart: "M 50 30 C 50 20, 40 10, 30 20 C 20 30, 20 45, 50 70 C 80 45, 80 30, 70 20 C 60 10, 50 20, 50 30",
  infinity: "M 30 50 C 30 35, 45 35, 50 50 C 55 65, 70 65, 70 50 C 70 35, 55 35, 50 50 C 45 65, 30 65, 30 50",
  star: "M 50 10 L 61 40 L 95 40 L 68 60 L 79 90 L 50 72 L 21 90 L 32 60 L 5 40 L 39 40 Z",
  zigzag: "M 0 50 L 20 30 L 40 50 L 60 30 L 80 50 L 100 30",
  curve: "M 10 90 Q 50 10, 90 90",
  loop: "M 20 50 C 20 20, 80 20, 80 50 C 80 80, 20 80, 20 50",
  spark: "M 50 20 L 50 80 M 20 50 L 80 50 M 28 28 L 72 72 M 72 28 L 28 72",
  circle: "M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10",
};

export default AnimateSvg;
