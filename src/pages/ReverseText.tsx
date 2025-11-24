import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TextToolCard } from "@/components/TextToolCard";
import { useState } from "react";

const ReverseText = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleReverse = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    const reversed = inputText.split("").reverse().join("");
    setOutputText(reversed);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/#text-tools" },
          { label: "Reverse Text" }
        ]} />

        <TextToolCard
          title="Reverse Text Tool"
          description="Reverse all characters in your text to create backwards text."
          inputValue={inputText}
          outputValue={outputText}
          onInputChange={setInputText}
          onTransform={handleReverse}
          buttonText="Reverse Text"
        />
      </main>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default ReverseText;
