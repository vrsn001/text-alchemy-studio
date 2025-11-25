import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, Download, Undo2, Redo2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerHaptic } from "@/utils/haptics";
import { saveToolState, loadToolState } from "@/utils/storage";
import { downloadAsText } from "@/utils/download";
import { useUndoRedo } from "@/hooks/useUndoRedo";
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

  const handleTransform = () => {
    if (!inputValue.trim()) {
      setOutputValue("");
      return;
    }
    triggerHaptic('light');
    setOutputValue(transformFunction(inputValue));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputValue);
      triggerHaptic('success');
      toast.success("Copied to clipboard!", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

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
                  className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground transition-m3 shadow-md relative overflow-hidden group"
                >
                  <span className="relative z-10">{buttonText}</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
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
                className="transition-m3 hover:bg-destructive hover:text-destructive-foreground"
                title="Clear all"
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
