import { useEffect, useMemo, useState } from "react";

import SkyCloudField from "./sky/SkyCloudField";
import {
  getCelestialBody,
  getSkyHour,
  getSkyTheme,
  getSkyThemeForHour,
} from "../sky/skyTheme";

const fixedSkyHours = {
  light: 11,
  dark: 22,
};

export default function DeckBackground({ skyMode }) {
  const [now, setNow] = useState(() => new Date());
  const skyHour = skyMode === "live" ? getSkyHour(now) : fixedSkyHours[skyMode];
  const skyTheme = useMemo(
    () => skyMode === "live" ? getSkyTheme(now) : getSkyThemeForHour(skyHour),
    [now, skyHour, skyMode]
  );
  const celestialBody = useMemo(() => getCelestialBody(skyHour), [skyHour]);

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
