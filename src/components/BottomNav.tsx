import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: "fa-home", label: "Home", href: "/", id: "home" },
  { icon: "fa-text-height", label: "Case", href: "#case", id: "case" },
  { icon: "fa-edit", label: "Modify", href: "#modify", id: "modify" },
  { icon: "fa-code", label: "Encode", href: "#encode", id: "encode" },
];

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/" && !location.hash;
    }
    return location.hash === href;
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(`[data-category="${href.slice(1)}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.location.hash = href;
    }
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 liquid-glass z-50 safe-area-bottom"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          const buttonContent = (
            <div className="relative flex flex-col items-center justify-center">
              <i className={cn(
                `fas ${item.icon} text-lg mb-0.5 transition-all duration-200`,
                active ? "text-purple-accent scale-110" : "text-muted-foreground"
              )} />
              <span 
                className={cn(
                  "text-[11px] transition-all duration-200",
                  active ? "font-semibold text-purple-accent" : "font-medium text-muted-foreground"
                )}
              >
                {item.label}
              </span>
              {active && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-purple-accent" />
              )}
            </div>
          );
          
          return item.href.startsWith("#") ? (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
              aria-current={active ? "page" : undefined}
            >
              {buttonContent}
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
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
