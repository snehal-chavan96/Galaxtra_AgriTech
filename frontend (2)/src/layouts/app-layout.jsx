import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div>
      <div className=""></div>
      <main className="min-h-screen ">
        <Header/>
        <Outlet />
      </main>

    </div>
  );
};

export default AppLayout;
