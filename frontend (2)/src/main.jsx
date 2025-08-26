import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "react-hot-toast";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <div
        className="relative h-[890px] rounded-3xl m-2 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://media.gettyimages.com/id/1325537339/video/beautiful-tea-farm-tea-farmer-group-harvesting-at-bao-loc-tea-farm-aerial-view-4k-resolution.jpg?s=640x640&k=20&c=3foDPrdy-PsyI9xmhjg7dhLbcR613mgpIAiZhRtT9FE=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <App />
      </div>
      <Toaster />
    </ClerkProvider>
  </React.StrictMode>
);
