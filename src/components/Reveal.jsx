// Reveal.jsx
// PURPOSE: A tiny wrapper that makes its content fade in (and slide up a little)
// the first time it scrolls into view. No library: it uses the browser's
// built-in IntersectionObserver. The animation itself is in App.css (.reveal).

import { useEffect, useRef, useState } from "react";

function Reveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? "reveal visible" : "reveal"}>
      {children}
    </div>
  );
}

export default Reveal;
