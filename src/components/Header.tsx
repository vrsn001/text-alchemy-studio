import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-card via-surface-2 to-card border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 animate-fade-up">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl animate-float shadow-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">TextCraft</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Crafted with creative fuel ⚡</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
