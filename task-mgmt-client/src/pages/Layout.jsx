import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Asidebar from "../components/Asidebar";

const Layout = () => {
  return (
    <div className="layout-container">

      <Navbar />

      <div className="main-layout">

        <Asidebar />

        <div className="content-area">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default Layout;