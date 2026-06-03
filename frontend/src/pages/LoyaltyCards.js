import { useEffect, useState } from "react";
import api from "../api/axios";
import { getUser } from "../utils/auth";

const user = getUser();

export default function LoyaltyCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await api.get("/loyalty");
      setCards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete loyalty card?")) return;

    try {
      await api.delete(`/loyalty/${id}`);
      fetchCards();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/loyalty-cards/edit/${id}`;
  };

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Loyalty Cards</h3>

        <a
          href="/loyalty-cards/create"
          className="btn btn-primary"
        >
          + Create Loyalty Card
        </a>
      </div>

      <div className="table-responsive">

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Card Number</th>
              <th>Points</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {cards.map((card) => (
              <tr key={card.id}>

                <td>{card.id}</td>
                <td>{card.Customer? `${card.Customer.first_name} ${card.Customer.last_name}`: "N/A"}</td>

                <td>{card.card_number}</td>

                <td>{card.total_points}</td>

                <td>{card.level}</td>

                <td>

                  {(user?.roles?.includes("Admin") ||
                    user?.roles?.includes("Manager")) && (
                    <>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(card.id)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(card.id)}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}