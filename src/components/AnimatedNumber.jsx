import { useEffect, useState } from "react";

export default function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(duration / value));

    const timer = setInterval(() => {
      start += Math.ceil(value / (duration / step));
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, step);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}
