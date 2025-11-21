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
    <Card className="p-6 bg-card shadow-lg transition-m3 hover:shadow-xl">
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
          <div className="bg-accent/50 rounded-lg p-3 text-center transition-m3">
            <div className="text-2xl font-bold text-accent-foreground">{stats.characters}</div>
            <div className="text-xs text-muted-foreground">Characters</div>
          </div>
          <div className="bg-accent/50 rounded-lg p-3 text-center transition-m3">
            <div className="text-2xl font-bold text-accent-foreground">{stats.charactersNoSpaces}</div>
            <div className="text-xs text-muted-foreground">No Spaces</div>
          </div>
          <div className="bg-accent/50 rounded-lg p-3 text-center transition-m3">
            <div className="text-2xl font-bold text-accent-foreground">{stats.words}</div>
            <div className="text-xs text-muted-foreground">Words</div>
          </div>
          <div className="bg-accent/50 rounded-lg p-3 text-center transition-m3">
            <div className="text-2xl font-bold text-accent-foreground">{stats.lines}</div>
            <div className="text-xs text-muted-foreground">Lines</div>
          </div>
          <div className="bg-accent/50 rounded-lg p-3 text-center transition-m3">
            <div className="text-2xl font-bold text-accent-foreground">{stats.sentences}</div>
            <div className="text-xs text-muted-foreground">Sentences</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
