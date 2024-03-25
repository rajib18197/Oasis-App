import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useQuery({ queryKey, queryFn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const ref = useRef();

  useLayoutEffect(() => {
    ref.current = queryFn;
  }, [queryFn]);

  useEffect(function () {
    let ignore = false;

    async function loadData() {
      try {
        const results = await ref.current();
        if (!ignore) {
          setData(results);
        }
      } catch (err) {
        console.error(err);
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  return { isLoading, data, isError, error };
}
