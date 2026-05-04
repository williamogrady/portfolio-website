import { useEffect, useMemo, useState } from "react";

const skyStops = [
  {
    hour: 0,
    top: "#071321",
    mid: "#0f2440",
    low: "#1e3858",
    glow: "#b9c8d8",
    surface: "#102037",
    surfaceStrong: "#18304d",
    text: "#d8e2ea",
    heading: "#f7fbff",
    muted: "#aebdca",
    border: "#44627c",
    accent: "#c3d0d8",
  },
  {
    hour: 5.5,
    top: "#315f94",
    mid: "#e08f6e",
    low: "#ffd29a",
    glow: "#ffd67d",
    surface: "#fff2dc",
    surfaceStrong: "#fffaf1",
    text: "#2f3635",
    heading: "#111b1f",
    muted: "#59625f",
    border: "#c99f78",
    accent: "#596f79",
  },
  {
    hour: 9,
    top: "#49a3df",
    mid: "#83c9f2",
    low: "#d9f3ff",
    glow: "#fff2b8",
    surface: "#f4fbff",
    surfaceStrong: "#ffffff",
    text: "#23323b",
    heading: "#071923",
    muted: "#526b78",
    border: "#9fc6db",
    accent: "#2f6f91",
  },
  {
    hour: 17,
    top: "#2e78bd",
    mid: "#7ebde5",
    low: "#ffd1a3",
    glow: "#ffbd71",
    surface: "#fff4e7",
    surfaceStrong: "#fffaf2",
    text: "#2e3333",
    heading: "#11191a",
    muted: "#66706d",
    border: "#d2a984",
    accent: "#63737b",
  },
  {
    hour: 20.5,
    top: "#10233c",
    mid: "#274a78",
    low: "#c77871",
    glow: "#f29c6b",
    surface: "#172942",
    surfaceStrong: "#223956",
    text: "#dce5eb",
    heading: "#fbfdff",
    muted: "#b5c2cb",
    border: "#55708a",
    accent: "#c9d2d7",
  },
  {
    hour: 24,
    top: "#071321",
    mid: "#0f2440",
    low: "#1e3858",
    glow: "#b9c8d8",
    surface: "#102037",
    surfaceStrong: "#18304d",
    text: "#d8e2ea",
    heading: "#f7fbff",
    muted: "#aebdca",
    border: "#44627c",
    accent: "#c3d0d8",
  },
];

const foregroundThemes = {
  light: {
    "--bg": "#f6fbff",
    "--surface": "#f6fbff",
    "--surface-strong": "#ffffff",
    "--text": "#24343e",
    "--text-h": "#071923",
    "--text-muted": "#526a77",
    "--border": "#9fc6db",
    "--accent": "#2f6f91",
  },
  dark: {
    "--bg": "#102037",
    "--surface": "#102037",
    "--surface-strong": "#18304d",
    "--text": "#d8e2ea",
    "--text-h": "#f7fbff",
    "--text-muted": "#aebdca",
    "--border": "#44627c",
    "--accent": "#c3d0d8",
  },
};

function hexToRgb(hex) {
  const value = hex.replace("#", "");

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function mixColor(start, end, progress) {
  const a = hexToRgb(start);
  const b = hexToRgb(end);
  const channel = key => Math.round(a[key] + (b[key] - a[key]) * progress);

  return `rgb(${channel("r")} ${channel("g")} ${channel("b")})`;
}

function getForegroundTheme(hour) {
  const isDaytime = hour >= 6.5 && hour < 19.5;

  return isDaytime ? foregroundThemes.light : foregroundThemes.dark;
}

function getSkyTheme(date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  const startIndex = skyStops.findLastIndex(stop => hour >= stop.hour);
  const start = skyStops[startIndex];
  const end = skyStops[startIndex + 1] ?? skyStops[0];
  const span = end.hour - start.hour || 24;
  const progress = (hour - start.hour) / span;

  return {
    "--sky-top": mixColor(start.top, end.top, progress),
    "--sky-mid": mixColor(start.mid, end.mid, progress),
    "--sky-low": mixColor(start.low, end.low, progress),
    "--sky-glow": mixColor(start.glow, end.glow, progress),
    ...getForegroundTheme(hour),
  };
}

export default function DeckBackground() {
  const [now, setNow] = useState(() => new Date());
  const [testHour, setTestHour] = useState(null);
  const displayTime = useMemo(() => {
    if (testHour === null) {
      return now;
    }

    const nextTime = new Date(now);
    const hours = Math.floor(testHour);
    const minutes = Math.round((testHour - hours) * 60);
    nextTime.setHours(hours, minutes, 0, 0);

    return nextTime;
  }, [now, testHour]);
  const skyTheme = useMemo(() => getSkyTheme(displayTime), [displayTime]);
  const testLabel = displayTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
      <div className="deck-background__cloud-layer" aria-hidden="true" />
      <div className="deck-background-controls">
        <label htmlFor="sky-time">Sky time</label>
        <input
          id="sky-time"
          type="range"
          min="0"
          max="23.75"
          step="0.25"
          value={testHour ?? displayTime.getHours() + displayTime.getMinutes() / 60}
          onChange={event => setTestHour(Number(event.target.value))}
        />
        <output htmlFor="sky-time">{testLabel}</output>
        <button type="button" onClick={() => setTestHour(null)}>
          Live
        </button>
      </div>
    </div>
  );
}
