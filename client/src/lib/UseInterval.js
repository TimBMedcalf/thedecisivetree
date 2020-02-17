import { useEffect, useRef } from 'react';

// This function enables use of use effect and set intervals to combat lifecycle issues
// See more explanation here https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default function useInterval(callback, delay, ...args) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(...args);
    }
    if (delay !== null && delay !== undefined) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
