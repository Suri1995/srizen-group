"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

/** Adds a `reveal` fade-up-on-scroll effect. Attach ref to any element. */
export default function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
