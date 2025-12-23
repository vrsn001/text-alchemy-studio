import creativeFuelLogo from "@/assets/creative-fuel-logo.jpg";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center space-y-4">
          {/* Creative Fuel Logo */}
          <a 
            href="https://creativefuel.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img 
              src={creativeFuelLogo} 
              alt="Creative Fuel - We Make Brands Go Viral" 
              className="h-16 w-auto mx-auto"
            />
          </a>
          
          {/* Made by credit */}
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <span>Brewed with</span>
            <span className="text-lg">☕</span>
            <span>by</span>
            <span className="font-semibold text-foreground">Lakshay Rohilla</span>
            <span>at</span>
            <a 
              href="https://creativefuel.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:underline underline-offset-4"
            >
              Creative Fuel
            </a>
          </p>
          
          <p className="text-sm text-muted-foreground/70">
            All transformations happen locally in your browser. Your text never leaves your device.
          </p>
        </div>
      </div>
    </footer>
  );
};
