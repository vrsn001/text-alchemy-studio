import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
    });
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words, color: "from-primary/20 to-primary/10" },
    { label: "Characters", value: stats.characters, color: "from-accent/20 to-accent/10" },
    { label: "No Spaces", value: stats.charactersNoSpaces, color: "from-secondary/30 to-secondary/20" },
    { label: "Sentences", value: stats.sentences, color: "from-primary/15 to-primary/5" },
    { label: "Lines", value: stats.lines, color: "from-accent/15 to-accent/5" },
    { label: "Paragraphs", value: stats.paragraphs, color: "from-secondary/25 to-secondary/15" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden relative">
        <MeshGradientBackground />
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
          <Breadcrumb items={[
            { label: "Tools", href: "/#text-tools" },
            { label: "Word Counter" }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 bg-card shadow-lg backdrop-blur-sm border-border/50">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Word Counter</h1>
                <p className="text-muted-foreground">
                  Count words, characters, sentences, and paragraphs in your text in real-time.
                </p>
              </div>

              <div className="space-y-6">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here to see live statistics..."
                  className="min-h-[300px] resize-none"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {statCards.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={`bg-gradient-to-br ${stat.color} p-4 rounded-lg text-center backdrop-blur-sm border border-border/30`}
                    >
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PageTransition>
  );
};

export default WordCounter;
