import "bootstrap/dist/css/bootstrap.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { worker } from "./mocks/browser.ts";
import "bootstrap/dist/css/bootstrap.css";

worker.start({
  serviceWorker: {
    url: import.meta.env.BASE_URL + "/mockServiceWorker.js"
  }
}).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
