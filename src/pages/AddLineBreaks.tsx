import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Copy, Eye, Code, Check, ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { triggerHaptic } from "@/utils/haptics";
import { downloadAsText } from "@/utils/download";

// URL regex pattern to detect links
const URL_REGEX = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;

const AddLineBreaks = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("paragraph");
  const [copied, setCopied] = useState(false);
  const [outputView, setOutputView] = useState<"preview" | "raw">("preview");
  const [addNumbers, setAddNumbers] = useState(false);

  // Parse text and convert URLs to clickable links
  const renderTextWithLinks = useMemo(() => {
    if (!outputText) return null;
    
    const parts = outputText.split(URL_REGEX);
    
    return parts.map((part, index) => {
      if (URL_REGEX.test(part)) {
        // Reset the regex lastIndex
        URL_REGEX.lastIndex = 0;
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover underline underline-offset-2 transition-colors duration-200 break-all"
          >
            {part}
          </a>
        );
      }
      // Preserve line breaks in the text
      return part.split('\n').map((line, lineIndex, arr) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < arr.length - 1 && <br />}
        </span>
      ));
    });
  }, [outputText]);

  const handleAddLineBreaks = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first.");
      return;
    }

    let result = "";
    
    switch (mode) {
      case "paragraph":
        result = inputText.replace(/\n/g, "\n\n");
        break;
      case "sentence":
        result = inputText.replace(/\.\s+/g, ".\n\n");
        break;
      case "urls": {
        // Extract all URLs and separate them with line breaks
        const urls = inputText.match(URL_REGEX) || [];
        const nonUrlText = inputText.replace(URL_REGEX, '\n[URL_PLACEHOLDER]\n');
        const parts = nonUrlText.split('[URL_PLACEHOLDER]');
        
        if (urls.length > 0) {
          // If user only pasted URLs, just list them
          const isOnlyUrls = inputText.trim().split(/\s+/).every(part => URL_REGEX.test(part));
          URL_REGEX.lastIndex = 0;
          
          if (isOnlyUrls || urls.length > parts.filter(p => p.trim()).length) {
            result = urls.map((url, i) => addNumbers ? `${i + 1}. ${url}` : url).join('\n');
          } else {
            // Mix of text and URLs - put URLs on their own lines
            let urlIndex = 0;
            result = parts.map(part => {
              const trimmed = part.trim();
              if (urlIndex < urls.length) {
                const url = urls[urlIndex++];
                return trimmed ? `${trimmed}\n${addNumbers ? `${urlIndex}. ` : ''}${url}` : (addNumbers ? `${urlIndex}. ` : '') + url;
              }
              return trimmed;
            }).filter(Boolean).join('\n');
          }
        } else {
          result = inputText;
          toast.info("No URLs found in the text.");
        }
        break;
      }
      case "each-line":
        result = inputText.split('\n').filter(line => line.trim()).join('\n\n');
        break;
      default:
        result = inputText;
    }

    // If addNumbers is enabled and mode is not 'urls' (which handles it separately), add numbers to each line
    if (addNumbers && mode !== "urls") {
      const lines = result.split('\n').filter(line => line.trim());
      result = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
    }

    setOutputText(result);
    triggerHaptic('light');
    toast.success("Line breaks added successfully!");
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    triggerHaptic('success');
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
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
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Add Line Breaks
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Transform your text instantly — add line breaks, number your lines, and organize URLs with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
            <Card className="p-6 md:p-8 mb-8 elevation-2 bg-card border-0 rounded-2xl">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  Add Line Breaks Tool
                </h2>
                
                <p className="text-muted-foreground text-sm md:text-base mb-6">
                  Choose how you want linebreaks added to your text using the options below.
                </p>

                <div className="space-y-3 mb-6">
                  <RadioGroup value={mode} onValueChange={setMode} className="space-y-2">
                    <label 
                      htmlFor="paragraph" 
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-m3 ${
                        mode === 'paragraph' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                    >
                      <RadioGroupItem value="paragraph" id="paragraph" className="mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium text-foreground block">
                          Convert line breaks to paragraph breaks
                        </span>
                        <span className="text-sm text-muted-foreground">
                          For text containing single line breaks
                        </span>
                      </div>
                    </label>
                    
                    <label 
                      htmlFor="sentence" 
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-m3 ${
                        mode === 'sentence' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                    >
                      <RadioGroupItem value="sentence" id="sentence" className="mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium text-foreground block">
                          Add a paragraph break after sentences
                        </span>
                        <span className="text-sm text-muted-foreground">
                          For text with absolutely no line breaks
                        </span>
                      </div>
                    </label>

                    <label 
                      htmlFor="urls" 
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-m3 ${
                        mode === 'urls' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                    >
                      <RadioGroupItem value="urls" id="urls" className="mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium text-foreground block">
                          Break after each URL
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Extract and list all URLs on separate lines
                        </span>
                      </div>
                    </label>

                    <label 
                      htmlFor="each-line" 
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-m3 ${
                        mode === 'each-line' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                    >
                      <RadioGroupItem value="each-line" id="each-line" className="mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium text-foreground block">
                          Add extra line break after each line
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Double-space existing lines
                        </span>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                <label 
                  htmlFor="addNumbers"
                  className={`flex items-center gap-3 p-4 mb-6 rounded-xl border-2 cursor-pointer transition-m3 ${
                    addNumbers 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <Checkbox 
                    id="addNumbers" 
                    checked={addNumbers} 
                    onCheckedChange={(checked) => setAddNumbers(checked === true)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <ListOrdered className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">
                    Add numbers in front of each line/URL
                  </span>
                </label>

                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here..."
                  className="min-h-[180px] mb-5 rounded-xl border-2 border-border focus:border-primary bg-background resize-y text-base"
                />

                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddLineBreaks} 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-11 font-medium elevation-1 transition-m3 active:scale-[0.98]"
                  >
                    Add Line Breaks
                  </Button>
                  <Button 
                    onClick={handleClear} 
                    variant="outline"
                    className="rounded-full px-6 h-11 font-medium border-2 hover:bg-accent transition-m3 active:scale-[0.98]"
                  >
                    Clear
                  </Button>
                </div>
              </Card>
            </motion.div>

            <AnimatePresence>
              {outputText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="p-6 md:p-8 elevation-2 bg-card border-0 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                        Output
                      </h2>
                      <Tabs value={outputView} onValueChange={(v) => setOutputView(v as "preview" | "raw")}>
                        <TabsList className="h-10 p-1 bg-muted/30 rounded-full">
                          <TabsTrigger 
                            value="preview" 
                            className="gap-1.5 text-sm px-4 rounded-full data-[state=active]:bg-card data-[state=active]:elevation-1"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </TabsTrigger>
                          <TabsTrigger 
                            value="raw" 
                            className="gap-1.5 text-sm px-4 rounded-full data-[state=active]:bg-card data-[state=active]:elevation-1"
                          >
                            <Code className="h-4 w-4" />
                            Raw
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {outputView === "preview" ? (
                      <div className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 md:p-5 rounded-xl bg-background border-2 border-border mb-5 text-foreground leading-relaxed whitespace-pre-wrap font-mono text-sm">
                        {renderTextWithLinks}
                      </div>
                    ) : (
                      <Textarea
                        value={outputText}
                        readOnly
                        className="min-h-[200px] mb-5 rounded-xl border-2 border-border bg-background font-mono text-sm"
                      />
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Button 
                        onClick={handleCopy} 
                        variant="outline"
                        className="rounded-full px-5 h-10 font-medium border-2 hover:bg-accent transition-m3 active:scale-[0.98]"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="h-4 w-4 text-primary" />
                              Copied!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                      <Button 
                        onClick={handleDownload} 
                        variant="outline"
                        className="rounded-full px-5 h-10 font-medium border-2 hover:bg-accent transition-m3 active:scale-[0.98]"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
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
