import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
    });
  }, [text]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/#text-tools" },
          { label: "Word Counter" }
        ]} />

        <Card className="p-6 bg-card shadow-lg">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Word Counter</h1>
            <p className="text-muted-foreground">
              Count words, characters, sentences, and paragraphs in your text in real-time.
            </p>
          </div>

          <div className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to see live statistics..."
              className="min-h-[300px] resize-none"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.words}</div>
                <div className="text-sm text-muted-foreground mt-1">Words</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.characters}</div>
                <div className="text-sm text-muted-foreground mt-1">Characters</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.charactersNoSpaces}</div>
                <div className="text-sm text-muted-foreground mt-1">No Spaces</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.sentences}</div>
                <div className="text-sm text-muted-foreground mt-1">Sentences</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.lines}</div>
                <div className="text-sm text-muted-foreground mt-1">Lines</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.paragraphs}</div>
                <div className="text-sm text-muted-foreground mt-1">Paragraphs</div>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
      <BottomNav />
      <FAB />
    </div>
  );
};

export default WordCounter;
