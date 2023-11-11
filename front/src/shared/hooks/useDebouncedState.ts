import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';


export const useDebouncedState = <T>(initialValue: T, ms: number = 500): [T, Dispatch<SetStateAction<T>>, T, boolean] => {
  const [value, setValue] = useState(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (value !== debouncedValue) {
      setIsDebouncing(true);
      timeoutRef.current = window.setTimeout(() => {
        setDebouncedValue(value);
        setIsDebouncing(false);
      }, ms);
    }

    return () => {
      window.clearTimeout(timeoutRef.current);
      setIsDebouncing(false);
    };
  }, [value, debouncedValue, ms]);

  return [value, setValue, debouncedValue, isDebouncing];
};
