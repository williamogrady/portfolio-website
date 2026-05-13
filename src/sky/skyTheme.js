export const skyStops = [
  {
    hour: 0,
    top: "#071321",
    mid: "#0f2440",
    low: "#1e3858",
    glow: "#b9c8d8",
  },
  {
    hour: 5.5,
    top: "#315f94",
    mid: "#e08f6e",
    low: "#ffd29a",
    glow: "#ffd67d",
  },
  {
    hour: 9,
    top: "#49a3df",
    mid: "#83c9f2",
    low: "#d9f3ff",
    glow: "#fff2b8",
  },
  {
    hour: 17,
    top: "#2e78bd",
    mid: "#7ebde5",
    low: "#ffd1a3",
    glow: "#ffbd71",
  },
  {
    hour: 20.5,
    top: "#10233c",
    mid: "#274a78",
    low: "#c77871",
    glow: "#f29c6b",
  },
  {
    hour: 24,
    top: "#071321",
    mid: "#0f2440",
    low: "#1e3858",
    glow: "#b9c8d8",
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

export function getForegroundTheme(hour) {
  const isDaytime = hour >= 6.5 && hour < 19.5;

  return isDaytime ? foregroundThemes.light : foregroundThemes.dark;
}

export function getSkyThemeForHour(hour) {
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

export function getSkyTheme(date) {
  const hour = date.getHours() + date.getMinutes() / 60;

  return getSkyThemeForHour(hour);
}

export function getSkyHour(date) {
  return date.getHours() + date.getMinutes() / 60;
}

export function getCelestialBody(hour) {
  const sunRise = 5;
  const sunSet = 18;
  const isSun = hour >= sunRise && hour < sunSet;
  const progress = isSun
    ? (hour - sunRise) / (sunSet - sunRise)
    : ((hour >= sunSet ? hour : hour + 24) - sunSet) / (24 - sunSet + sunRise);
  const left = 8 + progress * 84;
  const top = 72 - Math.sin(progress * Math.PI) * 52;

  return {
    label: isSun ? "Sun" : "Moon",
    style: {
      "--sky-body-left": `${left}%`,
      "--sky-body-top": `${top}%`,
    },
    className: isSun ? "sky-lab__body--sun" : "sky-lab__body--moon",
  };
}

export function formatSkyHour(hour) {
  const hours = Math.floor(hour);
  const minutes = Math.round((hour - hours) * 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
