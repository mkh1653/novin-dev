import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NotificationProvider } from "./components/NotifContext.tsx";
import Notification from "./components/notification.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <App />
      <Notification />
    </NotificationProvider>
  </StrictMode>
);
