import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
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
                />
                <ToolLink
                  icon={ArrowDownAZ}
                  title="Alphabetical Order"
                  description="Alphabetize all sorts of text content with this tool."
                />
                <ToolLink
                  icon={FileText}
                  title="Text to HTML"
                  description="Automatically change plain text into HTML paragraphs."
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
                />
                <ToolLink
                  icon={Type}
                  title="lowercase converter"
                  description="Convert all text to lowercase letters."
                />
                <ToolLink
                  icon={Type}
                  title="Title Case Converter"
                  description="Capitalize the first letter of each word."
                />
              </div>
              <div className="space-y-1">
                <ToolLink
                  icon={Type}
                  title="Sentence case converter"
                  description="Capitalize the first letter of each sentence."
                />
                <ToolLink
                  icon={Hash}
                  title="Word Counter"
                  description="Count words, characters, sentences, and paragraphs."
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

      <Footer />
    </div>
  );
};

export default Index;
