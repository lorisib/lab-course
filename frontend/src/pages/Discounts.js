import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Discounts() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    api.get("/discounts").then((res) => setDiscounts(res.data));
  }, []);

  return (
    <div>
      <h3>Discounts</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {discounts.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.discount_type}</td>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}