const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

export function getHomePath() {
  return `${basePath}/home/`;
}

export function getProjectPath(projectId) {
  return `${basePath}/projects/${encodeURIComponent(projectId)}`;
}

export function getProjectIdFromPathname(pathname) {
  let normalizedPath = pathname.toLowerCase().replace(/\/+$/, "") || "/";

  if (basePath && normalizedPath.startsWith(basePath.toLowerCase())) {
    normalizedPath = normalizedPath.slice(basePath.length) || "/";
  }

  const match = normalizedPath.match(/^\/projects\/([^/]+)$/);

  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

export function navigateToPath(path) {
  window.history.pushState(null, "", `${basePath}${path}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}