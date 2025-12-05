import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MaterialIcon } from "./MaterialIcon";
import { toast } from "sonner";

const PRESET_COLORS = [
  { name: "Teal", hex: "#009688" },
  { name: "Blue", hex: "#2196F3" },
  { name: "Purple", hex: "#9C27B0" },
  { name: "Pink", hex: "#E91E63" },
  { name: "Red", hex: "#F44336" },
  { name: "Orange", hex: "#FF9800" },
  { name: "Green", hex: "#4CAF50" },
  { name: "Indigo", hex: "#3F51B5" },
];

// Convert hex to HSL string for CSS variables
function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0% 0%";
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Generate color variations from a seed color using HSL manipulation
function generatePalette(seedHex: string, isDark: boolean) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(seedHex);
  if (!result) return null;
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }

  const hue = Math.round(h * 360);
  const sat = Math.round(s * 100);

  if (isDark) {
    return {
      "--primary": `${hue} ${Math.min(sat + 10, 100)}% 65%`,
      "--primary-foreground": `${hue} 15% 10%`,
      "--primary-hover": `${hue} ${Math.min(sat + 10, 100)}% 70%`,
      "--secondary": `${hue} 20% 18%`,
      "--secondary-foreground": `${hue} 10% 90%`,
      "--accent": `${hue} 30% 25%`,
      "--accent-foreground": `${hue} ${sat}% 70%`,
      "--ring": `${hue} ${sat}% 65%`,
    };
  } else {
    return {
      "--primary": `${hue} ${sat}% 35%`,
      "--primary-foreground": `0 0% 100%`,
      "--primary-hover": `${hue} ${sat}% 30%`,
      "--secondary": `${hue} 30% 94%`,
      "--secondary-foreground": `${hue} ${sat}% 25%`,
      "--accent": `${hue} 40% 92%`,
      "--accent-foreground": `${hue} ${sat}% 25%`,
      "--ring": `${hue} ${sat}% 40%`,
    };
  }
}

export const ThemePicker = () => {
  const { resolvedTheme } = useTheme();
  const [seedColor, setSeedColor] = useState("#009688");
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [open, setOpen] = useState(false);

  const applyTheme = useCallback((color: string, isDark: boolean) => {
    const palette = generatePalette(color, isDark);
    if (!palette) return;
    
    const root = document.documentElement;
    for (const [property, value] of Object.entries(palette)) {
      root.style.setProperty(property, value);
    }
  }, []);

  const resetTheme = useCallback(() => {
    const root = document.documentElement;
    const properties = [
      "--primary", "--primary-foreground", "--primary-hover",
      "--secondary", "--secondary-foreground",
      "--accent", "--accent-foreground", "--ring"
    ];
    for (const prop of properties) {
      root.style.removeProperty(prop);
    }
  }, []);

  // Load saved theme on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("m3-theme-color");
    if (savedColor) {
      setSeedColor(savedColor);
      setIsCustomTheme(true);
      applyTheme(savedColor, resolvedTheme === "dark");
    }
  }, [applyTheme, resolvedTheme]);

  // Re-apply theme when dark/light mode changes
  useEffect(() => {
    if (isCustomTheme) {
      applyTheme(seedColor, resolvedTheme === "dark");
    }
  }, [resolvedTheme, isCustomTheme, seedColor, applyTheme]);

  const handleColorChange = (color: string) => {
    setSeedColor(color);
    applyTheme(color, resolvedTheme === "dark");
    setIsCustomTheme(true);
    localStorage.setItem("m3-theme-color", color);
    toast.success("Theme updated!", {
      description: "Your custom color palette has been applied.",
      duration: 2000,
    });
  };

  const handleReset = () => {
    resetTheme();
    setIsCustomTheme(false);
    setSeedColor("#009688");
    localStorage.removeItem("m3-theme-color");
    toast.info("Theme reset", {
      description: "Default teal theme restored.",
      duration: 2000,
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary-foreground/15 text-primary-foreground transition-all duration-m3-medium2 ease-m3-standard active:scale-90"
          aria-label="Customize theme colors"
        >
          <MaterialIcon 
            name="palette" 
            className="text-[20px] transition-transform duration-m3-medium2 hover:rotate-12" 
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-4 transition-all duration-m3-medium2 ease-m3-emphasized-decelerate" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MaterialIcon name="colorize" className="text-primary" />
            <h4 className="font-semibold text-sm">Dynamic Theme</h4>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Pick a seed color to generate an M3-inspired palette.
          </p>

          {/* Color picker input */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={seedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer border-2 border-border overflow-hidden transition-all duration-m3-short4 hover:scale-105 active:scale-95"
                style={{ backgroundColor: seedColor }}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">Seed Color</label>
              <p className="font-mono text-sm uppercase">{seedColor}</p>
            </div>
          </div>

          {/* Preset colors */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Presets</label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleColorChange(color.hex)}
                  className={`
                    w-full aspect-square rounded-lg transition-all duration-m3-short4 ease-m3-standard
                    hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${seedColor === color.hex ? "ring-2 ring-primary ring-offset-2 scale-110" : ""}
                  `}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Set theme to ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Preview</label>
            <div className="flex gap-1.5 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-md bg-primary" title="Primary" />
              <div className="w-8 h-8 rounded-md bg-secondary" title="Secondary" />
              <div className="w-8 h-8 rounded-md bg-accent" title="Accent" />
              <div className="w-8 h-8 rounded-md bg-muted" title="Muted" />
              <div className="w-8 h-8 rounded-md bg-destructive" title="Destructive" />
            </div>
          </div>

          {/* Reset button */}
          {isCustomTheme && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full transition-all duration-m3-short4"
              onClick={handleReset}
            >
              <MaterialIcon name="restart_alt" className="mr-2 text-[18px]" />
              Reset to Default
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
