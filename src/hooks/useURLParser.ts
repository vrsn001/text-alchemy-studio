// Hook for URL parsing with Web Worker support
import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  parseURLs, 
  removeDuplicates, 
  fixAllMissingSchemes,
  cleanAllURLs,
  type ParseResult, 
  type ParsedURL 
} from '@/utils/urlParser';

interface UseURLParserOptions {
  useWorker?: boolean;
  workerThreshold?: number; // Use worker above this many characters
  normalizeForDuplicates?: boolean;
  stripUtm?: boolean;
}

interface UseURLParserReturn {
  result: ParseResult | null;
  urls: ParsedURL[];
  isProcessing: boolean;
  progress: number;
  progressMessage: string;
  error: string | null;
  parse: (text: string) => void;
  removeDuplicatesAction: (keepFirst?: boolean) => void;
  fixAllSchemesAction: () => void;
  cleanAllAction: (stripAll?: boolean) => void;
  removeUrl: (id: string) => void;
  fixUrl: (id: string) => void;
  clear: () => void;
}

const EMPTY_RESULT: ParseResult = {
  urls: [],
  totalCount: 0,
  validCount: 0,
  missingSchemeCount: 0,
  malformedCount: 0,
  shortenerCount: 0,
  duplicateCount: 0,
  uniqueCount: 0
};

export const useURLParser = (options: UseURLParserOptions = {}): UseURLParserReturn => {
  const {
    useWorker = true,
    workerThreshold = 5000,
    normalizeForDuplicates = true,
    stripUtm = true
  } = options;

  const [result, setResult] = useState<ParseResult | null>(null);
  const [urls, setUrls] = useState<ParsedURL[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const workerRef = useRef<Worker | null>(null);

  // Initialize worker
  useEffect(() => {
    if (useWorker && typeof Worker !== 'undefined') {
      try {
        workerRef.current = new Worker(
          new URL('../workers/urlParserWorker.ts', import.meta.url),
          { type: 'module' }
        );
        
        workerRef.current.onmessage = (event) => {
          const { data } = event;
          
          switch (data.type) {
            case 'progress':
              setProgress(data.percent);
              setProgressMessage(data.message);
              break;
            case 'parseResult':
              setResult(data.result);
              setUrls(data.result.urls);
              setIsProcessing(false);
              break;
            case 'removeDuplicatesResult':
              setUrls(data.urls);
              updateResultCounts(data.urls);
              setIsProcessing(false);
              break;
            case 'fixAllSchemesResult':
              setUrls(data.urls);
              updateResultCounts(data.urls);
              setIsProcessing(false);
              break;
            case 'error':
              setError(data.message);
              setIsProcessing(false);
              break;
          }
        };
        
        workerRef.current.onerror = (err) => {
          setError(`Worker error: ${err.message}`);
          setIsProcessing(false);
        };
      } catch (err) {
        console.warn('Web Worker not available, falling back to main thread');
      }
    }
    
    return () => {
      workerRef.current?.terminate();
    };
  }, [useWorker]);

  const updateResultCounts = useCallback((newUrls: ParsedURL[]) => {
    setResult(prev => {
      if (!prev) return null;
      return {
        ...prev,
        urls: newUrls,
        totalCount: newUrls.length,
        validCount: newUrls.filter(u => u.status === 'valid').length,
        missingSchemeCount: newUrls.filter(u => u.status === 'missing-scheme').length,
        malformedCount: newUrls.filter(u => u.status === 'malformed').length,
        shortenerCount: newUrls.filter(u => u.status === 'shortener').length,
        duplicateCount: newUrls.filter(u => u.isDuplicate).length,
        uniqueCount: newUrls.filter(u => !u.isDuplicate).length
      };
    });
  }, []);

  const parse = useCallback((text: string) => {
    setError(null);
    setIsProcessing(true);
    setProgress(0);
    setProgressMessage('Starting...');
    
    const shouldUseWorker = useWorker && workerRef.current && text.length > workerThreshold;
    
    if (shouldUseWorker) {
      workerRef.current!.postMessage({
        type: 'parse',
        text,
        options: { normalizeForDuplicates, stripUtm }
      });
    } else {
      // Process on main thread for small inputs
      try {
        const parseResult = parseURLs(text, { normalizeForDuplicates, stripUtm });
        setResult(parseResult);
        setUrls(parseResult.urls);
        setProgress(100);
        setProgressMessage('Complete!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Parse error');
      } finally {
        setIsProcessing(false);
      }
    }
  }, [useWorker, workerThreshold, normalizeForDuplicates, stripUtm]);

  const removeDuplicatesAction = useCallback((keepFirst = true) => {
    setIsProcessing(true);
    
    if (workerRef.current && urls.length > 100) {
      workerRef.current.postMessage({
        type: 'removeDuplicates',
        urls,
        keepFirst
      });
    } else {
      const newUrls = removeDuplicates(urls, keepFirst);
      setUrls(newUrls);
      updateResultCounts(newUrls);
      setIsProcessing(false);
    }
  }, [urls, updateResultCounts]);

  const fixAllSchemesAction = useCallback(() => {
    setIsProcessing(true);
    
    if (workerRef.current && urls.length > 100) {
      workerRef.current.postMessage({
        type: 'fixAllSchemes',
        urls
      });
    } else {
      const newUrls = fixAllMissingSchemes(urls);
      setUrls(newUrls);
      updateResultCounts(newUrls);
      setIsProcessing(false);
    }
  }, [urls, updateResultCounts]);

  const removeUrl = useCallback((id: string) => {
    const newUrls = urls.filter(u => u.id !== id);
    setUrls(newUrls);
    updateResultCounts(newUrls);
  }, [urls, updateResultCounts]);

  const fixUrl = useCallback((id: string) => {
    const newUrls = urls.map(u => {
      if (u.id === id && u.status === 'missing-scheme') {
        return {
          ...u,
          url: u.url.startsWith('http') ? u.url : `https://${u.original}`,
          status: 'valid' as const,
          statusMessage: 'Valid URL (scheme added)'
        };
      }
      return u;
    });
    setUrls(newUrls);
    updateResultCounts(newUrls);
  }, [urls, updateResultCounts]);

  const cleanAllAction = useCallback((stripAll = false) => {
    setIsProcessing(true);
    const newUrls = cleanAllURLs(urls, { stripAll });
    setUrls(newUrls);
    updateResultCounts(newUrls);
    setIsProcessing(false);
  }, [urls, updateResultCounts]);

  const clear = useCallback(() => {
    setResult(EMPTY_RESULT);
    setUrls([]);
    setError(null);
    setProgress(0);
    setProgressMessage('');
  }, []);

  return {
    result,
    urls,
    isProcessing,
    progress,
    progressMessage,
    error,
    parse,
    removeDuplicatesAction,
    fixAllSchemesAction,
    cleanAllAction,
    removeUrl,
    fixUrl,
    clear
  };
};
