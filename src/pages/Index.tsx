import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { ToolLink } from "@/components/ToolLink";
import { MaterialIcon } from "@/components/MaterialIcon";
import { PullToRefresh } from "@/components/PullToRefresh";
import { StackCards } from "@/components/StackCards";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
    toast.success("Tools refreshed!");
  };

  const formatGMT = (date: Date) => {
    const gmtOffset = -date.getTimezoneOffset() / 60;
    const sign = gmtOffset >= 0 ? '+' : '';
    return `GMT${sign}${gmtOffset}`;
  };

  const tools = [
    { icon: "link", title: "Link Manager", description: "Validate, detect duplicates & manage URLs", href: "/tools/link-manager" },
    { icon: "wrap_text", title: "Add Line Breaks", description: "Add line breaks after every character", href: "/tools/add-line-breaks" },
    { icon: "shuffle", title: "Random Word Generator", description: "Generate random words for your projects", href: "/tools/random-words" },
    { icon: "sort_by_alpha", title: "Alphabetical Order", description: "Sort text lines alphabetically", href: "/tools/alphabetical-order" },
    { icon: "code", title: "Text to HTML", description: "Convert plain text to HTML paragraphs", href: "/tools/text-to-html" },
    { icon: "swap_horiz", title: "Reverse Text", description: "Reverse all characters in your text", href: "/tools/reverse-text" },
    { icon: "tag", title: "Word Counter", description: "Count words, characters, and more", href: "/tools/word-counter" },
    { icon: "text_fields", title: "Case Converter", description: "Convert text to different cases", href: "/tools/case-converter" },
  ];

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen min-h-[100dvh] flex flex-col bg-background pb-20 md:pb-0 overflow-x-hidden">
        <Header />
        
        <main className="flex-1 container mx-auto px-3 md:px-4 py-6 md:py-8" key={refreshKey}>
          {/* GMT Time Display */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 rounded-full text-sm font-mono text-muted-foreground border border-border">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {currentTime.toLocaleTimeString('en-US', { hour12: false })} {formatGMT(currentTime)}
            </div>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 flex items-center justify-center gap-3">
              <span className="text-foreground">Text</span>
              <span className="relative inline-flex items-center justify-center">
                <MaterialIcon 
                  name="auto_awesome" 
                  filled 
                  className="text-[40px] md:text-[56px] text-primary drop-shadow-[0_0_12px_hsl(174,84%,40%)]" 
                />
              </span>
              <span className="text-primary">Craft</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 font-medium">
              Your creative toolkit for instant text transformation
            </p>
          </motion.header>

          <section id="text-tools" className="scroll-mt-24" aria-labelledby="text-tools-heading">
            <h2 id="text-tools-heading" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Text Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tools.map((tool, index) => (
                <motion.article
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3, ease: [0.2, 0, 0, 1] }}
                >
                  <ToolLink {...tool} />
                </motion.article>
              ))}
            </div>
          </section>

          <section id="html-tools" className="scroll-mt-24 mt-12" aria-labelledby="html-tools-heading">
            <h2 id="html-tools-heading" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              HTML Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.2, 0, 0, 1] }}
              >
                <ToolLink 
                  icon="code" 
                  title="Text to HTML" 
                  description="Convert plain text to HTML paragraphs" 
                  href="/tools/text-to-html" 
                />
              </motion.article>
            </div>
          </section>

          <section id="favorites" className="scroll-mt-24 mt-12" aria-labelledby="favorites-heading">
            <h2 id="favorites-heading" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tools.slice(0, 4).map((tool, index) => (
                <motion.article
                  key={`fav-${tool.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3, ease: [0.2, 0, 0, 1] }}
                >
                  <ToolLink {...tool} />
                </motion.article>
              ))}
            </div>
          </section>

          {/* Stack Cards Animation Section */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground text-center">
              Explore TextCraft Features
            </h2>
            <StackCards />
          </section>
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PullToRefresh>
  );
};

export default Index;
