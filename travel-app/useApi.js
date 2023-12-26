import { useEffect, useState } from "react";

export function useApi(currentPage = 1) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);
          setIsError(false);
          setError({});
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`
          );
          const data = await response.json();
          console.log(data);
          setIsLoading(false)
          setResults(prev => [...prev, ...data]);
          setHasNextPage(Boolean(data.length));
        } catch (err) {
          setIsLoading(false);
          setIsError(true);
          setError({ message: err.message });
        }
      }
      fetchData();
    },
    [currentPage]
  );

  return { results, isLoading, isError, error, hasNextPage };
}
