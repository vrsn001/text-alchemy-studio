import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowDownAZ,
  ArrowLeftRight,
  ArrowRight,
  Braces,
  CaseSensitive,
  Code2,
  FileText,
  Link2,
  ListOrdered,
  RefreshCw,
  Text,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSmartScroll } from "@/hooks/useSmartScroll";

type Tool = {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
};

type Category = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tools: Tool[];
};

const categories: Category[] = [
  {
    id: "modify",
    title: "Text Modifications",
    description: "Change the order and shape of your text.",
    icon: Text,
    tools: [
      { icon: ArrowLeftRight, name: "Reverse Text", description: "Flip the order of characters.", href: "/tools/reverse-text" },
      { icon: ListOrdered, name: "Add Line Breaks", description: "Split text into readable lines.", href: "/tools/add-line-breaks" },
    ],
  },
  {
    id: "case",
    title: "Case Transformations",
    description: "Change capitalization in one step.",
    icon: CaseSensitive,
    tools: [
      { icon: CaseSensitive, name: "Case Converter", description: "Upper, lower, title, or sentence case.", href: "/tools/case-converter" },
    ],
  },
  {
    id: "format",
    title: "Text Organization",
    description: "Sort lists and count what is on the page.",
    icon: ListOrdered,
    tools: [
      { icon: ArrowDownAZ, name: "Alphabetical Order", description: "Sort one item per line, A–Z.", href: "/tools/alphabetical-order" },
      { icon: FileText, name: "Word Counter", description: "Count words, characters, lines, and more.", href: "/tools/word-counter" },
    ],
  },
  {
    id: "encode",
    title: "Text Conversion",
    description: "Turn plain text into simple HTML paragraphs.",
    icon: Braces,
    tools: [
      { icon: Code2, name: "Text to HTML", description: "Wrap each line in a paragraph tag.", href: "/tools/text-to-html" },
    ],
  },
  {
    id: "links",
    title: "Link Tools",
    description: "Clean, group, and organize URL lists.",
    icon: Link2,
    tools: [
      { icon: Link2, name: "Link Manager", description: "Find repeats and remove tracking tags.", href: "/tools/link-manager" },
    ],
  },
  {
    id: "generate",
    title: "Word Generation",
    description: "Generate random words for writing prompts and ideas.",
    icon: RefreshCw,
    tools: [
      { icon: RefreshCw, name: "Random Word Generator", description: "Make a quick list of random words.", href: "/tools/random-words" },
    ],
  },
];

const Index = () => {
  const { trackToolInteraction } = useSmartScroll();

  return (
    <div className="brutalist-page min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <section className="brutalist-intro mb-10 border-4 border-foreground bg-primary p-5 text-primary-foreground sm:p-8">
          <p className="font-mono text-xs font-bold uppercase">A toolbox for everyday text</p>
          <h1 className="mt-4 text-4xl font-black leading-none sm:text-6xl">Text tools.<br />No nonsense.</h1>
          <p className="mt-4 max-w-2xl text-base font-medium sm:text-lg">
            Straightforward tools for writing, formatting, and working with links.
          </p>
        </section>

        <nav aria-label="Tool categories" className="mb-9 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button key={category.id} asChild variant="outline" size="sm" className="shrink-0">
              <a href={`#${category.id}`}>{category.title}</a>
            </Button>
          ))}
        </nav>

        <div>
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <section
                key={category.id}
                id={category.id}
                data-category={category.id}
                className="scroll-mt-24 border-t-4 border-foreground py-7 sm:py-9"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary text-primary-foreground">
                    <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-lg font-black text-foreground">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <Link
                        key={tool.name}
                        to={tool.href}
                        onClick={() => trackToolInteraction(tool.href, category.id)}
                        className="brutalist-tool-link flex min-h-[84px] items-center gap-3 border-2 border-foreground bg-card px-4 py-3 text-left text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary text-primary-foreground">
                          <ToolIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-foreground">{tool.name}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{tool.description}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;