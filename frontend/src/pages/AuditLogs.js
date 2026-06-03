import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // viq admini mund te shikoj logs
    if (!user?.roles?.includes("Admin")) return;

    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/activity-logs");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // nese useri sosht admin
  if (!user?.roles?.includes("Admin")) {
    return (
      <div className="container mt-5">
        <h4 className="text-danger">
          You do not have access to this page
        </h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <div className="card shadow p-3">

        <h3>Audit Logs</h3>

        <table className="table table-striped mt-3">

          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Entity ID</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user_id}</td>
                <td>{log.action_type}</td>
                <td>{log.entity_name}</td>
                <td>{log.entity_id}</td>
                <td>{log.description}</td>
                <td>
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}