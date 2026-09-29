import { useEffect, useState } from "react";

import PortfolioDeck from "./components/PortfolioDeck";
import ProjectSubpage from "./components/ProjectSubpage";
import { getProjectIdFromPathname } from "./projectNavigation";
import SkillsLab from "./lab/skills/SkillsLab";
import { isLabRoute } from "./lab/labNavigation";

const fadeOutDuration = 320;

function renderRoute(pathname) {
  if (isLabRoute("skills", pathname)) {
    return <SkillsLab />;
  }

  const projectId = getProjectIdFromPathname(pathname);

  if (projectId) {
    return <ProjectSubpage projectId={projectId} />;
  }

  return <PortfolioDeck />;
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (pathname === renderedPathname) {
      return undefined;
    }

    setIsFadingOut(true);

    const timeout = window.setTimeout(() => {
      setRenderedPathname(pathname);
      setIsFadingOut(false);
    }, fadeOutDuration);

    return () => window.clearTimeout(timeout);
  }, [pathname, renderedPathname]);

  return (
    <div className={`route-fade${isFadingOut ? " route-fade--out" : ""}`}>
      {renderRoute(renderedPathname)}
    </div>
  );
}

export default App;
