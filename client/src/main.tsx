import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const PrivyApp = lazy(() => import("./PrivyApp"));

function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-white/50">Loading...</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.hasAttribute("data-reactroot")) {
  rootElement.setAttribute("data-reactroot", "true");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <PrivyApp />
      </Suspense>
    </React.StrictMode>
  );
}
