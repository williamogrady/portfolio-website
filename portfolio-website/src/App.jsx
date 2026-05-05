import PortfolioDeck from "./components/PortfolioDeck";
import SkyLab from "./components/sky/SkyLab";

function App() {
  if (window.location.pathname.toLowerCase().replace(/\/+$/, "") === "/sky-lab") {
    return <SkyLab />;
  }

  return <PortfolioDeck />;
}

export default App;
