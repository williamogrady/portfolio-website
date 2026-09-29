export function getPathnameWithoutBase(pathname = window.location.pathname) {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  let normalizedPath = pathname.toLowerCase().replace(/\/+$/, "") || "/";

  if (basePath && normalizedPath.startsWith(basePath.toLowerCase())) {
    normalizedPath = normalizedPath.slice(basePath.length) || "/";
  }

  return normalizedPath;
}

export function getLabPath(path) {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${basePath}${path}`;
}

export function isLabRoute(labName, pathname = window.location.pathname) {
  const path = getPathnameWithoutBase(pathname);
  return path === `/lab/${labName}` || path.startsWith(`/lab/${labName}/`);
}
