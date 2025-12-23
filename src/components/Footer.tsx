export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            Made with <span className="text-red-500">❤</span> by TextCraft Studio
          </p>
          <p className="text-sm text-muted-foreground/70">
            All transformations happen locally in your browser. Your text never leaves your device.
          </p>
        </div>
      </div>
    </footer>
  );
};
