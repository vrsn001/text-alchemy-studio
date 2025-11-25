import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { ToolLink } from "@/components/ToolLink";
import { Scissors, Hash, ArrowUpDown, FileCode, ArrowLeftRight, Type } from "lucide-react";
import { PullToRefresh } from "@/components/PullToRefresh";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
    toast.success("Tools refreshed!");
  };

  const tools = [
    { icon: Scissors, title: "Add Line Breaks", description: "Add line breaks after every character", href: "/tools/add-line-breaks" },
    { icon: Hash, title: "Random Word Generator", description: "Generate random words for your projects", href: "/tools/random-words" },
    { icon: ArrowUpDown, title: "Alphabetical Order", description: "Sort text lines alphabetically", href: "/tools/alphabetical-order" },
    { icon: FileCode, title: "Text to HTML", description: "Convert plain text to HTML paragraphs", href: "/tools/text-to-html" },
    { icon: ArrowLeftRight, title: "Reverse Text", description: "Reverse all characters in your text", href: "/tools/reverse-text" },
    { icon: Hash, title: "Word Counter", description: "Count words, characters, and more", href: "/tools/word-counter" },
    { icon: Type, title: "Case Converter", description: "Convert text to different cases", href: "/tools/case-converter" },
  ];

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8" key={refreshKey}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
              TextCraft
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Transform your text instantly with powerful online tools
            </p>
          </motion.div>

          <section id="text-tools">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Text Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <ToolLink {...tool} />
                </motion.div>
              ))}
            </div>
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
