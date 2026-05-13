import { useEffect, useMemo, useState } from "react";

import SkyCloudField from "./SkyCloudField";
import {
  formatSkyHour,
  getCelestialBody,
  getSkyThemeForHour,
  skyStops,
} from "../../sky/skyTheme";

function getCurrentHour() {
  const now = new Date();

  return now.getHours() + now.getMinutes() / 60;
}

export default function SkyLab() {
  const [hour, setHour] = useState(getCurrentHour);
  const [isLive, setIsLive] = useState(true);
  const skyTheme = useMemo(() => getSkyThemeForHour(hour), [hour]);
  const celestialBody = useMemo(() => getCelestialBody(hour), [hour]);

  useEffect(() => {
    if (!isLive) {
      return undefined;
    }

    const timer = window.setInterval(() => setHour(getCurrentHour()), 60_000);

    return () => window.clearInterval(timer);
  }, [isLive]);

  function handleHourChange(event) {
    setIsLive(false);
    setHour(Number(event.target.value));
  }

  return (
    <main className="sky-lab" style={skyTheme}>
      <div className="sky-lab__scene" aria-hidden="true">
        <div
          className={`sky-lab__body ${celestialBody.className}`}
          style={celestialBody.style}
          title={celestialBody.label}
        />
        <SkyCloudField />
        <div className="sky-lab__horizon" />
      </div>

      <section className="sky-lab__panel" aria-label="Sky controls">
        <div>
          <p>Sky Lab</p>
          <output htmlFor="sky-lab-time">{formatSkyHour(hour)}</output>
        </div>

        <input
          id="sky-lab-time"
          type="range"
          min="0"
          max="23.75"
          step="0.25"
          value={hour}
          onChange={handleHourChange}
        />

        <div className="sky-lab__actions">
          <button type="button" onClick={() => setIsLive(true)}>
            Live
          </button>
          <a href={`${import.meta.env.BASE_URL}home/`}>Portfolio</a>
        </div>

        <div className="sky-lab__stops" aria-label="Color stop times">
          {skyStops.slice(0, -1).map(stop => (
            <button
              key={stop.hour}
              type="button"
              onClick={() => {
                setIsLive(false);
                setHour(stop.hour);
              }}
            >
              {formatSkyHour(stop.hour)}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
