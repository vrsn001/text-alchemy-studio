import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { GradientBorderCard } from "@/components/ui/gradient-border-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { triggerHaptic } from "@/utils/haptics";
import { downloadAsText } from "@/utils/download";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";
import { Sparkles } from "@/components/ui/sparkles";

const WORD_LIST = [
  "apple", "banana", "cherry", "dragon", "elephant", "forest", "guitar", "horizon",
  "island", "journey", "kitchen", "laptop", "mountain", "network", "ocean", "passport",
  "quantum", "rainbow", "satellite", "thunder", "umbrella", "volcano", "whisper", "xylophone",
  "yellow", "zenith", "abstract", "balance", "creative", "dynamic", "elegant", "flexible",
  "genuine", "harmony", "inspire", "justice", "knowledge", "liberty", "miracle", "natural",
  "opportunity", "peaceful", "quality", "reliable", "secure", "trust", "unity", "victory",
  "wisdom", "amazing", "brilliant", "courage", "delight", "energy", "freedom", "graceful",
  "happiness", "imagine", "joyful", "kindness", "laughter", "memories", "nostalgic", "optimism"
];

const RandomWords = () => {
  const [wordCount, setWordCount] = useState(10);
  const [words, setWords] = useState("");

  const generateWords = () => {
    const count = Math.max(1, Math.min(100, wordCount));
    const wordsArray: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
      wordsArray.push(WORD_LIST[randomIndex]);
    }
    
    setWords(wordsArray.join(", "));
    triggerHaptic('light');
    toast.success(`Generated ${count} random words!`);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(words);
    triggerHaptic('success');
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    downloadAsText(words, "random-words.txt");
    triggerHaptic('light');
    toast.success("Downloaded successfully!");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden relative">
        <MeshGradientBackground />
        
        {/* Sparkles background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Sparkles color="#a855f7" density={80} speed={0.4} opacity={0.3} size={1.2} />
        </div>
        
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl relative z-10">
          <Breadcrumb items={[
            { label: "Tools", href: "/#text-tools" },
            { label: "Random Word Generator" }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GradientBorderCard variant="purple">
              <LiquidGlassCard blur="xl" className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Random Word Generator</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate a list of random words for brainstorming and creative projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Number of Words</label>
                    <Input
                      type="number"
                      value={wordCount}
                      onChange={(e) => setWordCount(parseInt(e.target.value) || 1)}
                      min="1"
                      max="100"
                      className="max-w-xs bg-background/50 backdrop-blur-sm border-border/50"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={generateWords}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate Words
                    </Button>
                  </div>

                  {words && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <GradientBorderCard variant="pink" className="mt-4">
                        <LiquidGlassCard blur="lg" className="p-4 space-y-2">
                          <label className="text-sm font-medium text-foreground">Generated Words</label>
                          <div className="relative">
                            <Textarea
                              value={words}
                              readOnly
                              className="min-h-[120px] resize-none bg-background/50 backdrop-blur-sm border-border/50"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              <Button
                                onClick={handleCopy}
                                size="icon"
                                variant="outline"
                                className="backdrop-blur-sm bg-background/80 hover:bg-background border-border/50"
                                title="Copy to clipboard"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={handleDownload}
                                size="icon"
                                variant="outline"
                                className="backdrop-blur-sm bg-background/80 hover:bg-background border-border/50"
                                title="Download as file"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </LiquidGlassCard>
                      </GradientBorderCard>
                    </motion.div>
                  )}
                </div>
              </LiquidGlassCard>
            </GradientBorderCard>
          </motion.div>
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PageTransition>
  );
};

export default RandomWords;