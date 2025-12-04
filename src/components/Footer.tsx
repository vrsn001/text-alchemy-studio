export const Footer = () => {
  return (
    <footer className="bg-surface-2 border-t border-border mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-foreground">TextCraft</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with love at{" "}
            <a 
              href="https://creativefuel.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold transition-colors"
            >
              Creative Fuel
            </a>
            {" "}💜
          </p>
          <p className="text-xs text-muted-foreground/70">
            Brewed by{" "}
            <span className="font-medium text-muted-foreground">Lakshay Rohilla</span>
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} TextCraft • Free online text manipulation tools
          </p>
        </div>
      </div>
    </footer>
  );
};
