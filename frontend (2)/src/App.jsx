import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/app-layout";
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";


import "./App.css";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Community from "./pages/Community";
import ExpertHelp from "./pages/ExpertHelp";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import VideoCallPage from "./pages/VideoCallPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/chatbot",
        element: <Chatbot />,
      },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "//video-call/:roomName",
        element: <VideoCallPage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/community",
        element: <Community />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/expert",
        element: <ExpertHelp />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/schemes",
        element: <GovernmentSchemes />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
