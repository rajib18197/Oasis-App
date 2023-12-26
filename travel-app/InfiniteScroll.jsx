import { useCallback, useRef, useState } from "react";
import { useApi } from "./useApi";

export default function InfiniteScroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const { results, isLoading, hasNextPage } = useApi(currentPage);

  const ref = useRef();

  const lastPost = useCallback(function lastPost(post) {
    console.log(post);
    if (isLoading) return;

    ref.current?.disconnect();

    function scroll(entries) {
      if (entries[0].isIntersecting && hasNextPage) {
        setCurrentPage((page) => page + 1);
      }
    }

    ref.current = new IntersectionObserver(scroll);
    post && ref.current.observe(post);
  }, [isLoading, hasNextPage]);

  return (
    <div>
      <nav>
        <a href="#top">Header</a>
      </nav>

      <section className="container-post">
        {results.map((res, i) => (
          <div
            key={res.id}
            className="post"
            {...(results.length === i + 1 ? { ref: lastPost } : {})}
          >
            <h1>{i + 1}</h1>
            <h3>{res.title}</h3>
            <p>{res.body}</p>
          </div>
        ))}
      </section>
      {isLoading && <h2>Loading More post...</h2>}
    </div>
  );
}
