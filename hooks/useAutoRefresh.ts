import { useState, useEffect, useRef } from 'react';

interface AutoRefreshOptions<T> {
  fetchData: () => Promise<T[] | null>;
  intervalMs: number;
  idKey: keyof T;
  onNewData?: (newItems: T[]) => void;
}

export function useAutoRefresh<T extends Record<string, any>>({
  fetchData,
  intervalMs,
  idKey,
  onNewData,
}: AutoRefreshOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const knownIdsRef = useRef<Set<any>>(new Set());
  const initialFetchDone = useRef(false);

  const fetchRef = useRef(fetchData);
  const onNewDataRef = useRef(onNewData);

  useEffect(() => {
    fetchRef.current = fetchData;
    onNewDataRef.current = onNewData;
  }, [fetchData, onNewData]);

  useEffect(() => {
    let mounted = true;
    let timer: NodeJS.Timeout;

    const performFetch = async (isInitial = false) => {
      try {
        if (isInitial) setIsLoading(true);
        const result = await fetchRef.current();
        if (!mounted || !result) return;

        if (!initialFetchDone.current) {
          const currentIds = new Set(result.map((item) => item[idKey]));
          knownIdsRef.current = currentIds;
          setData(result);
          initialFetchDone.current = true;
        } else {
          const newItems: T[] = [];
          const currentIds = new Set<any>();

          result.forEach((item) => {
            const id = item[idKey];
            currentIds.add(id);
            if (!knownIdsRef.current.has(id)) {
              newItems.push(item);
            }
          });

          knownIdsRef.current = currentIds;
          setData(result); 

          if (newItems.length > 0 && onNewDataRef.current) {
            onNewDataRef.current(newItems);
          }
        }
      } catch (error) {
        console.error('AutoRefresh fetch error:', error);
      } finally {
        if (mounted && isInitial) setIsLoading(false);
      }
    };

    performFetch(true);

    timer = setInterval(() => {
      performFetch(false);
    }, intervalMs);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [intervalMs, idKey]);

  const setOptimisticData = (updater: T[] | ((prev: T[]) => T[])) => {
    setData(updater);
  };

  return { data, isLoading, setOptimisticData };
}
