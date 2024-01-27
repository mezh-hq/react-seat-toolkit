import React from "react";
import ReactDOM from "react-dom/client";
import { CursorProvider } from "react-seat-designer";
import "@/styles/index.css";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CursorProvider>
      <App />
    </CursorProvider>
  </React.StrictMode>
);
