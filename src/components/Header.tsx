import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TEXT CRAFT</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#text-tools" className="hover:opacity-80 transition-opacity font-medium">
              Text Tools
            </a>
            <a href="#html-tools" className="hover:opacity-80 transition-opacity font-medium">
              HTML Tools
            </a>
            <a href="#number-tools" className="hover:opacity-80 transition-opacity font-medium">
              Number Tools
            </a>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-primary-foreground/10 text-primary-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
