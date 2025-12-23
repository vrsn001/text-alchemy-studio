'use client';
import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

interface MeshGradientBackgroundProps {
  className?: string;
}

export function MeshGradientBackground({ className }: MeshGradientBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className || ''}`}>
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23893bdc&color2=%231f0e3d&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.2&uFrequency=5.5&uSpeed=0.2&uStrength=3&uTime=0&wireframe=false"
        />
      </ShaderGradientCanvas>
    </div>
  );
}

export default MeshGradientBackground;
