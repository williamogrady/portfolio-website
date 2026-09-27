import { useEffect, useState } from "react";

import PortfolioDeck from "./components/PortfolioDeck";
import CarouselLab from "../lab/carousel/CarouselLab";
import { isCarouselRoute } from "../lab/carousel/labNavigation";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (isCarouselRoute(pathname)) {
    return <CarouselLab pathname={pathname} />;
  }

  return <PortfolioDeck />;
}

export default App;
