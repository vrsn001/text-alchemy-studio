// Web Worker for heavy URL parsing operations
// Prevents UI blocking when processing 500+ links

import { parseURLs, removeDuplicates, fixAllMissingSchemes, type ParseResult, type ParsedURL } from '../utils/urlParser';

export type WorkerMessage = 
  | { type: 'parse'; text: string; options?: { normalizeForDuplicates?: boolean; stripUtm?: boolean } }
  | { type: 'removeDuplicates'; urls: ParsedURL[]; keepFirst?: boolean }
  | { type: 'fixAllSchemes'; urls: ParsedURL[] };

export type WorkerResponse =
  | { type: 'parseResult'; result: ParseResult }
  | { type: 'removeDuplicatesResult'; urls: ParsedURL[] }
  | { type: 'fixAllSchemesResult'; urls: ParsedURL[] }
  | { type: 'progress'; percent: number; message: string }
  | { type: 'error'; message: string };

// Worker message handler
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { data } = event;
  
  try {
    switch (data.type) {
      case 'parse': {
        // Send progress update
        self.postMessage({ type: 'progress', percent: 10, message: 'Starting URL detection...' });
        
        const result = parseURLs(data.text, data.options);
        
        self.postMessage({ type: 'progress', percent: 100, message: 'Complete!' });
        self.postMessage({ type: 'parseResult', result });
        break;
      }
      
      case 'removeDuplicates': {
        self.postMessage({ type: 'progress', percent: 50, message: 'Removing duplicates...' });
        const urls = removeDuplicates(data.urls, data.keepFirst);
        self.postMessage({ type: 'removeDuplicatesResult', urls });
        break;
      }
      
      case 'fixAllSchemes': {
        self.postMessage({ type: 'progress', percent: 50, message: 'Fixing URLs...' });
        const urls = fixAllMissingSchemes(data.urls);
        self.postMessage({ type: 'fixAllSchemesResult', urls });
        break;
      }
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error occurred' 
    });
  }
};
