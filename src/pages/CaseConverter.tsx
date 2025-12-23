import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LiquidGlassCard, LiquidGlassWideItem } from "@/components/ui/liquid-glass";
import { GradientBorderCard } from "@/components/ui/gradient-border-card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { triggerHaptic } from "@/utils/haptics";
import { downloadAsText } from "@/utils/download";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";
import { Sparkles } from "@/components/ui/sparkles";

type CaseType = "upper" | "lower" | "title" | "sentence";

const CaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const convertCase = (type: CaseType) => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    let result = "";
    switch (type) {
      case "upper":
        result = inputText.toUpperCase();
        break;
      case "lower":
        result = inputText.toLowerCase();
        break;
      case "title":
        result = inputText
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "sentence":
        result = inputText
          .toLowerCase()
          .replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
        break;
    }

    setOutputText(result);
    setActiveCase(type);
    triggerHaptic('light');
    toast.success(`Converted to ${type} case!`);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    triggerHaptic('success');
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    downloadAsText(outputText, "converted-text.txt");
    triggerHaptic('light');
    toast.success("Downloaded successfully!");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setActiveCase(null);
    triggerHaptic('medium');
  };

  const caseButtons = [
    { type: "upper" as CaseType, label: "UPPERCASE" },
    { type: "lower" as CaseType, label: "lowercase" },
    { type: "title" as CaseType, label: "Title Case" },
    { type: "sentence" as CaseType, label: "Sentence case" },
  ];

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
            { label: "Case Converter" }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GradientBorderCard variant="purple">
              <LiquidGlassCard blur="xl" className="p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Text Case Converter</h1>
                  <p className="text-muted-foreground">
                    Convert your text to uppercase, lowercase, title case, or sentence case.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Input Text</label>
                    <Textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter your text here..."
                      className="min-h-[150px] resize-none bg-background/50 backdrop-blur-sm border-border/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {caseButtons.map((btn) => (
                      <LiquidGlassWideItem
                        key={btn.type}
                        active={activeCase === btn.type}
                        onClick={() => convertCase(btn.type)}
                        className="justify-center py-3 cursor-pointer"
                      >
                        <span className="font-medium text-sm">{btn.label}</span>
                      </LiquidGlassWideItem>
                    ))}
                  </div>

                  <Button
                    onClick={handleClear}
                    variant="outline"
                    size="icon"
                    className="backdrop-blur-sm border-border/50 hover:bg-accent/50"
                    title="Clear all"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <AnimatePresence>
                    {outputText && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GradientBorderCard variant="pink" className="mt-4">
                          <LiquidGlassCard blur="lg" className="p-4 space-y-2">
                            <label className="text-sm font-medium text-foreground">Output Text</label>
                            <div className="relative">
                              <Textarea
                                value={outputText}
                                readOnly
                                className="min-h-[150px] resize-none bg-background/50 backdrop-blur-sm border-border/50"
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
                  </AnimatePresence>
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

export default CaseConverter;