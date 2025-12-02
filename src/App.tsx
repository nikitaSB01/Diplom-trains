import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/global.css";
import { useEffect } from "react";
import { scrollToHash } from "./utils/scrollToHash";

function App() {

  useEffect(() => {
    scrollToHash();

    const handler = () => scrollToHash();
    window.addEventListener("hashchange", handler);

    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;