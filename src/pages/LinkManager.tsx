// Link Manager Tool Page
// Full-featured URL validation, duplicate detection, and management

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { GradientBorderCard } from "@/components/ui/gradient-border-card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link2, 
  ScanSearch, 
  Sparkles as SparklesIcon,
  AlertCircle,
  List,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { triggerHaptic } from "@/utils/haptics";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";
import { Sparkles } from "@/components/ui/sparkles";

import { useURLParser } from "@/hooks/useURLParser";
import { URLStats } from "@/components/link-manager/URLStats";
import { URLList } from "@/components/link-manager/URLList";
import { BulkActions } from "@/components/link-manager/BulkActions";
import { urlsToText } from "@/utils/urlParser";

const LinkManager = () => {
  const [inputText, setInputText] = useState("");
  const [normalizeForDuplicates, setNormalizeForDuplicates] = useState(true);
  const [stripUtm, setStripUtm] = useState(true);
  const [outputView, setOutputView] = useState<"list" | "text">("list");
  
  const {
    result,
    urls,
    isProcessing,
    progress,
    progressMessage,
    error,
    parse,
    removeDuplicatesAction,
    fixAllSchemesAction,
    removeUrl,
    fixUrl,
    clear
  } = useURLParser({
    normalizeForDuplicates,
    stripUtm
  });
  
  const handleParse = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter some text with URLs");
      return;
    }
    
    triggerHaptic('light');
    parse(inputText);
    toast.success("Parsing URLs...");
  }, [inputText, parse]);
  
  const handleClear = useCallback(() => {
    setInputText("");
    clear();
    triggerHaptic('medium');
  }, [clear]);
  
  const handleSort = useCallback((type: 'alphabetical' | 'domain') => {
    toast.success(`Sorted by ${type}`);
  }, []);
  
  const outputText = urlsToText(urls);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden relative">
        <MeshGradientBackground />
        
        {/* Sparkles background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Sparkles color="#a855f7" density={80} speed={0.4} opacity={0.3} size={1.2} />
        </div>
        
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Tools", href: "/" },
                { label: "Link Manager" }
              ]} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center gap-3">
                <Link2 className="h-10 w-10 text-purple-500" />
                Link Manager
              </h1>
              <p className="text-lg text-foreground leading-relaxed">
                Validate, detect duplicates, and manage URLs in bulk. Paste text with links below to get started.
              </p>
            </motion.div>
            
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GradientBorderCard variant="purple" className="mb-6">
                <LiquidGlassCard blur="xl" className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <ScanSearch className="h-6 w-6" />
                    Input Text
                  </h2>
                  
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text with URLs here...&#10;&#10;Example:&#10;Check out https://example.com and www.google.com&#10;Also visit bit.ly/example"
                    className="min-h-[200px] mb-4 font-mono text-sm bg-background/50 backdrop-blur-sm border-border/50"
                  />
                  
                  {/* Options */}
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="normalize"
                        checked={normalizeForDuplicates}
                        onCheckedChange={setNormalizeForDuplicates}
                      />
                      <Label htmlFor="normalize" className="text-sm cursor-pointer">
                        Normalize URLs for duplicate detection
                      </Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        id="stripUtm"
                        checked={stripUtm}
                        onCheckedChange={setStripUtm}
                      />
                      <Label htmlFor="stripUtm" className="text-sm cursor-pointer">
                        Strip UTM parameters
                      </Label>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <Progress value={progress} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">{progressMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2 text-destructive"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleParse} 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300"
                      disabled={isProcessing}
                    >
                      <SparklesIcon className="h-4 w-4 mr-2" />
                      {isProcessing ? "Processing..." : "Parse URLs"}
                    </Button>
                    <Button 
                      onClick={handleClear} 
                      variant="outline"
                      className="backdrop-blur-sm border-border/50 hover:bg-accent/50"
                      disabled={isProcessing}
                    >
                      Clear
                    </Button>
                  </div>
                </LiquidGlassCard>
              </GradientBorderCard>
            </motion.div>
            
            {/* Results Section */}
            <AnimatePresence>
              {result && result.totalCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Stats */}
                  <GradientBorderCard variant="pink" className="mb-6">
                    <LiquidGlassCard blur="lg" className="p-6">
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        URL Analysis Results
                      </h2>
                      <URLStats result={result} />
                    </LiquidGlassCard>
                  </GradientBorderCard>
                  
                  {/* URL List / Text View */}
                  <GradientBorderCard variant="purple">
                    <LiquidGlassCard blur="lg" className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-foreground">
                          Detected URLs
                        </h2>
                        <Tabs value={outputView} onValueChange={(v) => setOutputView(v as "list" | "text")}>
                          <TabsList className="h-9 bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                            <TabsTrigger value="list" className="gap-1.5 text-xs px-3">
                              <List className="h-3.5 w-3.5" />
                              List
                            </TabsTrigger>
                            <TabsTrigger value="text" className="gap-1.5 text-xs px-3">
                              <FileText className="h-3.5 w-3.5" />
                              Text
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                      
                      {outputView === "list" ? (
                        <URLList
                          urls={urls}
                          onFix={fixUrl}
                          onRemove={removeUrl}
                        />
                      ) : (
                        <Textarea
                          value={outputText}
                          readOnly
                          className="min-h-[300px] font-mono text-sm bg-background/50 backdrop-blur-sm border-border/50"
                        />
                      )}
                    </LiquidGlassCard>
                  </GradientBorderCard>
                  
                  {/* Bulk Actions */}
                  <BulkActions
                    urls={urls}
                    onRemoveDuplicates={removeDuplicatesAction}
                    onFixAllSchemes={fixAllSchemesAction}
                    onSort={handleSort}
                    isProcessing={isProcessing}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Empty State */}
            {result && result.totalCount === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Link2 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No URLs Found</h3>
                <p className="text-muted-foreground">
                  The text you entered doesn't contain any detectable URLs.
                </p>
              </motion.div>
            )}
          </div>
        </main>
        
        <Footer />
        <BottomNav />
        
      </div>
    </PageTransition>
  );
};

export default LinkManager;