import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { ToolLink } from "@/components/ToolLink";
import { Card } from "@/components/ui/card";
import { 
  Type, 
  Sparkles, 
  ArrowDownAZ, 
  RotateCcw, 
  AlignLeft,
  Scissors,
  Hash,
  FileText,
  Repeat,
  Wand2,
  Text as TextIcon
} from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    axis: 'x',
    loop: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    inViewThreshold: 0.7
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sections = ['home', 'text', 'html', 'favorites'];

  const scrollToSection = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    
    // Update URL hash based on section
    const sectionId = sections[index];
    if (sectionId === 'home') {
      navigate('/', { replace: true });
    } else {
      const hashMap: Record<string, string> = {
        text: '#text-tools',
        html: '#html-tools',
        favorites: '#favorites'
      };
      navigate(hashMap[sectionId] || '/', { replace: true });
    }
  }, [emblaApi, navigate, sections]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync with hash navigation
  useEffect(() => {
    const hash = location.hash;
    let targetIndex = 0;
    
    if (hash === '#text-tools') targetIndex = 1;
    else if (hash === '#html-tools') targetIndex = 2;
    else if (hash === '#favorites') targetIndex = 3;
    
    if (targetIndex !== selectedIndex && emblaApi) {
      emblaApi.scrollTo(targetIndex);
    }
  }, [location.hash, emblaApi, selectedIndex]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      {/* Desktop View */}
      <main className="hidden md:block container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Free Online Tools - Text Craft Web Tools
            </h1>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Use these <strong>free online tools</strong> to fix text, convert text to HTML, remove line breaks, 
              generate random words, and do many other tasks quickly with these web tools.
            </p>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                What Are Some Online Tools You Can Use?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You can, for example, use the online sentence counter, convert text to HTML paragraphs, alphabetize text, 
                or remove line breaks from incorrectly formatted text. You can do fun things like generate random words, 
                reverse text, or repeat text.
              </p>
            </div>
          </div>

          {/* Tool Categories */}
          <div id="text-tools" className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Most Popular Text Tools */}
            <Card className="p-6 bg-card hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
                Most Popular Text Tools
              </h3>
              <div className="space-y-1">
                <ToolLink
                  icon={Scissors}
                  title="Add Line Breaks"
                  description="Add line breaks to scrunched-up text to make it more readable."
                  href="/tools/add-line-breaks"
                />
                <ToolLink
                  icon={Wand2}
                  title="Random Word Generator"
                  description="Generate a list of random words. Great tool for brainstorming ideas."
                  href="/tools/random-words"
                />
                <ToolLink
                  icon={ArrowDownAZ}
                  title="Alphabetical Order"
                  description="Alphabetize all sorts of text content with this tool."
                  href="/tools/alphabetical-order"
                />
                <ToolLink
                  icon={FileText}
                  title="Text to HTML"
                  description="Automatically change plain text into HTML paragraphs."
                  href="/tools/text-to-html"
                />
              </div>
            </Card>

            {/* Fun Text Tools */}
            <Card className="p-6 bg-card hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
                Fun Text Tools
              </h3>
              <div className="space-y-1">
                <ToolLink
                  icon={RotateCcw}
                  title="Reverse Text"
                  description="Reverse the text and characters in your content."
                  href="/tools/reverse-text"
                />
                <ToolLink
                  icon={Wand2}
                  title="Made-up Word Generator"
                  description="Generate creative made-up words and names."
                />
                <ToolLink
                  icon={Repeat}
                  title="Repeat Text Generator"
                  description="Repeat any text multiple times easily."
                />
                <ToolLink
                  icon={TextIcon}
                  title="Tiny Text Generator"
                  description="Convert your text to tiny characters."
                />
              </div>
            </Card>
          </div>

          {/* Text Changing Tools */}
          <Card className="p-6 bg-card hover:shadow-lg transition-all mb-12">
            <h3 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
              Text Changing Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-x-8">
              <div className="space-y-1">
                <ToolLink
                  icon={Type}
                  title="UPPERCASE Converter"
                  description="Convert all text to uppercase letters."
                  href="/tools/case-converter"
                />
                <ToolLink
                  icon={Type}
                  title="lowercase converter"
                  description="Convert all text to lowercase letters."
                  href="/tools/case-converter"
                />
                <ToolLink
                  icon={Type}
                  title="Title Case Converter"
                  description="Capitalize the first letter of each word."
                  href="/tools/case-converter"
                />
              </div>
              <div className="space-y-1">
                <ToolLink
                  icon={Type}
                  title="Sentence case converter"
                  description="Capitalize the first letter of each sentence."
                  href="/tools/case-converter"
                />
                <ToolLink
                  icon={Hash}
                  title="Word Counter"
                  description="Count words, characters, sentences, and paragraphs."
                  href="/tools/word-counter"
                />
                <ToolLink
                  icon={AlignLeft}
                  title="Line Counter"
                  description="Count the number of lines in your text."
                />
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <p className="text-muted-foreground mb-2">
              There are also plenty of tools if you need to <strong>fix text formatting online</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              All tools are free to use and require no registration.
            </p>
          </div>
        </div>
      </main>

      {/* Mobile View with Swipe Gestures */}
      <div className="md:hidden overflow-hidden touch-pan-y" ref={emblaRef}>
        <div className="flex" style={{ touchAction: 'pan-y pinch-zoom' }}>
          {/* Home Section */}
          <div className="flex-[0_0_100%] min-w-0 px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-4">
                  Free Online Tools - TextCraft
                </h1>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  Use these <strong>free online tools</strong> to fix text, convert text to HTML, remove line breaks, 
                  generate random words, and more.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    What Are Some Online Tools You Can Use?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Convert text to HTML paragraphs, alphabetize text, remove line breaks, generate random words, 
                    reverse text, or repeat text.
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Swipe left</strong> to explore tool categories →
                </p>
                <p className="text-xs text-muted-foreground">
                  All tools are free to use and require no registration.
                </p>
              </div>
            </div>
          </div>

          {/* Text Tools Section */}
          <div className="flex-[0_0_100%] min-w-0 px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">Text Tools</h2>
              
              <div className="space-y-6">
                <Card className="p-4 bg-card">
                  <h3 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                    Most Popular
                  </h3>
                  <div className="space-y-1">
                    <ToolLink
                      icon={Scissors}
                      title="Add Line Breaks"
                      description="Add line breaks to scrunched-up text."
                      href="/tools/add-line-breaks"
                    />
                    <ToolLink
                      icon={Wand2}
                      title="Random Word Generator"
                      description="Generate random words for brainstorming."
                      href="/tools/random-words"
                    />
                    <ToolLink
                      icon={ArrowDownAZ}
                      title="Alphabetical Order"
                      description="Alphabetize text content."
                      href="/tools/alphabetical-order"
                    />
                  </div>
                </Card>

                <Card className="p-4 bg-card">
                  <h3 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                    Fun Tools
                  </h3>
                  <div className="space-y-1">
                    <ToolLink
                      icon={RotateCcw}
                      title="Reverse Text"
                      description="Reverse text and characters."
                      href="/tools/reverse-text"
                    />
                    <ToolLink
                      icon={Hash}
                      title="Word Counter"
                      description="Count words and characters."
                      href="/tools/word-counter"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* HTML Tools Section */}
          <div className="flex-[0_0_100%] min-w-0 px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">HTML Tools</h2>
              
              <Card className="p-4 bg-card">
                <h3 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                  HTML Conversion
                </h3>
                <div className="space-y-1">
                  <ToolLink
                    icon={FileText}
                    title="Text to HTML"
                    description="Convert plain text to HTML paragraphs."
                    href="/tools/text-to-html"
                  />
                  <ToolLink
                    icon={Type}
                    title="Case Converter"
                    description="Convert text case (upper, lower, title, sentence)."
                    href="/tools/case-converter"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="flex-[0_0_100%] min-w-0 px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">Favorites</h2>
              
              <Card className="p-4 bg-card">
                <div className="text-center py-8">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Favorites Yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Star your favorite tools for quick access
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default Index;
