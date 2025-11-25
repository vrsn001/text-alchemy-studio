import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { triggerHaptic } from "@/utils/haptics";
import { downloadAsText } from "@/utils/download";

const AddLineBreaks = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("paragraph");

  const handleAddLineBreaks = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first.");
      return;
    }

    let result = "";
    if (mode === "paragraph") {
      result = inputText.replace(/\n/g, "\n\n");
    } else {
      result = inputText.replace(/\.\s+/g, ".\n\n");
    }

    setOutputText(result);
    triggerHaptic('light');
    toast.success("Line breaks added successfully!");
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    triggerHaptic('success');
    toast.success("Text copied to clipboard!");
  };

  const handleDownload = () => {
    if (!outputText) return;
    downloadAsText(outputText, "text-with-line-breaks.txt");
    triggerHaptic('light');
    toast.success("Text file downloaded successfully!");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    triggerHaptic('medium');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Tools", href: "/" },
                { label: "Add Line Breaks" }
              ]} 
            />
            
            <motion.h1 
              className="text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Add Line Breaks
            </motion.h1>
            
            <motion.p 
              className="text-lg text-foreground leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              This free online tool will <strong>add line breaks</strong> to any broken text you have. 
              Scrunched-up text will instantly become more readable using this add line breaks tool.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 mb-8 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Add Line Breaks Tool
                </h2>
                
                <p className="text-foreground mb-4">
                  Choose how you want linebreaks added to your text using the options below.
                </p>

                <RadioGroup value={mode} onValueChange={setMode} className="mb-6">
                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem value="paragraph" id="paragraph" />
                    <div className="flex-1">
                      <Label htmlFor="paragraph" className="font-semibold cursor-pointer">
                        Convert line breaks to paragraph breaks
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        (for text containing single line breaks)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="sentence" id="sentence" />
                    <div className="flex-1">
                      <Label htmlFor="sentence" className="font-semibold cursor-pointer">
                        Add a paragraph break after sentences
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        (for text with absolutely no line breaks)
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here..."
                  className="min-h-[200px] mb-4"
                />

                <div className="flex gap-3">
                  <Button onClick={handleAddLineBreaks} className="bg-primary hover:bg-primary-hover">
                    Add Line Breaks
                  </Button>
                  <Button onClick={handleClear} variant="outline">
                    Clear
                  </Button>
                </div>
              </Card>
            </motion.div>

            {outputText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 backdrop-blur-sm border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Text with Newly Added Line Breaks
                  </h2>

                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-[200px] mb-4 bg-muted/50"
                  />

                  <div className="flex gap-3">
                    <Button onClick={handleCopy} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button onClick={handleDownload} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download New Text
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PageTransition>
  );
};

export default AddLineBreaks;
