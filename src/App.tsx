import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import Index from "./pages/Index";
import AddLineBreaks from "./pages/AddLineBreaks";
import RandomWords from "./pages/RandomWords";
import AlphabeticalOrder from "./pages/AlphabeticalOrder";
import ReverseText from "./pages/ReverseText";
import TextToHtml from "./pages/TextToHtml";
import WordCounter from "./pages/WordCounter";
import CaseConverter from "./pages/CaseConverter";
import LinkManager from "./pages/LinkManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Only show loading screen after splash for first-time visitors
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tools/add-line-breaks" element={<AddLineBreaks />} />
                <Route path="/tools/random-words" element={<RandomWords />} />
                <Route path="/tools/alphabetical-order" element={<AlphabeticalOrder />} />
                <Route path="/tools/reverse-text" element={<ReverseText />} />
                <Route path="/tools/text-to-html" element={<TextToHtml />} />
                <Route path="/tools/word-counter" element={<WordCounter />} />
                <Route path="/tools/case-converter" element={<CaseConverter />} />
                <Route path="/tools/link-manager" element={<LinkManager />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
