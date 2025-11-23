export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © 2025 TextCraft - Made with love at{" "}
            <a 
              href="https://creativefuel.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Creative Fuel
            </a>
            {" "}💜
          </p>
          <p className="mt-2">Free online text manipulation tools</p>
        </div>
      </div>
    </footer>
  );
};
