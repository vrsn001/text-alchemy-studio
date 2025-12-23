import { MaterialIcon } from "./MaterialIcon";

export const Footer = () => {
  return (
    <footer className="bg-surface-1 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <MaterialIcon 
              name="auto_awesome" 
              filled 
              className="text-2xl text-primary" 
            />
            <span className="text-2xl font-bold text-foreground">TextCraft</span>
          </div>
          
          {/* Attribution */}
          <p className="text-sm text-muted-foreground">
            Made with love at{" "}
            <a 
              href="https://creativefuel.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover font-semibold transition-colors duration-m3-short2 ease-m3-standard hover:underline underline-offset-4"
            >
              Creative Fuel
            </a>
            {" "}
            <span className="inline-block">💜</span>
          </p>
          
          <p className="text-xs text-muted-foreground/80">
            Brewed by{" "}
            <span className="font-medium text-foreground/70">Lakshay Rohilla</span>
          </p>
          
          {/* Divider */}
          <div className="w-16 h-px bg-border mx-auto my-6" />
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} TextCraft • Free online text manipulation tools
          </p>
        </div>
      </div>
    </footer>
  );
};
