import "./FeaturedPG.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

import { FaMapMarkerAlt, FaWifi, FaUtensils } from "react-icons/fa";
import { MdBathroom } from "react-icons/md";
import { toast } from "react-toastify";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function FeaturedPG() {
  const [pgs, setPgs] = useState([]);
  const handleWishlist = async (pgId) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {

      const res = await API.post("/wishlist/addWishlist.php", {
        user_id: user.id,
        pg_id: pgId,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }

  };

  useEffect(() => {
    API.get("/pg/getAllPGs.php")
      .then((res) => {
        setPgs(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="featured-pg py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Featured Listings</h2>
          <p className="text-muted">Explore our most popular vacant rooms, PGs, and apartments.</p>
        </div>

        <div className="row g-4">

          {pgs.slice(0, 6).map((pg) => {
            const isFull = pg.status === "Full";
            return (
              <div className="col-lg-4 col-md-6" key={pg.id}>

                <div className="pg-card card border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative">

                  <div className="pg-image position-relative">

                    <img
                      src={
                        imageMap[pg.image]
                          ? imageMap[pg.image]
                          : `http://localhost/PG-Life/backend/uploads/${pg.image}`
                      }
                      alt={pg.name}
                      style={{ height: "220px", objectFit: "cover", width: "100%" }}
                    />

                    <span className="rating-badge position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold">
                      ⭐ {pg.rating || "5.0"}
                    </span>

                    <span className={`position-absolute top-0 end-0 m-3 badge ${isFull ? 'bg-danger' : 'bg-success'} py-2 px-3 rounded-pill shadow`}>
                      {pg.status || "Vacant"}
                    </span>

                    <button
                      className="wishlist-btn position-absolute bottom-0 end-0 m-3 btn btn-light rounded-circle shadow-sm"
                      style={{ width: "40px", height: "40px", padding: 0 }}
                      onClick={() => handleWishlist(pg.id)}
                    >
                      ❤️
                    </button>

                  </div>

                  <div className="pg-content p-4">

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-secondary-subtle text-secondary text-uppercase small">
                        {pg.property_type || "PG"}
                      </span>
                    </div>

                    <h4 className="fw-bold mb-1 text-dark">{pg.name}</h4>

                    <p className="text-muted small mb-3">
                      <FaMapMarkerAlt /> {pg.city}
                    </p>

                    <h5 className="fw-bold text-primary mb-3">₹{pg.price} <span className="small text-muted fw-normal">/ Month</span></h5>

                    <div className="pg-features d-flex flex-wrap gap-2 mb-3">

                      <span className="badge bg-light text-dark border font-weight-normal">{pg.room_type}</span>

                      {pg.wifi == 1 && (
                        <span className="badge bg-light text-dark border">
                          <FaWifi /> WiFi
                        </span>
                      )}

                      {pg.food == 1 && (
                        <span className="badge bg-light text-dark border">
                          <FaUtensils /> Food
                        </span>
                      )}

                      <span className="badge bg-light text-dark border">
                        <MdBathroom /> {pg.bathroom}
                      </span>

                    </div>

                    <Link
                      to={`/pg-details/${pg.id}`}
                      className="btn btn-primary btn-sm w-100 py-2 rounded-3 fw-semibold mt-2"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FeaturedPG;