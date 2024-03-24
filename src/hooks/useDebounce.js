import { useEffect, useRef } from "react";

export function useDebounce(callback, delay) {
  const ref = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(ref.current);
    };
  }, []);

  function doSearch(...args) {
    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  return { doSearch };
}

// let num = -90;
// let n = num < 0 ? num * -1 : num;
// let rev = 0;
// while (n !== 0) {
//   let rem = n % 10;
//   rev = rev * 10 + rem;
//   n = Math.floor(n / 10);
// }
// rev = num < 0 ? -rev : rev;
// console.log(rev);
