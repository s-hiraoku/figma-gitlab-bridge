import { useCallback, useEffect, useRef } from "react";

const DEFAULT_DELAY_MS = 500;

type Debounce = { debounce: (fn: () => void) => void };

export const useDebounce = (timeout: number = DEFAULT_DELAY_MS): Debounce => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [timeout]);

  const debounce = useCallback(
    (fn: () => void) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn();
        timer.current = null;
      }, timeout);
    },
    [timeout]
  );

  return { debounce };
};
