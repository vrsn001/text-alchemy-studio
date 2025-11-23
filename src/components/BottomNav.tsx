import { Home, Type, Hash, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/", id: "home" },
  { icon: Type, label: "Text Tools", href: "#text-tools", id: "text" },
  { icon: Hash, label: "HTML Tools", href: "#html-tools", id: "html" },
  { icon: Star, label: "Favorites", href: "#favorites", id: "favorites" },
];

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.hash === href;
  };

  const handleNavClick = (href: string, id: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-1 border-t border-border z-50 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return item.href.startsWith("#") ? (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href, item.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative overflow-hidden group transition-all duration-300",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {/* Material 3 Ripple Effect */}
              <div className="absolute inset-0 bg-primary/10 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-b-full animate-fade-in" />
              )}
              
              <Icon className={cn(
                "h-6 w-6 mb-1 transition-all duration-300",
                active && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                active && "font-bold"
              )}>
                {item.label}
              </span>
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative overflow-hidden group transition-all duration-300",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {/* Material 3 Ripple Effect */}
              <div className="absolute inset-0 bg-primary/10 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-b-full animate-fade-in" />
              )}
              
              <Icon className={cn(
                "h-6 w-6 mb-1 transition-all duration-300",
                active && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                active && "font-bold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};