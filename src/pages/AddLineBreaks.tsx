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
import { Label } from "@/components/ui/label";
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

                <RadioGroup value={mode} onValueChange={setMode} className="mb-4">
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
                  
                  <div className="flex items-start space-x-2 mb-3">
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

                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem value="urls" id="urls" />
                    <div className="flex-1">
                      <Label htmlFor="urls" className="font-semibold cursor-pointer">
                        Break after each URL
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        (extract and list all URLs on separate lines)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="each-line" id="each-line" />
                    <div className="flex-1">
                      <Label htmlFor="each-line" className="font-semibold cursor-pointer">
                        Add extra line break after each line
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        (double-space existing lines)
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex items-center space-x-2 mb-6 p-3 rounded-lg bg-muted/50 border border-border">
                  <Checkbox 
                    id="addNumbers" 
                    checked={addNumbers} 
                    onCheckedChange={(checked) => setAddNumbers(checked === true)}
                  />
                  <div className="flex items-center gap-2">
                    <ListOrdered className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="addNumbers" className="cursor-pointer font-medium">
                      Add numbers in front of each line/URL
                    </Label>
                  </div>
                </div>

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

            <AnimatePresence>
              {outputText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="p-6 backdrop-blur-sm border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        Text with Newly Added Line Breaks
                      </h2>
                      <Tabs value={outputView} onValueChange={(v) => setOutputView(v as "preview" | "raw")}>
                        <TabsList className="h-9">
                          <TabsTrigger value="preview" className="gap-1.5 text-xs px-3">
                            <Eye className="h-3.5 w-3.5" />
                            Preview
                          </TabsTrigger>
                          <TabsTrigger value="raw" className="gap-1.5 text-xs px-3">
                            <Code className="h-3.5 w-3.5" />
                            Raw
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {outputView === "preview" ? (
                      <div className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 rounded-lg bg-muted/50 border border-border mb-4 text-foreground leading-relaxed whitespace-pre-wrap">
                        {renderTextWithLinks}
                      </div>
                    ) : (
                      <Textarea
                        value={outputText}
                        readOnly
                        className="min-h-[200px] mb-4 bg-muted/50"
                      />
                    )}

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleCopy} 
                        variant="outline"
                        className="transition-all duration-200 active:scale-95"
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
                              <Check className="h-4 w-4 text-green-600" />
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
                              Copy to Clipboard
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                      <Button 
                        onClick={handleDownload} 
                        variant="outline"
                        className="transition-all duration-200 active:scale-95"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download New Text
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
