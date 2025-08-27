import { useRef } from "react";

type AnyFn = (...args: never[]) => void;

const useDebounce = <T extends AnyFn>(fn: T, delay = 300) => {
   const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

   return (...args: Parameters<T>) => {
     if (timer.current) clearTimeout(timer.current);
     timer.current = setTimeout(() => {
       fn(...args);
     }, delay);
   };
};

export default useDebounce;
