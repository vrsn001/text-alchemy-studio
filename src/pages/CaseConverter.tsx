import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { triggerHaptic } from "@/utils/haptics";
import { downloadAsText } from "@/utils/download";

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
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
          <Breadcrumb items={[
            { label: "Tools", href: "/#text-tools" },
            { label: "Case Converter" }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 bg-card shadow-lg backdrop-blur-sm border-border/50">
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
                    className="min-h-[150px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {caseButtons.map((btn) => (
                    <Button
                      key={btn.type}
                      onClick={() => convertCase(btn.type)}
                      variant={activeCase === btn.type ? "default" : "outline"}
                      className="transition-m3 relative overflow-hidden group"
                    >
                      <span className="relative z-10">{btn.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 2, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="icon"
                  className="transition-m3"
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
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-foreground">Output Text</label>
                      <div className="relative">
                        <Textarea
                          value={outputText}
                          readOnly
                          className="min-h-[150px] resize-none bg-muted border-border"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            onClick={handleCopy}
                            size="icon"
                            variant="outline"
                            className="transition-m3 bg-background/80 backdrop-blur-sm hover:bg-background"
                            title="Copy to clipboard"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={handleDownload}
                            size="icon"
                            variant="outline"
                            className="transition-m3 bg-background/80 backdrop-blur-sm hover:bg-background"
                            title="Download as file"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

export default CaseConverter;
