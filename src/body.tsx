import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar/sidebar";

export default function Body() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet />
      </div>
      <div className="drawer-side top-16 h-[calc(100vh-4rem)]">
        <label
          htmlFor="my-drawer-3 "
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
}
