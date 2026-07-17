import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [pgs, setPgs] = useState([]);

  const loadPGs = () => {
    API.get("/pg/getAllPGs.php")
      .then((res) => {
        if (res.data.success) {
          // Filter listings based on role
          if (user.role === "admin") {
            setPgs(res.data.data);
          } else {
            const owned = res.data.data.filter(
              (pg) => Number(pg.user_id) === Number(user.id)
            );
            setPgs(owned);
          }
        }
      })
      .catch(console.error);
  };

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    loadPGs();

  }, []);

  const deletePG = async (id) => {

    if (!window.confirm("Delete this listing?")) return;

    try {

      const res = await API.post("/admin/deletePG.php", {
        id,
        requester_id: user.id
      });

      if (res.data.success) {
        toast.success("Listing Deleted");
        loadPGs();
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }

  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="d-flex justify-content-between mb-4 align-items-center">

          <h2>{user.role === "admin" ? "Admin Dashboard" : "My Listings"}</h2>

          <Link
            to="/admin/add-pg"
            className="btn btn-success"
          >
            + Add New Listing
          </Link>

        </div>

        {pgs.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            <h4>No listings found</h4>
            <p className="mb-0 text-muted">You haven't added any listings yet. Click "+ Add New Listing" to get started.</p>
          </div>
        ) : (
          <div className="table-responsive shadow-sm rounded border">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>Price</th>
                  <th>Status</th>
                  {user.role === "admin" && <th>Owner</th>}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pgs.map((pg) => (
                  <tr key={pg.id}>
                    <td>{pg.id}</td>
                    <td><strong className="fw-bold">{pg.name}</strong></td>
                    <td>
                      <span className="badge bg-secondary">{pg.property_type || "PG"}</span>
                    </td>
                    <td>{pg.city}</td>
                    <td>₹{pg.price}</td>
                    <td>
                      <span className={`badge ${pg.status === 'Vacant' ? 'bg-success' : 'bg-danger'}`}>
                        {pg.status || 'Vacant'}
                      </span>
                    </td>
                    {user.role === "admin" && (
                      <td>
                        <span className="text-muted small">{pg.owner_name || "System / Admin"}</span>
                      </td>
                    )}
                    <td className="text-center">
                      <Link
                        to={`/admin/edit/${pg.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deletePG(pg.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  );
}

export default AdminDashboard;