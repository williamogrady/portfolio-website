function HomeSlide() {
  return (
    <div className="centered-slide home-slide">
      <div className="home-slide__greeting">
        <h1 aria-label="William O'Grady">
          <span className="home-slide__name-part home-slide__name-part--first">William</span>
          <span className="home-slide__name-part home-slide__name-part--last">O'Grady</span>
        </h1>
        <p className="home-slide__subtitle">Web Portfolio</p>
      </div>
      <div className="home-slide__scroll-cue" aria-hidden="true" />
    </div>
  );
}

export default HomeSlide;
