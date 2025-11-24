import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WORD_LIST = [
  "apple", "banana", "cherry", "dragon", "elephant", "forest", "guitar", "horizon",
  "island", "journey", "kitchen", "laptop", "mountain", "network", "ocean", "passport",
  "quantum", "rainbow", "satellite", "thunder", "umbrella", "volcano", "whisper", "xylophone",
  "yellow", "zenith", "abstract", "balance", "creative", "dynamic", "elegant", "flexible",
  "genuine", "harmony", "inspire", "justice", "knowledge", "liberty", "miracle", "natural",
  "opportunity", "peaceful", "quality", "reliable", "secure", "trust", "unity", "victory",
  "wisdom", "amazing", "brilliant", "courage", "delight", "energy", "freedom", "graceful",
  "happiness", "imagine", "joyful", "kindness", "laughter", "memories", "nostalgic", "optimism"
];

const RandomWords = () => {
  const [wordCount, setWordCount] = useState(10);
  const [outputText, setOutputText] = useState("");

  const generateWords = () => {
    const count = Math.max(1, Math.min(100, wordCount));
    const words: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
      words.push(WORD_LIST[randomIndex]);
    }
    
    setOutputText(words.join(", "));
    toast.success(`Generated ${count} random words!`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setOutputText("");
    setWordCount(10);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/#text-tools" },
          { label: "Random Word Generator" }
        ]} />

        <Card className="p-6 bg-card shadow-lg">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Random Word Generator</h1>
            <p className="text-muted-foreground">Generate a list of random words for brainstorming and creative projects.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Number of Words</label>
              <Input
                type="number"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value) || 1)}
                min="1"
                max="100"
                className="max-w-xs"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={generateWords}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Words
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
              >
                Clear
              </Button>
            </div>

            {outputText && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Generated Words</label>
                <div className="relative">
                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-[200px] resize-none bg-muted"
                  />
                  <Button
                    onClick={handleCopy}
                    size="icon"
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default RandomWords;
