export function getPathnameWithoutBase(pathname = window.location.pathname) {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  let normalizedPath = pathname.toLowerCase().replace(/\/+$/, "") || "/";

  if (basePath && normalizedPath.startsWith(basePath.toLowerCase())) {
    normalizedPath = normalizedPath.slice(basePath.length) || "/";
  }

  return normalizedPath;
}

export function getLabPath(path) {
  const normalizedBase = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${normalizedBase}${path}`;
}

export function isCarouselRoute(pathname = window.location.pathname) {
  const path = getPathnameWithoutBase(pathname);
  return path === "/carousel" || path.startsWith("/carousel/");
}

export function getCarouselProjectId(pathname = window.location.pathname) {
  const path = getPathnameWithoutBase(pathname);

  if (path === "/carousel") {
    return null;
  }

  const match = path.match(/^\/carousel\/([^/]+)$/);
  return match ? match[1] : null;
}

export function navigateLab(path) {
  window.history.pushState(null, "", getLabPath(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
}
