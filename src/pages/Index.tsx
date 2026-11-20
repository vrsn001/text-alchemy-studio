import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowDownAZ,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  Braces,
  CaseSensitive,
  Check,
  Code2,
  Copy,
  Heading,
  Link2,
  List,
  ListOrdered,
  Minus,
  Plus,
  Text,
  Unlink,
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
  icon: LucideIcon;
  tools: Tool[];
};

const categories: Category[] = [
  {
    id: "modify",
    title: "Text Modifications",
    icon: Text,
    tools: [
      { icon: ArrowLeftRight, name: "Reverse Text", description: "Reverse the character order", href: "/tools/reverse-text" },
      { icon: Minus, name: "Remove Spaces", description: "Clean up extra spaces", href: "/tools/add-line-breaks" },
      { icon: Plus, name: "Add Line Breaks", description: "Break text at a chosen length", href: "/tools/add-line-breaks" },
      { icon: List, name: "Remove Line Breaks", description: "Join text into one line", href: "/tools/add-line-breaks" },
    ],
  },
  {
    id: "encode",
    title: "Encoding & Decoding",
    icon: Braces,
    tools: [
      { icon: Code2, name: "Base64 Encode", description: "Encode text as Base64", href: "/tools/text-to-html" },
      { icon: Code2, name: "Base64 Decode", description: "Decode Base64 text", href: "/tools/text-to-html" },
      { icon: Link2, name: "URL Encode", description: "Encode text for URLs", href: "/tools/text-to-html" },
      { icon: Unlink, name: "URL Decode", description: "Decode URL text", href: "/tools/text-to-html" },
      { icon: Braces, name: "HTML Entities", description: "Convert HTML characters", href: "/tools/text-to-html" },
    ],
  },
  {
    id: "format",
    title: "Formatting Tools",
    icon: ListOrdered,
    tools: [
      { icon: ListOrdered, name: "Add Line Numbers", description: "Number each line", href: "/tools/add-line-breaks" },
      { icon: List, name: "Add Bullets", description: "Add a bullet to each line", href: "/tools/add-line-breaks" },
      { icon: Copy, name: "Remove Duplicates", description: "Keep unique lines", href: "/tools/add-line-breaks" },
      { icon: ArrowDownAZ, name: "Sort Lines A–Z", description: "Sort lines alphabetically", href: "/tools/alphabetical-order" },
    ],
  },
  {
    id: "links",
    title: "Link Tools",
    icon: Link2,
    tools: [
      { icon: Link2, name: "Link Manager", description: "Organize and check URLs", href: "/tools/link-manager" },
      { icon: Check, name: "Link Validator", description: "Check link status", href: "/tools/link-manager" },
      { icon: Heading, name: "Categorize Links", description: "Group links by platform", href: "/tools/link-manager" },
      { icon: Copy, name: "Find Duplicates", description: "Find repeated URLs", href: "/tools/link-manager" },
    ],
  },
  {
    id: "case",
    title: "Case Transformations",
    icon: CaseSensitive,
    tools: [
      { icon: ArrowUp, name: "UPPERCASE", description: "Convert every letter to uppercase", href: "/tools/case-converter" },
      { icon: ArrowDown, name: "lowercase", description: "Convert every letter to lowercase", href: "/tools/case-converter" },
      { icon: Heading, name: "Title Case", description: "Capitalize each word", href: "/tools/case-converter" },
      { icon: CaseSensitive, name: "Sentence case", description: "Capitalize each sentence", href: "/tools/case-converter" },
    ],
  },
];

const Index = () => {
  const { trackToolInteraction } = useSmartScroll();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">TextCraft</p>
          <h1 className="mt-1 text-3xl font-semibold text-foreground">Tools</h1>
        </div>

        <nav aria-label="Tool categories" className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {category.title}
            </a>
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
                className="scroll-mt-24 border-t border-border py-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">{category.tools.length} tools</p>
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
                        className="group flex min-h-[76px] items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <ToolIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">{tool.name}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{tool.description}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
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