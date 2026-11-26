import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaseSensitive, Home, Link2, Text } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/", id: "home" },
  { icon: Text, label: "Modify", href: "#modify", id: "modify" },
  { icon: Link2, label: "Links", href: "/tools/link-manager", id: "links" },
  { icon: CaseSensitive, label: "Case", href: "#case", id: "case" },
];

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    if (href.startsWith("/tools/")) return location.pathname === href;
    return location.pathname === "/" && location.hash === href;
  };

  const handleCategoryClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      className="safe-area-bottom fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground bg-background md:hidden"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const content = (
            <span className="flex flex-col items-center justify-center gap-1">
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] leading-none">{item.label}</span>
            </span>
          );

          return item.href.startsWith("#") ? (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              onClick={() => handleCategoryClick(item.href.slice(1))}
              className={`h-14 min-w-16 flex-1 rounded-none ${active ? "text-primary" : "text-muted-foreground"}`}
              aria-current={active ? "page" : undefined}
            >
              {content}
            </Button>
          ) : (
            <Button
              key={item.id}
              asChild
              variant="ghost"
              className={`h-14 min-w-16 flex-1 rounded-none ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <Link to={item.href} aria-current={active ? "page" : undefined}>
                {content}
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};