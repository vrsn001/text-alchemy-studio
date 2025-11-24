import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TextToolCard } from "@/components/TextToolCard";
import { useState } from "react";

const AlphabeticalOrder = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleAlphabetize = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    const lines = inputText.split("\n").filter(line => line.trim());
    const sorted = lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    setOutputText(sorted.join("\n"));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/#text-tools" },
          { label: "Alphabetical Order" }
        ]} />

        <TextToolCard
          title="Alphabetical Order Tool"
          description="Sort your text content alphabetically. Enter each item on a new line."
          inputValue={inputText}
          outputValue={outputText}
          onInputChange={setInputText}
          onTransform={handleAlphabetize}
          buttonText="Alphabetize"
        />
      </main>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default AlphabeticalOrder;
