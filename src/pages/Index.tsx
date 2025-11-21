import { useState } from "react";
import { Header } from "@/components/Header";
import { TextToolCard } from "@/components/TextToolCard";
import { StatsCard } from "@/components/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Transform Your Text
            </h2>
            <p className="text-muted-foreground">
              Powerful text manipulation tools at your fingertips
            </p>
          </div>

          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8 bg-muted">
              <TabsTrigger value="stats" className="transition-m3">Statistics</TabsTrigger>
              <TabsTrigger value="case" className="transition-m3">Case</TabsTrigger>
              <TabsTrigger value="transform" className="transition-m3">Transform</TabsTrigger>
              <TabsTrigger value="format" className="transition-m3">Format</TabsTrigger>
              <TabsTrigger value="sort" className="transition-m3">Sort</TabsTrigger>
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

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Made with creative fuel ⚡ by TextCraft</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
