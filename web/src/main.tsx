import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { VisitInsightsProvider } from "./state/visitInsights";
import { ThemeProvider } from "./state/theme";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <VisitInsightsProvider>
          <App />
        </VisitInsightsProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
