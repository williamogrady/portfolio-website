import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function DeckNavigation({
  slides,
  currentSlide,
  slidePosition,
  onSlideChange,
  getRoutedPath,
}) {
  const navigationRef = useRef(null);
  const linkRefs = useRef([]);
  const releaseIndicatorLockRef = useRef(0);
  const [indicatorStyle, setIndicatorStyle] = useState(null);
  const [lockedIndicatorSize, setLockedIndicatorSize] = useState(null);

  useLayoutEffect(() => {
    function updateIndicator() {
      const navigationElement = navigationRef.current;
      const linkElements = linkRefs.current;

      if (!navigationElement || linkElements.length === 0) {
        return;
      }

      const navigationRect = navigationElement.getBoundingClientRect();
      const firstIndex = Math.max(0, Math.min(slides.length - 1, Math.floor(slidePosition)));
      const secondIndex = Math.max(0, Math.min(slides.length - 1, Math.ceil(slidePosition)));
      const firstElement = linkElements[firstIndex];
      const secondElement = linkElements[secondIndex] ?? firstElement;

      if (!firstElement || !secondElement) {
        return;
      }

      const firstRect = firstElement.getBoundingClientRect();
      const secondRect = secondElement.getBoundingClientRect();
      const localProgress = slidePosition - firstIndex;
      const centerProgress = firstIndex === secondIndex ? 0 : localProgress;
      const shapeProgress = Math.abs((localProgress || 0) - 0.5) * 2;
      const circleSize = 18;
      const horizontalPadding = 18;
      const firstWidth = firstRect.width + horizontalPadding;
      const secondWidth = secondRect.width + horizontalPadding;
      const interpolatedWidth = firstWidth + ((secondWidth - firstWidth) * centerProgress);
      const unlockedWidth = circleSize + ((interpolatedWidth - circleSize) * shapeProgress);
      const unlockedHeight = circleSize + ((firstRect.height + 8 - circleSize) * shapeProgress);
      const width = lockedIndicatorSize?.width ?? unlockedWidth;
      const height = lockedIndicatorSize?.height ?? unlockedHeight;
      const firstCenter = firstRect.left - navigationRect.left + (firstRect.width / 2);
      const secondCenter = secondRect.left - navigationRect.left + (secondRect.width / 2);
      const center = firstCenter + ((secondCenter - firstCenter) * centerProgress);
      const top = firstRect.top - navigationRect.top + (firstRect.height / 2) - (height / 2);

      setIndicatorStyle({
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate3d(${center - (width / 2)}px, ${top}px, 0)`,
      });
    }

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [lockedIndicatorSize, slidePosition, slides.length]);

  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, slides.length);
  }, [slides.length]);

  useEffect(() => {
    return () => window.clearTimeout(releaseIndicatorLockRef.current);
  }, []);

  function lockIndicatorForClick() {
    setLockedIndicatorSize(currentSize => {
      if (currentSize) {
        return currentSize;
      }

      const currentWidth = Number.parseFloat(indicatorStyle?.width);
      const currentHeight = Number.parseFloat(indicatorStyle?.height);

      if (!Number.isFinite(currentWidth) || !Number.isFinite(currentHeight)) {
        return null;
      }

      return { width: currentWidth, height: currentHeight };
    });

    window.clearTimeout(releaseIndicatorLockRef.current);
    releaseIndicatorLockRef.current = window.setTimeout(() => {
      setLockedIndicatorSize(null);
    }, 720);
  }

  return (
    <header className="deck-header">
      <nav className="deck-navigation" ref={navigationRef}>
        {indicatorStyle && (
          <span
            className={`deck-navigation__indicator${lockedIndicatorSize ? " deck-navigation__indicator--locked" : ""}`}
            style={indicatorStyle}
            aria-hidden="true"
          />
        )}
        {slides.map((slide, index) => (
          <a
            key={slide.title}
            ref={element => {
              linkRefs.current[index] = element;
            }}
            href={getRoutedPath(slide.path)}
            onClick={(event) => {
              if (
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }

              event.preventDefault();
              lockIndicatorForClick();
              onSlideChange(index);
            }}
            aria-current={currentSlide === index ? "page" : undefined}
            data-highlighted={Math.abs(slidePosition - index) < 0.34 ? "true" : undefined}
          >
            {slide.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
