import { useEffect, useMemo, useState } from "react";

import SkyCloudField from "./sky/SkyCloudField";
import {
  getCelestialBody,
  getSkyHour,
  getSkyTheme,
  getSkyThemeForHour,
  isDaytimeHour,
} from "../sky/skyTheme";

const fixedSkyHours = {
  light: 11,
  dark: 22,
};

export default function DeckBackground({ skyMode, scrollProgress = 0 }) {
  const [now, setNow] = useState(() => new Date());
  const skyHour = skyMode === "live" ? getSkyHour(now) : fixedSkyHours[skyMode];
  const skyTheme = useMemo(
    () => skyMode === "live" ? getSkyTheme(now) : getSkyThemeForHour(skyHour),
    [now, skyHour, skyMode]
  );
  const celestialBody = useMemo(() => getCelestialBody(skyHour), [skyHour]);
  const backgroundStyle = {
    opacity: 1 - scrollProgress,
    filter: `saturate(${100 - scrollProgress * 42}%) brightness(${1 + scrollProgress * 0.08})`,
  };

  useEffect(() => {
    if (skyMode !== "live") {
      return undefined;
    }

    const timer = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(timer);
  }, [skyMode]);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(skyTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [skyTheme]);

  // Reflects the actual visual theme (including live mode's time-of-day) so every
  // hardcoded dark-mode override in CSS (icons, headings, etc.) stays in sync.
  useEffect(() => {
    const isDark = !isDaytimeHour(skyHour);

    document.body.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-light", !isDark);

    return () => {
      document.body.classList.remove("theme-dark", "theme-light");
    };
  }, [skyHour]);

  return (
    <div className="deck-background" style={backgroundStyle}>
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
