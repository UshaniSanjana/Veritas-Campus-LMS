import { Outlet } from "react-router-dom";
import InstrcutorNavbar from "../components/instructorNavbar";

const InstructorLayout = () => (
  <>
    <InstrcutorNavbar />
    <div className="Instructor-content">
      <Outlet />
    </div>
  </>
);

export default InstructorLayout;
