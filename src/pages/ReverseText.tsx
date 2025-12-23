import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EnhancedTextToolCard } from "@/components/EnhancedTextToolCard";
import { PageTransition } from "@/components/PageTransition";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";

const ReverseText = () => {
  const transformFunction = (input: string): string => {
    if (!input.trim()) return "";
    return input.split("").reverse().join("");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden relative">
        <MeshGradientBackground />
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl">
          <Breadcrumb items={[
            { label: "Tools", href: "/#text-tools" },
            { label: "Reverse Text" }
          ]} />

          <EnhancedTextToolCard
            title="Reverse Text Tool"
            description="Reverse all characters in your text to create backwards text."
            toolId="reverse-text"
            transformFunction={transformFunction}
            buttonText="Reverse Text"
            liveUpdate={true}
            downloadFilename="reversed-text.txt"
          />
        </main>

        <Footer />
        <BottomNav />
        <FAB />
      </div>
    </PageTransition>
  );
};

export default ReverseText;
