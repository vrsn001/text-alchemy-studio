import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download, Undo2, Redo2, Trash2, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerHaptic } from "@/utils/haptics";
import { saveToolState, loadToolState } from "@/utils/storage";
import { downloadAsText } from "@/utils/download";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EnhancedTextToolCardProps {
  title: string;
  description: string;
  toolId: string;
  transformFunction: (input: string) => string;
  buttonText?: string;
  liveUpdate?: boolean;
  downloadFilename?: string;
}

export const EnhancedTextToolCard = ({
  title,
  description,
  toolId,
  transformFunction,
  buttonText = "Transform",
  liveUpdate = false,
  downloadFilename = "output.txt",
}: EnhancedTextToolCardProps) => {
  const { state: inputValue, setState: setInputValue, undo, redo, canUndo, canRedo, reset } = useUndoRedo(loadToolState(toolId));
  const [outputValue, setOutputValue] = useState("");
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  // Live update effect
  useEffect(() => {
    if (liveUpdate && inputValue) {
      const timer = setTimeout(() => {
        setOutputValue(transformFunction(inputValue));
      }, 300); // Debounce for performance

      return () => clearTimeout(timer);
    }
  }, [inputValue, liveUpdate, transformFunction]);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToolState(toolId, inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, toolId]);

  const handleTransform = useCallback(() => {
    if (!inputValue.trim()) {
      setOutputValue("");
      return;
    }
    setIsTransforming(true);
    triggerHaptic('light');
    
    // Brief delay to show transformation feedback
    setTimeout(() => {
      setOutputValue(transformFunction(inputValue));
      setIsTransforming(false);
      triggerHaptic('success');
    }, 150);
  }, [inputValue, transformFunction]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outputValue);
      setCopied(true);
      triggerHaptic('success');
      toast.success("Copied to clipboard!", { duration: 2000 });
      
      // Reset copied state after animation
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [outputValue]);

  const handleDownload = () => {
    downloadAsText(outputValue, downloadFilename);
    triggerHaptic('light');
    toast.success("Downloaded successfully!");
  };

  const handleClear = () => {
    setShowClearDialog(true);
  };

  const confirmClear = () => {
    setInputValue("");
    setOutputValue("");
    reset();
    triggerHaptic('medium');
    toast.success("Cleared!");
    setShowClearDialog(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      >
        <Card className="p-6 bg-card shadow-lg transition-all duration-300 hover:shadow-xl border border-border/50 backdrop-blur-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-4">
            {/* Input Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Input Text</label>
                <div className="flex gap-1">
                  <Button
                    onClick={undo}
                    disabled={!canUndo}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 transition-m3"
                    title="Undo"
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={redo}
                    disabled={!canRedo}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 transition-m3"
                    title="Redo"
                  >
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[120px] resize-none bg-input border-border focus:ring-2 focus:ring-ring transition-m3"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!liveUpdate && (
                <Button
                  onClick={handleTransform}
                  disabled={isTransforming || !inputValue.trim()}
                  className={cn(
                    "flex-1 bg-primary hover:bg-primary-hover text-primary-foreground transition-all duration-200 shadow-md relative overflow-hidden group",
                    isTransforming && "animate-success-pulse"
                  )}
                >
                  <motion.span 
                    className="relative z-10 flex items-center gap-2"
                    animate={isTransforming ? { scale: [1, 1.05, 1] } : {}}
                  >
                    {isTransforming && <Sparkles className="h-4 w-4 animate-wiggle" />}
                    {buttonText}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-primary-foreground/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </Button>
              )}
              <Button
                onClick={handleClear}
                variant="outline"
                size="icon"
                className="transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground active:scale-95"
                title="Clear all"
                aria-label="Clear all text"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Output Section */}
            <AnimatePresence>
              {outputValue && (
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
                      value={outputValue}
                      readOnly
                      className="min-h-[120px] resize-none bg-muted border-border"
                    />
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <Button
                        onClick={handleCopy}
                        size="icon"
                        variant="outline"
                        className={cn(
                          "transition-all duration-200 bg-background/90 backdrop-blur-sm hover:bg-background active:scale-95",
                          copied && "bg-green-500/10 border-green-500/50 text-green-600"
                        )}
                        title="Copy to clipboard"
                        aria-label="Copy to clipboard"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 45 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Copy className="h-4 w-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                      <Button
                        onClick={handleDownload}
                        size="icon"
                        variant="outline"
                        className="transition-all duration-200 bg-background/90 backdrop-blur-sm hover:bg-background active:scale-95"
                        title="Download as file"
                        aria-label="Download as file"
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

      {/* Clear Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all text?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear both input and output text. This action cannot be undone beyond the undo history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClear} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Clear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
