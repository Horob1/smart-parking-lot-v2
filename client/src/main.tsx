import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Layout/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketProvider } from "./Socket.tsx";
import { LoginLayout } from "./Layout/LoginLayout.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
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
