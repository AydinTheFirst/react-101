import { Routes } from "@generouted/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
