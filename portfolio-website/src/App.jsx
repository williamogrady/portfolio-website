import PortfolioDeck from "./components/PortfolioDeck";
import SkyLab from "./components/sky/SkyLab";

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  let pathname = window.location.pathname.toLowerCase().replace(/\/+$/, "");

  if (basePath && pathname.startsWith(basePath.toLowerCase())) {
    pathname = pathname.slice(basePath.length) || "/home";
  }

  if (pathname === "/sky-lab") {
    return <SkyLab />;
  }

  return <PortfolioDeck />;
}

export default App;
