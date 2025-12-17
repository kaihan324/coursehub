import React from "react";

export default function RatingStars({ value = 0 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "☆";
    return "✩";
  });

  return (
    <span className="rating">
      {stars.join(" ")} <span className="ms-1 text-muted">({value.toFixed(1)})</span>
    </span>
  );
}
