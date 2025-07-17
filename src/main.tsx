import "bootstrap/dist/css/bootstrap.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./shared/context/AuthContext.tsx";

async function enableMocksAndRenderApp() {
  const { worker } = await import("./mocks/browser");
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  await worker.start({
    serviceWorker: {
      url: `${base}/mockServiceWorker.js`,
      options: { scope: `${base}/` },
    },
  });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
}

enableMocksAndRenderApp();
