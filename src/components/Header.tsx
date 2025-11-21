import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">TextCraft</h1>
              <p className="text-sm text-muted-foreground">Crafted with creative fuel ⚡</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
