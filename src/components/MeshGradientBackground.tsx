'use client';
import React from 'react';

interface MeshGradientBackgroundProps {
  className?: string;
}

export function MeshGradientBackground({ className }: MeshGradientBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className || ''}`}>
      {/* Animated mesh gradient using CSS */}
      <div className="absolute inset-0 bg-background">
        {/* Purple blob */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
            animation: 'float1 15s ease-in-out infinite'
          }}
        />
        
        {/* Pink blob */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(280, 80%, 50%) 0%, transparent 70%)',
            top: '20%',
            right: '-5%',
            animation: 'float2 18s ease-in-out infinite'
          }}
        />
        
        {/* Blue blob */}
        <div 
          className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(220, 80%, 50%) 0%, transparent 70%)',
            bottom: '10%',
            left: '20%',
            animation: 'float3 20s ease-in-out infinite'
          }}
        />
        
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
      </div>
      
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 20px) scale(1.05); }
          66% { transform: translate(30px, -30px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 30px) scale(1.08); }
          66% { transform: translate(-30px, -20px) scale(0.92); }
        }
      `}</style>
    </div>
  );
}

export default MeshGradientBackground;
