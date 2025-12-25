// Link Categories Utility
// Platform detection and categorization for URLs

export type LinkCategory = 
  | 'youtube'
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'github'
  | 'tiktok'
  | 'reddit'
  | 'pinterest'
  | 'medium'
  | 'news'
  | 'other';

export interface CategoryInfo {
  id: LinkCategory;
  label: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  bgColor: string;
  domains: string[];
}

// Category definitions with domains
export const CATEGORIES: Record<LinkCategory, CategoryInfo> = {
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    icon: 'Youtube',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    domains: ['youtube.com', 'youtu.be', 'youtube-nocookie.com', 'm.youtube.com']
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'Linkedin',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    domains: ['linkedin.com', 'lnkd.in']
  },
  twitter: {
    id: 'twitter',
    label: 'X / Twitter',
    icon: 'Twitter',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    domains: ['twitter.com', 'x.com', 't.co']
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    icon: 'Instagram',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    domains: ['instagram.com', 'instagr.am']
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    icon: 'Facebook',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    domains: ['facebook.com', 'fb.com', 'fb.me', 'm.facebook.com']
  },
  github: {
    id: 'github',
    label: 'GitHub',
    icon: 'Github',
    color: 'text-gray-800 dark:text-gray-200',
    bgColor: 'bg-gray-800/10 dark:bg-gray-200/10',
    domains: ['github.com', 'gist.github.com', 'raw.githubusercontent.com', 'github.io']
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok',
    icon: 'Music2',
    color: 'text-black dark:text-white',
    bgColor: 'bg-black/10 dark:bg-white/10',
    domains: ['tiktok.com', 'vm.tiktok.com']
  },
  reddit: {
    id: 'reddit',
    label: 'Reddit',
    icon: 'MessageCircle',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    domains: ['reddit.com', 'redd.it', 'old.reddit.com']
  },
  pinterest: {
    id: 'pinterest',
    label: 'Pinterest',
    icon: 'Pin',
    color: 'text-red-600',
    bgColor: 'bg-red-600/10',
    domains: ['pinterest.com', 'pin.it']
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    icon: 'BookOpen',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-700/10',
    domains: ['medium.com', 'medium.com/@']
  },
  news: {
    id: 'news',
    label: 'News',
    icon: 'Newspaper',
    color: 'text-amber-600',
    bgColor: 'bg-amber-600/10',
    domains: [
      'cnn.com', 'bbc.com', 'bbc.co.uk', 'nytimes.com', 'washingtonpost.com',
      'theguardian.com', 'reuters.com', 'apnews.com', 'bloomberg.com',
      'forbes.com', 'businessinsider.com', 'techcrunch.com', 'theverge.com',
      'wired.com', 'arstechnica.com', 'engadget.com', 'mashable.com',
      'huffpost.com', 'nbcnews.com', 'foxnews.com', 'wsj.com'
    ]
  },
  other: {
    id: 'other',
    label: 'Other',
    icon: 'Globe',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/50',
    domains: []
  }
};

// Get all categories except 'other' for UI display
export const CATEGORY_LIST = Object.values(CATEGORIES).filter(c => c.id !== 'other');

// Detect category from URL host
export const detectCategory = (host: string): LinkCategory => {
  const normalizedHost = host.toLowerCase().replace(/^www\./, '');
  
  for (const [categoryId, info] of Object.entries(CATEGORIES)) {
    if (categoryId === 'other') continue;
    
    for (const domain of info.domains) {
      if (normalizedHost === domain || normalizedHost.endsWith(`.${domain}`)) {
        return categoryId as LinkCategory;
      }
    }
  }
  
  return 'other';
};

// Get category info
export const getCategoryInfo = (category: LinkCategory): CategoryInfo => {
  return CATEGORIES[category];
};

// Count URLs by category
export const countByCategory = (hosts: string[]): Record<LinkCategory, number> => {
  const counts: Record<LinkCategory, number> = {
    youtube: 0,
    linkedin: 0,
    twitter: 0,
    instagram: 0,
    facebook: 0,
    github: 0,
    tiktok: 0,
    reddit: 0,
    pinterest: 0,
    medium: 0,
    news: 0,
    other: 0
  };
  
  hosts.forEach(host => {
    const category = detectCategory(host);
    counts[category]++;
  });
  
  return counts;
};

// Get category icon component props
export const getCategoryIconName = (category: LinkCategory): string => {
  return CATEGORIES[category].icon;
};
