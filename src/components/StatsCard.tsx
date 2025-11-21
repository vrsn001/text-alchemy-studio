import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export const StatsCard = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    sentences: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
    });
  }, [text]);

  return (
    <Card className="p-6 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">Text Statistics</h3>
        <p className="text-sm text-muted-foreground">Count characters, words, and more</p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to see statistics..."
          className="min-h-[200px] resize-none bg-input border-border focus:ring-2 focus:ring-ring transition-m3"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-md border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">{stats.characters}</div>
            <div className="text-xs text-muted-foreground font-medium">Characters</div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-md border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">{stats.charactersNoSpaces}</div>
            <div className="text-xs text-muted-foreground font-medium">No Spaces</div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-md border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">{stats.words}</div>
            <div className="text-xs text-muted-foreground font-medium">Words</div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-md border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">{stats.lines}</div>
            <div className="text-xs text-muted-foreground font-medium">Lines</div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-md border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">{stats.sentences}</div>
            <div className="text-xs text-muted-foreground font-medium">Sentences</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
