import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

  // roles statike
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "User" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeRole = async (userId, roleId) => {
    try {
      await api.put(`/users/${userId}/role`, {
        role_id: roleId,
      });

      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating role");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Users Management</h3>

      <div className="card p-3 shadow">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const currentRoleId = u.Roles?.[0]?.id;

              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    {u.first_name} {u.last_name}
                  </td>
                  <td>{u.email}</td>

                  <td>
                    <select
                      className="form-select"
                      value={currentRoleId || ""}
                      onChange={(e) =>
                        changeRole(u.id, e.target.value)
                      }
                    >
                      <option value="">Select role</option>

                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>{u.status}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}