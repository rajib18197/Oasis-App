import { useState } from "react";

const starRatingStyle = {
  backgroundColor: "#101d28",
  color: "white",
  padding: "2rem",
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const starsStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  fontSize: "1.6rem",
};

const starStyle = {
  display: "block",
  width: "48px",
  height: "48px",
  cursor: "pointer",
};

const stars = [
  { half: 0.5, full: 1 },
  { half: 1.5, full: 2 },
  { half: 2.5, full: 3 },
  { half: 3.5, full: 4 },
  { half: 4.5, full: 5 },
];

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRatingChange(rate) {
    setRating((cur) => (cur === rate ? 0 : rate));
  }

  function handleTempRatingChnage(rate) {
    setTempRating(rate);
  }

  return (
    <div style={starRatingStyle}>
      <div style={starsStyle}>
        {stars.map((star) => (
          <Star
            key={star.full}
            // isFull={(tempRating || rating) >= i + 1}
            isFull={rating && rating >= star.full}
            isHalf={rating && rating === star.half}
            rate={star}
            onRate={handleRatingChange}
            // onHoverRate={() => handleTempRatingChnage(i + 1)}
            // onLeaveRate={() => handleTempRatingChnage(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

function Star({ isFull, isHalf, rate, onRate, onHoverRate, onLeaveRate }) {
  function handleClick(e) {
    const coords = e.target.getBoundingClientRect();
    const clickPosition = e.clientX;
    console.log(coords, clickPosition);
    const diff = clickPosition - coords.left <= Math.round(coords.width / 2);
    if (diff) {
      onRate(rate.half);
    } else {
      onRate(rate.full);
    }
  }

  return (
    <span
      role="button"
      style={starStyle}
      onClick={handleClick}
      // onMouseOver={onHoverRate}
      // onMouseLeave={onLeaveRate}
    >
      {isFull ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="yellow"
          stroke="yellow"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : isHalf ? (
        "half"
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="yellow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
