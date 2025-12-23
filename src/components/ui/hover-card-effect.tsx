import React from 'react';

interface HoverCardProps {
  badge: string;
  badgeColorDefault: string;
  badgeColorHover: string;
  titleDefault: string;
  titleHover: string;
  description: string;
  imageDefault?: string;
  imageHover?: string;
  gradientFrom: string;
  gradientTo: string;
  gradientFromHover: string;
  gradientToHover: string;
}

export function HoverCard({
  badge,
  badgeColorDefault,
  badgeColorHover,
  titleDefault,
  titleHover,
  description,
  imageDefault,
  imageHover,
  gradientFrom,
  gradientTo,
  gradientFromHover,
  gradientToHover,
}: HoverCardProps) {
  return (
    <div 
      className="group relative rounded-2xl border border-border/50 overflow-hidden transition-all duration-500"
      style={{
        background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `linear-gradient(to top, ${gradientFromHover}, ${gradientToHover})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`;
      }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-5 pointer-events-none" />
      
      <div className="relative">
        <div className="px-6 py-5">
          {/* Badge */}
          <div 
            className={`${badgeColorDefault} group-hover:${badgeColorHover} transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-white mb-1`}
          >
            {badge}
          </div>
          
          {/* Title - toggles on hover */}
          <span className="text-lg group-hover:hidden inline-block font-semibold pt-2 text-foreground mb-1 transition-all duration-500 ease-in-out">
            {titleDefault}
          </span>
          <span className="text-lg group-hover:inline-block hidden font-semibold pt-2 text-foreground mb-1 transition-all duration-500 ease-in-out">
            {titleHover}
          </span>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        
        {/* Image container with hover swap */}
        {(imageDefault || imageHover) && (
          <div className="relative group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
            {imageDefault && (
              <img
                className="group-hover:opacity-0 transition-opacity duration-500 object-cover w-full h-auto"
                src={imageDefault}
                alt={titleDefault}
              />
            )}
            {imageHover && (
              <img
                className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 object-cover w-full h-auto"
                src={imageHover}
                alt={titleHover}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Demo section with 3 cards
export function HoverCardsDemo() {
  const cards = [
    {
      badge: "Text Tools",
      badgeColorDefault: "bg-white text-black",
      badgeColorHover: "bg-blue-400",
      titleDefault: "Case Converter",
      titleHover: "Transform Text Case",
      description: "Convert your text to uppercase, lowercase, title case, or sentence case instantly.",
      gradientFrom: "#242424",
      gradientTo: "#020202",
      gradientFromHover: "#182135",
      gradientToHover: "#080808",
    },
    {
      badge: "Formatting",
      badgeColorDefault: "bg-green-400",
      badgeColorHover: "bg-blue-600",
      titleDefault: "Add Line Breaks",
      titleHover: "Format Your Text",
      description: "Add paragraph breaks, number lines, and organize URLs with a single click.",
      gradientFrom: "#050a0a",
      gradientTo: "#051818",
      gradientFromHover: "#05070a",
      gradientToHover: "#0b1a3b",
    },
    {
      badge: "Utilities",
      badgeColorDefault: "bg-blue-400",
      badgeColorHover: "bg-purple-500",
      titleDefault: "Word Counter",
      titleHover: "Analyze Your Text",
      description: "Count words, characters, sentences, and paragraphs in real-time.",
      gradientFrom: "#171c35",
      gradientTo: "#000000",
      gradientFromHover: "#2b131e",
      gradientToHover: "#141414",
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-6 max-md:max-w-xs mx-auto p-6">
      {cards.map((card, index) => (
        <HoverCard key={index} {...card} />
      ))}
    </section>
  );
}

export default HoverCard;
