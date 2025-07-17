import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => (
  <>
    <Sidebar />
    <div className="admin-content">
      <Outlet />
    </div>
  </>
);

export default AdminLayout;
