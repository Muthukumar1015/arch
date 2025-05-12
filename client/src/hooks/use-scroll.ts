import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrolled: boolean;
  scrollDirection: "up" | "down" | null;
  reachedBottom: boolean;
}

export function useScroll(threshold = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrolled: false,
    scrollDirection: null,
    reachedBottom: false
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > threshold;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";

      // Check if we've reached the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const reachedBottom = windowHeight + currentScrollY >= documentHeight - 100;

      setScrollPosition({
        scrollY: currentScrollY,
        scrolled,
        scrollDirection,
        reachedBottom
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrollPosition;
}
