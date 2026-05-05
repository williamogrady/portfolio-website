import { useEffect, useMemo, useState } from "react";

import SkyCloudField from "./sky/SkyCloudField";
import { getCelestialBody, getSkyHour, getSkyTheme } from "../sky/skyTheme";

export default function DeckBackground() {
  const [now, setNow] = useState(() => new Date());
  const skyTheme = useMemo(() => getSkyTheme(now), [now]);
  const celestialBody = useMemo(
    () => getCelestialBody(getSkyHour(now)),
    [now]
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(skyTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [skyTheme]);

  return (
    <div className="deck-background">
      <div className="deck-background__sky" aria-hidden="true" />
      <div
        className={`sky-lab__body ${celestialBody.className}`}
        style={celestialBody.style}
        aria-hidden="true"
      />
      <SkyCloudField />
    </div>
  );
}
