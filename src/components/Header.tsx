import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="liquid-glass sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-3 group">
          {/* Gradient Logo Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
            <i className="fas fa-font text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">TextCraft</h1>
            <p className="text-xs text-muted-foreground">Transform Text</p>
          </div>
        </a>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            className="glass-btn px-3 py-2 rounded-lg text-foreground text-sm hidden sm:flex items-center gap-2"
          >
            <i className="fas fa-keyboard"></i>
            Shortcuts
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="glass-btn w-10 h-10 rounded-lg text-foreground flex items-center justify-center overflow-hidden"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -30, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 30, opacity: 0, rotate: 90 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </header>
  );
};
