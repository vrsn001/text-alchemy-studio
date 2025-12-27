import React from 'react';
import TextCraft3D from './TextCraft3D';
import { Sparkles } from '@/components/ui/sparkles';
import './textcraft-styles.css';

const TextCraftHero: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      <article className="grid gap-4 text-center relative z-10 pt-10 px-4">
        {/* Badge */}
        <span className="inline-block text-sm border p-1 px-3 w-fit mx-auto rounded-full border-[#3273ff] bg-[#0f1c35]">
          Transform Your Text
        </span>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-b from-[#edeffd] to-[#7b9cda] bg-clip-text text-transparent leading-[100%] tracking-tighter px-4">
          Transform Your Text With a Global
          <br />
          Perspective, Innovate with Ease.
        </h1>

        {/* 3D TextCraft Component */}
        <TextCraft3D />
      </article>

      {/* Bottom Gradient + Sparkles Section */}
      <div className="relative -mt-32 h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        {/* Before pseudo-element effect */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)]" />
        
        {/* After pseudo-element effect */}
        <div className="absolute -left-1/2 top-1/2 w-[200%] rounded-[10%] border-t border-[#163474] bg-[#08132b] aspect-[1/0.7]" />
        
        {/* Sparkles */}
        <Sparkles
          density={800}
          speed={1.2}
          size={1.2}
          direction="top"
          opacitySpeed={2}
          color="#32A7FF"
          className="absolute inset-x-0 bottom-0 h-full w-full"
        />
      </div>
    </div>
  );
};

export default TextCraftHero;
