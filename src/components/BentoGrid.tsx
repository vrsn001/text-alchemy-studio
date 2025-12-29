"use client";
import { useEffect, useMemo, useState } from "react";
import { SlotItemMapArray, utils } from "swapy";
import { DragHandle, SwapyItem, SwapyLayout, SwapySlot } from "@/components/ui/swapy";
import { Heart, PlusCircle, Type, ArrowUpDown, Code, List, Sparkles, FileText, Hash, Github, Loader2 } from "lucide-react";

interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export function ProjectViewsCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 animated-border-purple">
      <DragHandle />
      <div className="flex items-start justify-between">
        <h2 className="text-4xl font-bold text-foreground">40+</h2>
        <div className="flex items-center gap-1 text-green-400 text-sm">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
      <p className="text-muted-foreground mt-2">Text Tools</p>
      <p className="text-xs text-muted-foreground/60 mt-1">Available now</p>
    </div>
  );
}

export function NewUsersCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 animated-border">
      <DragHandle />
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground text-sm">Daily Users</p>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
      <h2 className="text-3xl font-bold text-foreground mt-1">5+</h2>
      <span className="text-green-400 text-sm">Live</span>
    </div>
  );
}

export function TeamCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-6 animated-border-pink">
      <DragHandle />
      <p className="text-muted-foreground text-sm mb-4">
        Lightning fast text transformations
      </p>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground/60">Processing Speed</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">0.1s</span>
          <span className="text-green-400 text-xs">Instant</span>
        </div>
      </div>
    </div>
  );
}

export function AgencyCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 animated-border-purple flex flex-col justify-between">
      <DragHandle />
      <div>
        <p className="text-lg font-medium text-foreground">Smart Text</p>
        <p className="text-2xl font-bold text-foreground">Transformations</p>
        <p className="text-lg text-muted-foreground">For Everyone</p>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
          <Type className="w-4 h-4 text-purple-400" />
        </div>
        <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center">
          <ArrowUpDown className="w-4 h-4 text-pink-400" />
        </div>
      </div>
    </div>
  );
}

export function LogoCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 animated-border-purple flex flex-col items-center justify-center">
      <DragHandle />
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <p className="text-lg font-bold text-foreground">TextCraft</p>
    </div>
  );
}

export function UserTrustCard() {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/vrsn001/text-alchemy-studio/contributors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setContributors(data.slice(0, 5));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 animated-border">
      <DragHandle />
      <a 
        href="https://github.com/vrsn001/text-alchemy-studio" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity"
      >
        <p className="text-muted-foreground text-sm">Open Source</p>
        <h2 className="text-xl font-bold text-foreground mt-1">Open to Contribute</h2>
      </a>
      
      <a 
        href="https://github.com/vrsn001/text-alchemy-studio/graphs/contributors" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex -space-x-2 mt-4 hover:opacity-80 transition-opacity"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
        ) : contributors.length > 0 ? (
          <>
            {contributors.map((contributor) => (
              <img 
                key={contributor.id}
                src={contributor.avatar_url}
                alt={contributor.login}
                title={`${contributor.login} (${contributor.contributions} contributions)`}
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center">
              <PlusCircle className="w-4 h-4 text-muted-foreground" />
            </div>
          </>
        ) : (
          <>
            {['🧑‍💻', '👨‍💻', '👩‍💻', '🧑‍🔧'].map((emoji, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-background flex items-center justify-center text-xs"
              >
                {emoji}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center">
              <PlusCircle className="w-4 h-4 text-muted-foreground" />
            </div>
          </>
        )}
      </a>
      
      <a 
        href="https://github.com/vrsn001" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="w-4 h-4" />
        <span className="text-xs">@vrsn001</span>
      </a>
    </div>
  );
}

export function FontCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 p-6 animated-border-pink">
      <DragHandle />
      <p className="text-muted-foreground text-sm">Case</p>
      <h2 className="text-xl font-bold text-foreground mt-1">Converter</h2>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="text-xs bg-white/5 rounded-lg p-2 text-center text-foreground">UPPER</div>
        <div className="text-xs bg-white/5 rounded-lg p-2 text-center text-foreground">lower</div>
        <div className="text-xs bg-white/5 rounded-lg p-2 text-center text-foreground">Title</div>
        <div className="text-xs bg-white/5 rounded-lg p-2 text-center text-foreground">camel</div>
      </div>
    </div>
  );
}

export function DesignIndustryCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 animated-border flex flex-col justify-center">
      <DragHandle />
      <p className="text-muted-foreground text-sm">We Build Future of</p>
      <h2 className="text-2xl font-bold text-foreground">Text Tools</h2>
    </div>
  );
}

export function CardBalanceCard() {
  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-6 animated-border-purple">
      <DragHandle />
      <p className="text-muted-foreground text-sm">Characters Processed</p>
      <h2 className="text-2xl font-bold text-foreground mt-1">12.4M</h2>
      
      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Words</span>
          <span>Lines</span>
        </div>
        <div className="flex justify-between text-sm text-foreground">
          <span>2.1M</span>
          <span>458K</span>
        </div>
      </div>
    </div>
  );
}

type Item = {
  id: string;
  title: string;
  widgets: React.ReactNode;
  className?: string;
};

const initialItems: Item[] = [
  {
    id: "1",
    title: "1",
    widgets: <ProjectViewsCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  { id: "2", title: "2", widgets: <NewUsersCard />, className: "lg:col-span-3 sm:col-span-5 col-span-12" },
  { id: "3", title: "3", widgets: <TeamCard />, className: "lg:col-span-5 sm:col-span-5 col-span-12" },
  { id: "4", title: "4", widgets: <AgencyCard />, className: "lg:col-span-5 sm:col-span-7 col-span-12" },
  { id: "5", title: "5", widgets: <LogoCard />, className: "lg:col-span-4 sm:col-span-6 col-span-12" },
  { id: "6", title: "6", widgets: <UserTrustCard />, className: "lg:col-span-3 sm:col-span-6 col-span-12" },
  {
    id: "7",
    title: "7",
    widgets: <FontCard />,
    className: "lg:col-span-4 sm:col-span-5 col-span-12",
  },
  { id: "8", title: "8", widgets: <DesignIndustryCard />, className: "lg:col-span-4 sm:col-span-7 col-span-12" },
  { id: "9", title: "9", widgets: <CardBalanceCard />, className: "lg:col-span-4 sm:col-span-12 col-span-12" },
];

export function BentoGrid() {
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(initialItems, "id")
  );

  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, "id", slotItemMap),
    [slotItemMap]
  );

  return (
    <SwapyLayout
      className="grid-cols-12 max-w-6xl mx-auto p-4"
      onSwap={(event) => {
        setSlotItemMap(event.newSlotItemMap.asArray);
      }}
    >
      {slottedItems.map(({ slotId, itemId }) => {
        const item = initialItems.find((i) => i.id === itemId);

        return (
          <SwapySlot key={slotId} id={slotId} className={item?.className}>
            <SwapyItem id={itemId!}>
              {item?.widgets}
            </SwapyItem>
          </SwapySlot>
        );
      })}
    </SwapyLayout>
  );
}

export default BentoGrid;
