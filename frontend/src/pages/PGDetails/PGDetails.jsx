import "./PGDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    API.get(`/pg/getSinglePG.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setPg(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleInquiryClick = () => {
    if (!user) {
      toast.error("Please login to view landlord contact details");
      navigate("/login");
      return;
    }
    setShowContact(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await API.post("/pg/addReview.php", {
        user_id: user.id,
        pg_id: pg.id,
        rating: reviewRating,
        review_text: reviewText
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setReviewText("");
        // Reload listing details
        const updatedRes = await API.get(`/pg/getSinglePG.php?id=${id}`);
        if (updatedRes.data.success) {
          setPg(updatedRes.data.data);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5 py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (!pg) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5 py-5">
          <h2 className="text-danger">Listing Not Found</h2>
        </div>
      </>
    );
  }

  const isFull = pg.status === "Full";

  return (
    <>
      <Navbar />

      <section className="pg-details py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-lg-6">
              <img
                src={
                  imageMap[pg.image]
                    ? imageMap[pg.image]
                    : `http://localhost/PG-Life/backend/uploads/${pg.image}`
                }
                alt={pg.name}
                className="pg-main-image rounded-4 shadow-sm"
              />
            </div>

            <div className="col-lg-6">
              <div className="details-card card p-4 border-0 shadow-lg rounded-4">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="rating fw-bold bg-warning-subtle text-warning px-3 py-1 rounded-pill">⭐ {pg.rating || "5.0"}</span>
                  <div className="d-flex gap-2">
                    <span className="badge bg-secondary text-uppercase py-2 px-3 rounded-pill">{pg.property_type || "PG"}</span>
                    {Number(pg.independent) === 1 && (
                      <span className="badge bg-info text-white py-2 px-3 rounded-pill">🏡 Independent Entry</span>
                    )}
                    <span className={`badge ${isFull ? 'bg-danger' : 'bg-success'} py-2 px-3 rounded-pill`}>
                      {pg.status || "Vacant"}
                    </span>
                  </div>
                </div>

                <h2 className="fw-bold mb-2 text-dark">{pg.name}</h2>

                <p className="text-muted mb-3">📍 {pg.address}, {pg.city}, {pg.state}</p>

                <h3 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>₹{pg.price} <span className="fs-6 text-muted fw-normal">/ Month</span></h3>

                <div className="facility-list d-flex flex-wrap gap-2 mb-4">
                  <span className="badge bg-light text-dark border p-2">🛏 {pg.room_type}</span>
                  <span className="badge bg-light text-dark border p-2">👤 {pg.gender}</span>
                  {Number(pg.independent) === 1 && (
                    <span className="badge bg-light text-dark border p-2">🏡 Independent Entrance</span>
                  )}
                  <span className="badge bg-light text-dark border p-2">{pg.food == 1 ? "🍽 Food Included" : "❌ No Food"}</span>
                  <span className="badge bg-light text-dark border p-2">{pg.wifi == 1 ? "📶 Free WiFi" : "❌ No WiFi"}</span>
                  <span className="badge bg-light text-dark border p-2">🚿 {pg.bathroom} Bathroom</span>
                  <span className="badge bg-light text-dark border p-2">{pg.parking == 1 ? "🚗 Parking" : "❌ No Parking"}</span>
                  <span className="badge bg-light text-dark border p-2">{pg.power_backup == 1 ? "⚡ Power Backup" : "❌ No Backup"}</span>
                </div>

                <hr />

                <h4 className="fw-bold text-dark mt-3">Description</h4>

                <p className="text-muted leading-relaxed mb-4">{pg.description}</p>

                {isFull ? (
                  <div className="alert alert-danger border-0 rounded-3 text-center py-3">
                    <h5 className="fw-bold mb-1">🔴 Property Occupied</h5>
                    <p className="mb-0 small">This room/apartment is currently full. Please search for other vacant listings.</p>
                  </div>
                ) : showContact ? (
                  <div className="card border-0 bg-success-subtle p-3 rounded-3 mt-3">
                    <h5 className="fw-bold text-success mb-2">📞 Landlord Contact Details</h5>
                    <p className="mb-2 text-dark"><strong>Name:</strong> {pg.owner_name || "StayNest Admin"}</p>

                    {(pg.contact_display === "both" || pg.contact_display === "phone") && (
                      <>
                        <p className="mb-1 text-dark">
                          <strong>Phone:</strong> <a href={`tel:${pg.owner_phone || "8679389489"}`} className="fw-semibold text-decoration-none">{pg.owner_phone || "8679389489"}</a>
                        </p>
                        {pg.phone2 && (
                          <p className="mb-1 text-dark">
                            <strong>Secondary Phone:</strong> <a href={`tel:${pg.phone2}`} className="fw-semibold text-decoration-none">{pg.phone2}</a>
                          </p>
                        )}
                      </>
                    )}

                    {(pg.contact_display === "both" || pg.contact_display === "email") && (
                      <p className="mb-0 text-dark">
                        <strong>Email:</strong> <a href={`mailto:${pg.owner_email || "omjeexig@gmail.com"}`} className="fw-semibold text-decoration-none">{pg.owner_email || "omjeexig@gmail.com"}</a>
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-lg w-100 rounded-3 mt-3 fw-bold"
                    onClick={handleInquiryClick}
                  >
                    📞 View Landlord Contact Details
                  </button>
                )}

              </div>
            </div>

          </div>

          {/* Reviews & Ratings Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card p-4 border-0 shadow-lg rounded-4">
                <h3 className="fw-bold mb-4 text-dark">Reviews & Ratings</h3>

                <div className="row g-4">
                  {/* Left column: Display existing reviews */}
                  <div className="col-md-7">
                    <h5 className="fw-semibold mb-3 text-dark">Customer Reviews ({pg.reviews ? pg.reviews.length : 0})</h5>
                    {pg.reviews && pg.reviews.length > 0 ? (
                      <div className="pe-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {pg.reviews.map((r) => (
                          <div key={r.id} className="card p-3 mb-3 border border-light shadow-sm rounded-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-bold text-dark">{r.user_name}</span>
                              <span className="badge bg-warning-subtle text-warning">⭐ {r.rating} / 5</span>
                            </div>
                            <p className="text-muted mb-1 small">{r.review_text || <em>No comment left.</em>}</p>
                            <small className="text-muted" style={{ fontSize: "11px" }}>
                              Posted on {new Date(r.created_at).toLocaleDateString()}
                            </small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="alert alert-light text-center border py-4 rounded-3">
                        <span className="fs-3">💬</span>
                        <p className="mb-0 text-muted mt-2 small">No reviews yet. Be the first to leave one!</p>
                      </div>
                    )}
                  </div>

                  {/* Right column: Leave a review form */}
                  <div className="col-md-5">
                    <h5 className="fw-semibold mb-3 text-dark">Leave a Review</h5>

                    {!user ? (
                      <div className="alert alert-warning border-0 rounded-3 text-center py-3">
                        <p className="mb-2 small">You must be logged in to leave a review.</p>
                        <button onClick={() => navigate("/login")} className="btn btn-primary btn-sm fw-semibold rounded-pill px-3">
                          Login
                        </button>
                      </div>
                    ) : pg.user_id !== null && Number(user.id) === Number(pg.user_id) ? (
                      <div className="alert alert-info border-0 rounded-3 text-center py-3">
                        <p className="mb-0 small fw-medium">As the host of this property, you cannot rate or review it.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                          <label className="form-label text-dark fw-semibold small">Rating</label>
                          <select
                            className="form-select"
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                            <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                            <option value={3}>⭐⭐⭐ (3 - Average)</option>
                            <option value={2}>⭐⭐ (2 - Poor)</option>
                            <option value={1}>⭐ (1 - Terrible)</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label text-dark fw-semibold small">Your Review</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share details of your experience staying here (e.g. food quality, host behavior, amenities)..."
                            required
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-warning w-100 rounded-3 fw-bold"
                          disabled={submittingReview}
                        >
                          {submittingReview ? "Submitting..." : "Submit Review"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PGDetails;