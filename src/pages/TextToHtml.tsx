import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EnhancedTextToolCard } from "@/components/EnhancedTextToolCard";
import { PageTransition } from "@/components/PageTransition";

const TextToHtml = () => {
  const transformFunction = (input: string): string => {
    if (!input.trim()) return "";
    const paragraphs = input
      .split("\n")
      .filter(line => line.trim())
      .map(line => `<p>${line.trim()}</p>`)
      .join("\n");
    return paragraphs;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
          <Breadcrumb items={[
            { label: "Tools", href: "/#html-tools" },
            { label: "Text to HTML" }
          ]} />

          <EnhancedTextToolCard
            title="Text to HTML Converter"
            description="Automatically convert plain text into HTML paragraph tags."
            toolId="text-to-html"
            transformFunction={transformFunction}
            buttonText="Convert to HTML"
            liveUpdate={true}
            downloadFilename="html-output.html"
          />
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PageTransition>
  );
};

export default TextToHtml;
