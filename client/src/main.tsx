import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Layout/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketProvider } from "./Socket.tsx";
import { LoginLayout } from "./Layout/LoginLayout.tsx";
import Login from "./pages/Login.tsx";
import { Home } from "./pages/Home.tsx";
import { User } from "./pages/User.tsx";
import { Card } from "./pages/Card.tsx";
import { Log } from "./pages/Log.tsx";
import { Warning } from "./pages/Warning.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "cards",
        element: <Card />,
      },
      {
        path: "logs",
        element: <Log/>,
      },
      {
        path: "warnings",
        element: <Warning/>,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
);
