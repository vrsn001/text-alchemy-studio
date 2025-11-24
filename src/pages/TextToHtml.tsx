import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TextToolCard } from "@/components/TextToolCard";
import { useState } from "react";

const TextToHtml = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    const paragraphs = inputText
      .split("\n")
      .filter(line => line.trim())
      .map(line => `<p>${line.trim()}</p>`)
      .join("\n");
    
    setOutputText(paragraphs);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/#html-tools" },
          { label: "Text to HTML" }
        ]} />

        <TextToolCard
          title="Text to HTML Converter"
          description="Automatically convert plain text into HTML paragraph tags."
          inputValue={inputText}
          outputValue={outputText}
          onInputChange={setInputText}
          onTransform={handleConvert}
          buttonText="Convert to HTML"
        />
      </main>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default TextToHtml;
