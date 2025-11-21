import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface TextToolCardProps {
  title: string;
  description: string;
  inputValue: string;
  outputValue: string;
  onInputChange: (value: string) => void;
  onTransform: () => void;
  buttonText: string;
}

export const TextToolCard = ({
  title,
  description,
  inputValue,
  outputValue,
  onInputChange,
  onTransform,
  buttonText,
}: TextToolCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(outputValue);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    onInputChange("");
  };

  return (
    <Card className="p-6 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Input Text</label>
          <Textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[120px] resize-none bg-input border-border focus:ring-2 focus:ring-ring transition-m3"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onTransform}
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground transition-m3 shadow-md"
          >
            {buttonText}
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

        {outputValue && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Output Text</label>
            <div className="relative">
              <Textarea
                value={outputValue}
                readOnly
                className="min-h-[120px] resize-none bg-muted border-border"
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
