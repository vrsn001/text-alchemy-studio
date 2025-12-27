import React from 'react';
import './textcraft-styles.css';

const TextCraft3D: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000">
      {/* Orbiting Particles Background */}
      <div className="orbit-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="orbit-particle"
            style={{
              transform: `rotate(${i * 45}deg) translateX(150px) translateY(-50%)`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main 3D Text */}
      <div className="relative z-10">
        <h2 className="text-craft-3d text-5xl md:text-6xl lg:text-8xl font-black select-none">
          TextCraft
        </h2>
        
        {/* Reflection Effect */}
        <h2 
          className="text-craft-reflection text-5xl md:text-6xl lg:text-8xl font-black select-none"
          aria-hidden="true"
        >
          TextCraft
        </h2>
      </div>

      {/* Glow Effect Layer */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="glow-sphere" />
      </div>
    </div>
  );
};

export default TextCraft3D;
