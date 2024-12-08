import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <Outlet />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
