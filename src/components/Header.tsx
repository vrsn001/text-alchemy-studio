import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "./MaterialIcon";
import { ThemePicker } from "./ThemePicker";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-[100] safe-area-top backdrop-blur-md bg-primary/95 transition-all duration-m3-medium2 ease-m3-standard shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <a href="/" className="flex items-center gap-2 md:gap-3 group">
            <MaterialIcon 
              name="auto_awesome" 
              filled 
              className="text-[28px] md:text-[36px] transition-transform duration-m3-medium2 group-hover:rotate-12 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">TextCraft</h1>
              <p className="text-[10px] md:text-xs opacity-80 hidden sm:block font-medium">Made with 💜 at Creative Fuel</p>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            <a 
              href="#text-tools" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-m3-short4 hover:bg-primary-foreground/15 active:scale-95"
            >
              Text Tools
            </a>
            <a 
              href="#html-tools" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-m3-short4 hover:bg-primary-foreground/15 active:scale-95"
            >
              HTML Tools
            </a>
            <a 
              href="#number-tools" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-m3-short4 hover:bg-primary-foreground/15 active:scale-95"
            >
              Number Tools
            </a>
          </nav>

          <div className="flex items-center gap-1">
            <ThemePicker />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-primary-foreground/15 text-primary-foreground transition-all duration-m3-short4 active:scale-90"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <MaterialIcon 
                name={theme === "dark" ? "light_mode" : "dark_mode"} 
                className="text-[20px] transition-transform duration-m3-medium2 hover:rotate-12" 
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
