export default function DeckNavigation({
  slides,
  currentSlide,
  previewSlide,
  onSlideChange,
}) {
  return (
    <header className="deck-header">
      <nav className="deck-navigation">
        {slides.map((slide, index) => (
          <a
            key={slide.title}
            href={slide.path}
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
              onSlideChange(index);
            }}
            aria-current={currentSlide === index ? "page" : undefined}
            data-preview={previewSlide === index ? "true" : undefined}
          >
            {slide.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
