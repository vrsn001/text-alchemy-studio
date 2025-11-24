import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CaseType = "upper" | "lower" | "title" | "sentence";

const CaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const convertToUpperCase = () => {
    if (!inputText.trim()) return;
    setOutputText(inputText.toUpperCase());
    setActiveCase("upper");
    toast.success("Converted to UPPERCASE");
  };

  const convertToLowerCase = () => {
    if (!inputText.trim()) return;
    setOutputText(inputText.toLowerCase());
    setActiveCase("lower");
    toast.success("Converted to lowercase");
  };

  const convertToTitleCase = () => {
    if (!inputText.trim()) return;
    const titleCase = inputText
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setOutputText(titleCase);
    setActiveCase("title");
    toast.success("Converted to Title Case");
  };

  const convertToSentenceCase = () => {
    if (!inputText.trim()) return;
    const sentenceCase = inputText
      .toLowerCase()
      .replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    setOutputText(sentenceCase);
    setActiveCase("sentence");
    toast.success("Converted to Sentence case");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setActiveCase(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/#text-tools" },
          { label: "Case Converter" }
        ]} />

        <Card className="p-6 bg-card shadow-lg">
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
              <Button
                onClick={convertToUpperCase}
                variant={activeCase === "upper" ? "default" : "outline"}
                className="transition-all"
              >
                UPPERCASE
              </Button>
              <Button
                onClick={convertToLowerCase}
                variant={activeCase === "lower" ? "default" : "outline"}
                className="transition-all"
              >
                lowercase
              </Button>
              <Button
                onClick={convertToTitleCase}
                variant={activeCase === "title" ? "default" : "outline"}
                className="transition-all"
              >
                Title Case
              </Button>
              <Button
                onClick={convertToSentenceCase}
                variant={activeCase === "sentence" ? "default" : "outline"}
                className="transition-all"
              >
                Sentence case
              </Button>
            </div>

            <Button
              onClick={handleClear}
              variant="outline"
              size="icon"
              className="transition-all"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            {outputText && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Output Text</label>
                <div className="relative">
                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-[150px] resize-none bg-muted"
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

export default CaseConverter;
