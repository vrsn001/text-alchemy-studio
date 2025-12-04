import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MaterialIcon } from "./MaterialIcon";

const favoriteTools = [
  { icon: "wrap_text", label: "Line Breaks", href: "/tools/add-line-breaks" },
  { icon: "tag", label: "Word Counter", href: "/tools/word-counter" },
  { icon: "text_fields", label: "Case Convert", href: "/tools/case-converter" },
  { icon: "shuffle", label: "Random Words", href: "/tools/random-words" },
];

export const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FAB Menu Items */}
      <div className="fixed bottom-24 right-3 z-50 flex flex-col-reverse gap-2 md:hidden">
        {favoriteTools.map((tool, index) => {
          return (
            <Link
              key={tool.label}
              to={tool.href}
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0 pointer-events-none"
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
              onClick={() => setIsOpen(false)}
            >
              {/* Label */}
              <span className="bg-surface-1 text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-border">
                {tool.label}
              </span>
              
              {/* Mini FAB */}
              <button
                className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95 relative overflow-hidden group"
              >
                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
                <MaterialIcon name={tool.icon} size="sm" />
              </button>
            </Link>
          );
        })}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 right-3 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center z-50 md:hidden transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group",
          isOpen && "rotate-45"
        )}
        aria-label="Quick access to favorite tools"
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
        
        <MaterialIcon 
          name={isOpen ? "close" : "star"} 
          filled={!isOpen}
          className="text-[24px] transition-transform duration-300" 
        />
      </button>
    </>
  );
};
