import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div id="wrapper" className="d-flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column w-100">

        {/* Main Content */}
        <div id="content">

          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <div className="container-fluid p-4">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}