'use client';

import { HTMLAttributes } from 'react';
import useSpotlightEffect from '@/hooks/use-spotlight';
import { cn } from '@/lib/utils';

interface SpotlightConfig {
  spotlightSize?: number;
  spotlightIntensity?: number;
  fadeSpeed?: number;
  glowColor?: string;
  pulseSpeed?: number;
}

interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

const SpotlightCursor = ({
  config = {},
  className,
  ...rest
}: SpotlightCursorProps) => {
  const spotlightConfig = {
    spotlightSize: 200,
    spotlightIntensity: 0.8,
    fadeSpeed: 0.1,
    glowColor: '255, 255, 255',
    pulseSpeed: 2000,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none fixed inset-0 z-50', className)}
      {...rest}
    />
  );
};

export default SpotlightCursor;
