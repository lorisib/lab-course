export default function Topbar() {
  return (
    <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">

      <h5 className="mb-0">Dashboard</h5>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>
  );
}