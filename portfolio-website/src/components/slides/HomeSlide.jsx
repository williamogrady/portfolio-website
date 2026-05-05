import { useState } from "react";

import slides from "../../../data/slides";

function HomeSlide() {
  const { greetings } = slides.home;
  const [activeGreetingId, setActiveGreetingId] = useState(greetings[0].id);
  const activeGreeting = greetings.find(
    greeting => greeting.id === activeGreetingId
  );

  return (
    <div className="centered-slide home-slide">
      <div className="home-slide__greeting">
        <p className="home-slide__intro">{activeGreeting.intro}</p>
        <h1>{activeGreeting.name}</h1>
        <p className="home-slide__welcome">{activeGreeting.welcome}</p>
      </div>

      <div className="home-slide__flags" aria-label="Choose greeting language">
        {greetings.map(greeting => (
          <button
            key={greeting.id}
            className="home-slide__flag-button"
            type="button"
            aria-label={`Show greeting in ${greeting.language}`}
            aria-pressed={activeGreetingId === greeting.id}
            onClick={() => setActiveGreetingId(greeting.id)}
          >
            <img src={greeting.flag.src} alt={greeting.flag.alt} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomeSlide;
