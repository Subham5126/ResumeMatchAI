import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "14px",
            background: "#0b1512",
            color: "#e6f4ef",
            border: "1px solid #1c2f29",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#04110d",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <App />
    </>
  </React.StrictMode>
);
