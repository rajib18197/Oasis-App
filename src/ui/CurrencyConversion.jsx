import { useCallback, useRef, useState } from "react";

export default function CurrencyConversion() {
  const [curPage, setCurPage] = useState(1);

  let intObserver = useRef();

  const lastPostRef = useCallback(
    function (post) {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setCurPage((cur) => cur + 1);
        }
      });

      if (post) intObserver.observe(post);
    },
    [isLoading, hasNextPage]
  );
}
