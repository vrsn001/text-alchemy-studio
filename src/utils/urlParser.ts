// URL Parser & Validator Utility
// Comprehensive URL detection, validation, normalization, and duplicate detection

// RFC 3986 compliant URL regex - preserves query strings and fragments
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"{}|\\^`\[\]]+/gi;

// More specific regex for validation
const VALID_URL_REGEX = /^(https?:\/\/)[^\s<>"{}|\\^`\[\]]+$/i;
const WWW_URL_REGEX = /^www\.[^\s<>"{}|\\^`\[\]]+$/i;

// Common URL shorteners
const SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd',
  'buff.ly', 'adf.ly', 'j.mp', 'rb.gy', 'cutt.ly', 'shorturl.at'
];

// UTM parameters to strip during normalization
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];

export type URLStatus = 'valid' | 'missing-scheme' | 'malformed' | 'shortener';

export interface ParsedURL {
  id: string;
  original: string;
  normalized: string;
  url: string;
  host: string;
  status: URLStatus;
  statusMessage: string;
  lineNumber: number;
  position: { start: number; end: number };
  isDuplicate: boolean;
  duplicateCount: number;
  duplicateOf?: string;
  isShortener: boolean;
}

export interface ParseResult {
  urls: ParsedURL[];
  totalCount: number;
  validCount: number;
  missingSchemeCount: number;
  malformedCount: number;
  shortenerCount: number;
  duplicateCount: number;
  uniqueCount: number;
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Validate URL structure
export const validateURL = (url: string): { status: URLStatus; message: string } => {
  const trimmed = url.trim();
  
  // Check for obvious malformation
  if (trimmed.includes(' ') || trimmed.length < 5) {
    return { status: 'malformed', message: 'URL contains spaces or is too short' };
  }
  
  // Check for illegal characters in host portion
  if (/[<>"{}|\\^`\[\]]/.test(trimmed)) {
    return { status: 'malformed', message: 'URL contains illegal characters' };
  }
  
  // Valid with scheme
  if (VALID_URL_REGEX.test(trimmed)) {
    return { status: 'valid', message: 'Valid URL' };
  }
  
  // Missing scheme (www.)
  if (WWW_URL_REGEX.test(trimmed)) {
    return { status: 'missing-scheme', message: 'Missing https:// scheme' };
  }
  
  // Try to parse as URL
  try {
    const testUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    new URL(testUrl);
    
    if (!trimmed.startsWith('http')) {
      return { status: 'missing-scheme', message: 'Missing https:// scheme' };
    }
    return { status: 'valid', message: 'Valid URL' };
  } catch {
    return { status: 'malformed', message: 'Invalid URL format' };
  }
};

// Extract host from URL
export const extractHost = (url: string): string => {
  try {
    const testUrl = url.startsWith('http') ? url : `https://${url}`;
    const parsed = new URL(testUrl);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    // Fallback extraction
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/\?#]+)/i);
    return match ? match[1] : url;
  }
};

// Check if URL is a shortener
export const isShortener = (url: string): boolean => {
  const host = extractHost(url).toLowerCase();
  return SHORTENERS.some(s => host === s || host.endsWith(`.${s}`));
};

// Normalize URL for duplicate detection
export const normalizeURL = (url: string, options: { stripUtm?: boolean; normalizeProtocol?: boolean; stripTrailingSlash?: boolean } = {}): string => {
  const { stripUtm = true, normalizeProtocol = true, stripTrailingSlash = true } = options;
  
  try {
    let testUrl = url.trim();
    
    // Add scheme if missing
    if (!testUrl.startsWith('http')) {
      testUrl = `https://${testUrl.replace(/^www\./, '')}`;
    }
    
    const parsed = new URL(testUrl);
    
    // Normalize protocol
    if (normalizeProtocol) {
      parsed.protocol = 'https:';
    }
    
    // Lowercase host
    parsed.hostname = parsed.hostname.toLowerCase();
    
    // Remove www
    parsed.hostname = parsed.hostname.replace(/^www\./, '');
    
    // Remove default ports
    if (parsed.port === '80' || parsed.port === '443') {
      parsed.port = '';
    }
    
    // Strip UTM parameters
    if (stripUtm) {
      UTM_PARAMS.forEach(param => {
        parsed.searchParams.delete(param);
      });
    }
    
    let normalized = parsed.toString();
    
    // Strip trailing slash
    if (stripTrailingSlash && normalized.endsWith('/') && !parsed.pathname.includes('.')) {
      normalized = normalized.slice(0, -1);
    }
    
    return normalized;
  } catch {
    return url.toLowerCase().trim();
  }
};

// Fix URL by adding scheme
export const fixURL = (url: string): string => {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^www\./, 'www.')}`;
};

// Parse text and extract all URLs
export const parseURLs = (text: string, options: { normalizeForDuplicates?: boolean; stripUtm?: boolean } = {}): ParseResult => {
  const { normalizeForDuplicates = true, stripUtm = true } = options;
  
  const urls: ParsedURL[] = [];
  const normalizedMap = new Map<string, ParsedURL>();
  const lines = text.split('\n');
  
  let globalPosition = 0;
  
  lines.forEach((line, lineIndex) => {
    const lineMatches = line.matchAll(new RegExp(URL_REGEX.source, 'gi'));
    
    for (const match of lineMatches) {
      const original = match[0];
      const validation = validateURL(original);
      const host = extractHost(original);
      const isShort = isShortener(original);
      
      const normalized = normalizeURL(original, { 
        stripUtm, 
        normalizeProtocol: normalizeForDuplicates 
      });
      
      const parsedUrl: ParsedURL = {
        id: generateId(),
        original,
        normalized,
        url: validation.status === 'missing-scheme' ? fixURL(original) : original,
        host,
        status: isShort ? 'shortener' : validation.status,
        statusMessage: isShort ? 'URL shortener detected' : validation.message,
        lineNumber: lineIndex + 1,
        position: {
          start: globalPosition + (match.index || 0),
          end: globalPosition + (match.index || 0) + original.length
        },
        isDuplicate: false,
        duplicateCount: 1,
        isShortener: isShort
      };
      
      // Check for duplicates
      if (normalizeForDuplicates) {
        const existing = normalizedMap.get(normalized);
        if (existing) {
          parsedUrl.isDuplicate = true;
          parsedUrl.duplicateOf = existing.id;
          existing.duplicateCount++;
        } else {
          normalizedMap.set(normalized, parsedUrl);
        }
      }
      
      urls.push(parsedUrl);
    }
    
    globalPosition += line.length + 1; // +1 for newline
  });
  
  // Calculate counts
  const validCount = urls.filter(u => u.status === 'valid').length;
  const missingSchemeCount = urls.filter(u => u.status === 'missing-scheme').length;
  const malformedCount = urls.filter(u => u.status === 'malformed').length;
  const shortenerCount = urls.filter(u => u.status === 'shortener').length;
  const duplicateCount = urls.filter(u => u.isDuplicate).length;
  const uniqueCount = urls.length - duplicateCount;
  
  return {
    urls,
    totalCount: urls.length,
    validCount,
    missingSchemeCount,
    malformedCount,
    shortenerCount,
    duplicateCount,
    uniqueCount
  };
};

// Remove duplicates from URL list
export const removeDuplicates = (urls: ParsedURL[], keepFirst: boolean = true): ParsedURL[] => {
  const seen = new Map<string, ParsedURL>();
  const result: ParsedURL[] = [];
  
  const orderedUrls = keepFirst ? urls : [...urls].reverse();
  
  orderedUrls.forEach(url => {
    if (!seen.has(url.normalized)) {
      seen.set(url.normalized, url);
      result.push({ ...url, isDuplicate: false, duplicateCount: 1 });
    }
  });
  
  return keepFirst ? result : result.reverse();
};

// Fix all missing scheme URLs
export const fixAllMissingSchemes = (urls: ParsedURL[]): ParsedURL[] => {
  return urls.map(url => {
    if (url.status === 'missing-scheme') {
      return {
        ...url,
        url: fixURL(url.original),
        status: 'valid' as URLStatus,
        statusMessage: 'Valid URL (scheme added)'
      };
    }
    return url;
  });
};

// Convert URLs back to text with line breaks
export const urlsToText = (urls: ParsedURL[], separator: string = '\n'): string => {
  return urls.map(u => u.url).join(separator);
};

// Export formats
export const exportAsCSV = (urls: ParsedURL[]): string => {
  const header = 'URL,Host,Status,Line Number,Is Duplicate\n';
  const rows = urls.map(u => 
    `"${u.url}","${u.host}","${u.status}",${u.lineNumber},${u.isDuplicate}`
  ).join('\n');
  return header + rows;
};

export const exportAsMarkdown = (urls: ParsedURL[]): string => {
  return urls.map(u => `- [${u.host}](${u.url})`).join('\n');
};

export const exportAsHTML = (urls: ParsedURL[]): string => {
  return urls.map(u => `<p><a href="${u.url}" target="_blank" rel="noopener">${u.url}</a></p>`).join('\n');
};

// URL Encoding/Decoding utilities
export const encodeURL = (url: string): string => {
  try {
    // Split URL into parts to only encode the path and query
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    // Encode path segments
    const encodedPath = urlObj.pathname
      .split('/')
      .map(segment => encodeURIComponent(decodeURIComponent(segment)))
      .join('/');
    
    // Encode query parameters
    const encodedParams = new URLSearchParams();
    urlObj.searchParams.forEach((value, key) => {
      encodedParams.set(key, value);
    });
    
    urlObj.pathname = encodedPath;
    
    return urlObj.toString();
  } catch {
    // Fallback: encode the entire URL
    return encodeURI(url);
  }
};

export const decodeURL = (url: string): string => {
  try {
    return decodeURIComponent(url);
  } catch {
    // If decoding fails, return original
    return url;
  }
};

// Check if URL needs encoding (has special characters)
export const needsEncoding = (url: string): boolean => {
  try {
    return url !== encodeURL(url);
  } catch {
    return false;
  }
};

// Check if URL is encoded
export const isEncoded = (url: string): boolean => {
  try {
    return url !== decodeURIComponent(url);
  } catch {
    return false;
  }
};
