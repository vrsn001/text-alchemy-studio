// Username Extraction Utility
// Extracts usernames/handles from URL paths for known platforms

import { type LinkCategory } from './linkCategories';

export interface ExtractedUsername {
  username: string | null;
  displayName: string | null; // formatted for display (e.g., @username)
  confidence: 'high' | 'medium' | 'low' | 'none';
}

// Segments that are NOT usernames (platform routes)
const INSTAGRAM_ROUTES = new Set(['p', 'reel', 'reels', 'stories', 'explore', 'accounts', 'directory', 'developer', 'about', 'legal', 'privacy', 'terms']);
const YOUTUBE_ROUTES = new Set(['watch', 'playlist', 'feed', 'gaming', 'shorts', 'results', 'premium', 'music', 'kids', 'channel', 'embed', 'live']);
const TWITTER_ROUTES = new Set(['i', 'search', 'explore', 'notifications', 'messages', 'settings', 'compose', 'home', 'hashtag', 'lists']);
const GITHUB_ROUTES = new Set(['features', 'marketplace', 'explore', 'topics', 'trending', 'collections', 'events', 'sponsors', 'settings', 'organizations', 'orgs', 'login', 'signup', 'pricing', 'enterprise', 'team', 'about', 'security', 'pulls', 'issues', 'codespaces', 'discussions']);
const TIKTOK_ROUTES = new Set(['discover', 'following', 'live', 'foryou', 'tag', 'music', 'effect', 'upload']);
const LINKEDIN_ROUTES = new Set(['feed', 'jobs', 'messaging', 'notifications', 'mynetwork', 'learning', 'posts', 'pulse', 'groups', 'events', 'company', 'school', 'showcase']);
const REDDIT_ROUTES = new Set(['r', 'u', 'user', 'submit', 'search', 'settings', 'premium', 'coins', 'best', 'hot', 'new', 'top', 'rising']);
const FACEBOOK_ROUTES = new Set(['watch', 'marketplace', 'groups', 'gaming', 'events', 'pages', 'fundraisers', 'stories', 'reels', 'profile.php', 'photo', 'video', 'share', 'sharer']);
const PINTEREST_ROUTES = new Set(['search', 'categories', 'today', 'pin', 'settings', 'business']);
const MEDIUM_ROUTES = new Set(['tag', 'search', 'topics', 'membership', 'about', 'creators', 'explore']);

/**
 * Extract username from a URL based on its platform/category
 */
export const extractUsernameFromURL = (url: string, host: string, category: LinkCategory): ExtractedUsername => {
  const none: ExtractedUsername = { username: null, displayName: null, confidence: 'none' };
  
  try {
    const testUrl = url.startsWith('http') ? url : `https://${url}`;
    const parsed = new URL(testUrl);
    const segments = parsed.pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) return none;
    
    switch (category) {
      case 'instagram':
        return extractInstagram(segments);
      case 'twitter':
        return extractTwitter(segments);
      case 'youtube':
        return extractYouTube(segments, parsed);
      case 'tiktok':
        return extractTikTok(segments);
      case 'github':
        return extractGitHub(segments);
      case 'linkedin':
        return extractLinkedIn(segments);
      case 'reddit':
        return extractReddit(segments);
      case 'facebook':
        return extractFacebook(segments);
      case 'pinterest':
        return extractPinterest(segments);
      case 'medium':
        return extractMedium(segments, host);
      default:
        return none;
    }
  } catch {
    return none;
  }
};

function extractInstagram(segments: string[]): ExtractedUsername {
  const first = segments[0];
  
  // /reel/ID or /p/ID → no username in URL
  if (INSTAGRAM_ROUTES.has(first)) {
    return { username: null, displayName: null, confidence: 'none' };
  }
  
  // /username/ or /username/reel/ID
  return { username: first, displayName: `@${first}`, confidence: 'high' };
}

function extractTwitter(segments: string[]): ExtractedUsername {
  const first = segments[0];
  if (TWITTER_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  
  // /username or /username/status/ID
  return { username: first, displayName: `@${first}`, confidence: 'high' };
}

function extractYouTube(segments: string[], parsed: URL): ExtractedUsername {
  const first = segments[0];
  
  // /@username
  if (first.startsWith('@')) {
    const username = first.slice(1);
    return { username, displayName: `@${username}`, confidence: 'high' };
  }
  
  // /c/channelname or /channel/ID
  if (first === 'c' && segments[1]) {
    return { username: segments[1], displayName: segments[1], confidence: 'medium' };
  }
  if (first === 'channel' && segments[1]) {
    return { username: segments[1], displayName: segments[1], confidence: 'low' };
  }
  
  // /watch?v=ID → no username
  if (YOUTUBE_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  
  // Could be a vanity URL
  return { username: first, displayName: first, confidence: 'low' };
}

function extractTikTok(segments: string[]): ExtractedUsername {
  const first = segments[0];
  if (TIKTOK_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  
  // /@username or /@username/video/ID
  if (first.startsWith('@')) {
    const username = first.slice(1);
    return { username, displayName: `@${username}`, confidence: 'high' };
  }
  
  return { username: null, displayName: null, confidence: 'none' };
}

function extractGitHub(segments: string[]): ExtractedUsername {
  const first = segments[0];
  if (GITHUB_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  
  // /username or /username/repo
  return { username: first, displayName: first, confidence: 'high' };
}

function extractLinkedIn(segments: string[]): ExtractedUsername {
  // /in/username
  if (segments[0] === 'in' && segments[1]) {
    return { username: segments[1], displayName: segments[1], confidence: 'high' };
  }
  // /company/name
  if (segments[0] === 'company' && segments[1]) {
    return { username: segments[1], displayName: segments[1], confidence: 'medium' };
  }
  if (LINKEDIN_ROUTES.has(segments[0])) return { username: null, displayName: null, confidence: 'none' };
  
  return { username: null, displayName: null, confidence: 'none' };
}

function extractReddit(segments: string[]): ExtractedUsername {
  // /r/subreddit → treat subreddit as "username"
  if ((segments[0] === 'r' || segments[0] === 'u' || segments[0] === 'user') && segments[1]) {
    const prefix = segments[0] === 'r' ? 'r/' : 'u/';
    return { username: segments[1], displayName: `${prefix}${segments[1]}`, confidence: 'high' };
  }
  return { username: null, displayName: null, confidence: 'none' };
}

function extractFacebook(segments: string[]): ExtractedUsername {
  const first = segments[0];
  if (FACEBOOK_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  
  // /username
  return { username: first, displayName: first, confidence: 'medium' };
}

function extractPinterest(segments: string[]): ExtractedUsername {
  const first = segments[0];
  if (PINTEREST_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  return { username: first, displayName: first, confidence: 'medium' };
}

function extractMedium(segments: string[], host: string): ExtractedUsername {
  const first = segments[0];
  
  // Subdomain-based medium blogs (e.g., username.medium.com)
  if (host !== 'medium.com' && host.endsWith('.medium.com')) {
    const subdomain = host.replace('.medium.com', '');
    return { username: subdomain, displayName: subdomain, confidence: 'high' };
  }
  
  // /@username
  if (first?.startsWith('@')) {
    const username = first.slice(1);
    return { username, displayName: `@${username}`, confidence: 'high' };
  }
  
  if (MEDIUM_ROUTES.has(first)) return { username: null, displayName: null, confidence: 'none' };
  
  return { username: null, displayName: null, confidence: 'none' };
}
