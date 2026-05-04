export default function DeckNavigation({
  slides,
  currentSlide,
  onSlideChange,
}) {
  return (
    <header className="deck-header">
      <nav className="deck-navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => onSlideChange(index)}
            aria-current={currentSlide === index ? "page" : undefined}
          >
            {slide.title}
          </button>
        ))}
      </nav>
    </header>
  );
}
