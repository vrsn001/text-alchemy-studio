'use client';

import useCanvasCursor from '@/hooks/use-canvasCursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      id="canvas-cursor"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default CanvasCursor;
