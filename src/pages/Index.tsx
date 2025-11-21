import { useState } from "react";
import { Header } from "@/components/Header";
import { TextToolCard } from "@/components/TextToolCard";
import { StatsCard } from "@/components/StatsCard";
import { LineBreaksTool } from "@/components/LineBreaksTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Type, Sparkles, Wrench, ArrowDownAZ } from "lucide-react";

const Index = () => {
  const [uppercaseInput, setUppercaseInput] = useState("");
  const [uppercaseOutput, setUppercaseOutput] = useState("");

  const [lowercaseInput, setLowercaseInput] = useState("");
  const [lowercaseOutput, setLowercaseOutput] = useState("");

  const [titleInput, setTitleInput] = useState("");
  const [titleOutput, setTitleOutput] = useState("");

  const [sentenceInput, setSentenceInput] = useState("");
  const [sentenceOutput, setSentenceOutput] = useState("");

  const [reverseInput, setReverseInput] = useState("");
  const [reverseOutput, setReverseOutput] = useState("");

  const [trimInput, setTrimInput] = useState("");
  const [trimOutput, setTrimOutput] = useState("");

  const [sortInput, setSortInput] = useState("");
  const [sortOutput, setSortOutput] = useState("");

  const [removeBreaksInput, setRemoveBreaksInput] = useState("");
  const [removeBreaksOutput, setRemoveBreaksOutput] = useState("");

  const toUpperCase = () => setUppercaseOutput(uppercaseInput.toUpperCase());
  const toLowerCase = () => setLowercaseOutput(lowercaseInput.toLowerCase());
  
  const toTitleCase = () => {
    const result = titleInput.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    setTitleOutput(result);
  };

  const toSentenceCase = () => {
    const result = sentenceInput.toLowerCase().replace(/(^\w|\.\s+\w)/gm, (char) => char.toUpperCase());
    setSentenceOutput(result);
  };

  const reverseText = () => setReverseOutput(reverseInput.split("").reverse().join(""));

  const trimSpaces = () => {
    const result = trimInput.replace(/\s+/g, " ").trim();
    setTrimOutput(result);
  };

  const sortLines = () => {
    const lines = sortInput.split("\n");
    const sorted = lines.sort().join("\n");
    setSortOutput(sorted);
  };

  const removeLineBreaks = () => {
    const result = removeBreaksInput.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    setRemoveBreaksOutput(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-2 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl mb-6 shadow-lg border border-primary/20">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight leading-tight">
              Transform Your Text
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful text manipulation tools at your fingertips - all in one place
            </p>
          </div>

          {/* Featured Tool - Line Breaks */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Featured Tool</h3>
            </div>
            <LineBreaksTool />
          </div>

          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-muted/50 backdrop-blur-sm p-1.5 h-auto gap-1">
              <TabsTrigger value="stats" className="transition-m3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Statistics</span>
              </TabsTrigger>
              <TabsTrigger value="case" className="transition-m3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
                <Type className="h-4 w-4" />
                <span className="hidden sm:inline">Case</span>
              </TabsTrigger>
              <TabsTrigger value="transform" className="transition-m3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Transform</span>
              </TabsTrigger>
              <TabsTrigger value="format" className="transition-m3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
                <Wrench className="h-4 w-4" />
                <span className="hidden sm:inline">Format</span>
              </TabsTrigger>
              <TabsTrigger value="sort" className="transition-m3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
                <ArrowDownAZ className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <StatsCard />
            </TabsContent>

            <TabsContent value="case" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <TextToolCard
                  title="UPPERCASE"
                  description="Convert all text to uppercase letters"
                  inputValue={uppercaseInput}
                  outputValue={uppercaseOutput}
                  onInputChange={setUppercaseInput}
                  onTransform={toUpperCase}
                  buttonText="Convert to Uppercase"
                />
                <TextToolCard
                  title="lowercase"
                  description="Convert all text to lowercase letters"
                  inputValue={lowercaseInput}
                  outputValue={lowercaseOutput}
                  onInputChange={setLowercaseInput}
                  onTransform={toLowerCase}
                  buttonText="Convert to Lowercase"
                />
                <TextToolCard
                  title="Title Case"
                  description="Capitalize the first letter of each word"
                  inputValue={titleInput}
                  outputValue={titleOutput}
                  onInputChange={setTitleInput}
                  onTransform={toTitleCase}
                  buttonText="Convert to Title Case"
                />
                <TextToolCard
                  title="Sentence case"
                  description="Capitalize the first letter of each sentence"
                  inputValue={sentenceInput}
                  outputValue={sentenceOutput}
                  onInputChange={setSentenceInput}
                  onTransform={toSentenceCase}
                  buttonText="Convert to Sentence Case"
                />
              </div>
            </TabsContent>

            <TabsContent value="transform" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <TextToolCard
                  title="Reverse Text"
                  description="Reverse the order of characters in your text"
                  inputValue={reverseInput}
                  outputValue={reverseOutput}
                  onInputChange={setReverseInput}
                  onTransform={reverseText}
                  buttonText="Reverse Text"
                />
                <TextToolCard
                  title="Remove Line Breaks"
                  description="Remove all line breaks and extra spaces"
                  inputValue={removeBreaksInput}
                  outputValue={removeBreaksOutput}
                  onInputChange={setRemoveBreaksInput}
                  onTransform={removeLineBreaks}
                  buttonText="Remove Line Breaks"
                />
              </div>
            </TabsContent>

            <TabsContent value="format" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <TextToolCard
                  title="Trim Extra Spaces"
                  description="Remove extra spaces between words"
                  inputValue={trimInput}
                  outputValue={trimOutput}
                  onInputChange={setTrimInput}
                  onTransform={trimSpaces}
                  buttonText="Trim Spaces"
                />
              </div>
            </TabsContent>

            <TabsContent value="sort" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <TextToolCard
                  title="Sort Lines Alphabetically"
                  description="Sort lines of text in alphabetical order"
                  inputValue={sortInput}
                  outputValue={sortOutput}
                  onInputChange={setSortInput}
                  onTransform={sortLines}
                  buttonText="Sort Lines"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-20 py-12 bg-gradient-to-r from-card via-surface-2 to-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="p-2 bg-primary/10 rounded-xl animate-float">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">TextCraft</span>
            </div>
            <p className="text-muted-foreground">
              Made with creative fuel ⚡ by TextCraft
            </p>
            <p className="text-sm text-muted-foreground/70">
              Transform, format, and enhance your text with ease
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
