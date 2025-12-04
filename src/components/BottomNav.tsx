import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "./MaterialIcon";

const navItems = [
  { icon: "home", label: "Home", href: "/", id: "home" },
  { icon: "text_fields", label: "Text Tools", href: "#text-tools", id: "text" },
  { icon: "code", label: "HTML Tools", href: "#html-tools", id: "html" },
  { icon: "star", label: "Favorites", href: "#favorites", id: "favorites" },
];

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (href: string) => {
    // Only home path should be active when on "/"
    if (href === "/") {
      return location.pathname === "/" && !location.hash;
    }
    // Hash navigation for other items
    return location.hash === href;
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.location.hash = href;
    }
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-1/95 backdrop-blur-md border-t border-border/50 z-[100] safe-area-bottom shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.1)]"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          const buttonContent = (
            <>
              {/* Active pill background */}
              <div 
                className={cn(
                  "absolute inset-x-2 top-1 bottom-1 rounded-2xl transition-all duration-300 ease-out",
                  active ? "bg-primary/10" : "bg-transparent group-active:bg-primary/5"
                )} 
              />
              
              {/* Active Indicator bar */}
              <div 
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-full transition-all duration-300 ease-out bg-primary",
                  active ? "w-12 opacity-100" : "w-0 opacity-0"
                )} 
              />
              
              <div className="relative flex flex-col items-center justify-center">
                <MaterialIcon 
                  name={item.icon}
                  filled={active}
                  className={cn(
                    "text-[20px] mb-0.5 transition-all duration-200 ease-out",
                    active ? "scale-110 text-primary" : "group-active:scale-90"
                  )} 
                />
                <span 
                  className={cn(
                    "text-[11px] transition-all duration-200",
                    active ? "font-semibold text-primary" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </>
          );
          
          return item.href.startsWith("#") ? (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative group touch-manipulation",
                active ? "text-primary" : "text-muted-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {buttonContent}
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative group touch-manipulation",
                active ? "text-primary" : "text-muted-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {buttonContent}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
