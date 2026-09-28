import { useEffect, useState } from "react";

import PortfolioDeck from "./components/PortfolioDeck";
import ProjectSubpage from "./components/ProjectSubpage";
import { getProjectIdFromPathname } from "./projectNavigation";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const projectId = getProjectIdFromPathname(pathname);

  if (projectId) {
    return <ProjectSubpage projectId={projectId} />;
  }

  return <PortfolioDeck />;
}

export default App;
