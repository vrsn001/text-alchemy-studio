import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

import { Breadcrumb } from "@/components/Breadcrumb";
import { EnhancedTextToolCard } from "@/components/EnhancedTextToolCard";
import { PageTransition } from "@/components/PageTransition";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";
import { Sparkles } from "@/components/ui/sparkles";

const ReverseText = () => {
  const transformFunction = (input: string): string => {
    if (!input.trim()) return "";
    return input.split("").reverse().join("");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden relative">
        <MeshGradientBackground />
        
        {/* Sparkles background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Sparkles color="#a855f7" density={80} speed={0.4} opacity={0.3} size={1.2} />
        </div>
        
        <Header />
        
        <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-4xl relative z-10">
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
        
      </div>
    </PageTransition>
  );
};

export default ReverseText;
