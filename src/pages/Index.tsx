import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { ToolLink } from "@/components/ToolLink";
import { MaterialIcon } from "@/components/MaterialIcon";
import { PullToRefresh } from "@/components/PullToRefresh";
import { useState, useEffect } from "react";
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
        
        {/* Hero Section with Gradient */}
        <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          {/* Background blur circles */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
                Transform Your Text Instantly
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                The ultimate text manipulation toolkit for developers, writers, and creators
              </p>
              
              {/* Glass badges */}
              <div className="flex justify-center flex-wrap gap-3">
                <motion.div 
                  className="px-6 py-3 rounded-lg backdrop-blur-md border border-white/20"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <span className="text-white flex items-center gap-2">
                    <MaterialIcon name="bolt" className="text-[18px]" />
                    Lightning Fast
                  </span>
                </motion.div>
                <motion.div 
                  className="px-6 py-3 rounded-lg backdrop-blur-md border border-white/20"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <span className="text-white flex items-center gap-2">
                    <MaterialIcon name="shield" className="text-[18px]" />
                    100% Private
                  </span>
                </motion.div>
                <motion.div 
                  className="px-6 py-3 rounded-lg backdrop-blur-md border border-white/20"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <span className="text-white flex items-center gap-2">
                    <MaterialIcon name="auto_fix_high" className="text-[18px]" />
                    8+ Transformations
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12" key={refreshKey}>
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
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PullToRefresh>
  );
};

export default Index;
