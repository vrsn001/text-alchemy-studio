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
      // Convert single line breaks to paragraph breaks (double line breaks)
      result = inputText.replace(/\n/g, "\n\n");
    } else {
      // Add paragraph break after sentences (detect periods followed by space)
      result = inputText.replace(/\.\s+/g, ".\n\n");
    }

    setOutputText(result);
    toast.success("Line breaks added successfully!");
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast.success("Text copied to clipboard!");
  };

  const handleDownload = () => {
    if (!outputText) return;
    
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text-with-line-breaks.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Text file downloaded successfully!");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
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
          
          <h1 className="text-4xl font-bold text-primary mb-4">
            Add Line Breaks
          </h1>
          
          <p className="text-lg text-foreground leading-relaxed mb-6">
            This free online tool will <strong>add line breaks</strong> to any broken text you have. 
            Scrunched-up text will instantly become more readable using this add line breaks tool.
          </p>

          <p className="text-foreground leading-relaxed mb-8">
            Paste your text into the box below and it will transform your text by adding additional 
            line breaks where they're needed in your content.
          </p>

          <Card className="p-6 mb-8">
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

            <p className="text-foreground mb-4">
              Paste your text in the box below and then click the <strong>Add Line Breaks</strong> button.
            </p>

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

          {outputText && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Text with Newly Added Line Breaks
              </h2>
              
              <p className="text-foreground mb-4">
                Copy your new text with newly added line breaks from the box below.
              </p>

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
          )}

          <div className="mt-12 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">
                How the Add Line Breaks Tool Works
              </h3>
              <p className="text-foreground leading-relaxed">
                This tool takes broken text (text without proper paragraph breaks) and tries to format 
                that text into something a bit more readable. It finds a single newline and transforms 
                that into a double newline so that we now have a properly spaced paragraph.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">
                When to Use This Tool
              </h3>
              <p className="text-foreground leading-relaxed">
                This tool is perfect for fixing text that has been copied from PDFs, emails, or other 
                sources where the formatting has been lost. It's also useful for adding consistent 
                spacing between paragraphs in your content.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default AddLineBreaks;
