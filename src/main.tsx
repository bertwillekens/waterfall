import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css"; // Import Tailwind CSS

declare global {
  interface Window {
    renderMyWidget: (containerId: string) => void;
  }
}

function main() {
  window.addEventListener("load", function () {
    const container = document.body;
    if (!container) return;

    let element = document.getElementById("demo-tool");
    if (!element) {
      element = document.createElement("div");
      element.id = "demo-tool";
      document.body.appendChild(element);
    }

    const root = createRoot(element);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
}

main();
