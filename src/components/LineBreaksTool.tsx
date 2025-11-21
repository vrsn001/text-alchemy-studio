import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const LineBreaksTool = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [charactersPerLine, setCharactersPerLine] = useState(80);

  const addLineBreaks = () => {
    if (!inputText) {
      toast.error("Please enter some text first");
      return;
    }

    const lines: string[] = [];
    let currentLine = "";
    const words = inputText.split(/\s+/);

    for (const word of words) {
      if ((currentLine + word).length <= charactersPerLine) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }

    setOutputText(lines.join("\n"));
    toast.success("Line breaks added successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <Card className="p-6 bg-card shadow-lg transition-m3 hover:shadow-xl animate-fade-in">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">Add Line Breaks</h3>
        <p className="text-sm text-muted-foreground">
          Insert line breaks at specific character intervals for better formatting
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input" className="text-sm font-medium text-foreground">
            Input Text
          </Label>
          <Textarea
            id="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[150px] resize-none bg-input border-border focus:ring-2 focus:ring-ring transition-m3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chars" className="text-sm font-medium text-foreground">
            Characters per Line
          </Label>
          <Input
            id="chars"
            type="number"
            min="10"
            max="200"
            value={charactersPerLine}
            onChange={(e) => setCharactersPerLine(Number(e.target.value))}
            className="bg-input border-border focus:ring-2 focus:ring-ring transition-m3"
          />
          <p className="text-xs text-muted-foreground">
            Text will be wrapped at approximately {charactersPerLine} characters per line
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={addLineBreaks}
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground transition-m3 shadow-md"
          >
            Add Line Breaks
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            size="icon"
            className="transition-m3"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {outputText && (
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="output" className="text-sm font-medium text-foreground">
              Output Text
            </Label>
            <div className="relative">
              <Textarea
                id="output"
                value={outputText}
                readOnly
                className="min-h-[150px] resize-none bg-muted border-border"
              />
              <Button
                onClick={handleCopy}
                size="icon"
                variant="outline"
                className="absolute top-2 right-2 transition-m3"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
