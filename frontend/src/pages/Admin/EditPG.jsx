import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { toast } from "react-toastify";

function EditPG() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    id: "",
    name: "",
    city: "",
    state: "",
    address: "",
    price: "",
    rating: "",
    rating_setting: "reviews",
    room_type: "Rent in Home",
    gender: "Boys",
    food: 1,
    wifi: 1,
    bathroom: "Attached",
    parking: 1,
    power_backup: 1,
    image: "pg1.jpg",
    description: "",
    property_type: "PG",
    status: "Vacant",
    user_id: "",
    independent: 0,
    contact_display: "both",
    phone2: "",
  });

  const [history, setHistory] = useState([]);
  const [pointer, setPointer] = useState(-1);

  const pushToHistory = (newState) => {
    if (history.length > 0 && JSON.stringify(history[pointer]) === JSON.stringify(newState)) {
      return;
    }
    const nextHistory = history.slice(0, pointer + 1);
    setHistory([...nextHistory, newState]);
    setPointer(nextHistory.length);
  };

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    API.get(`/pg/getSinglePG.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          const pgData = res.data.data;
          
          // Ownership verification
          if (user.role !== "admin" && Number(pgData.user_id) !== Number(user.id)) {
            toast.error("Permission Denied: You do not own this listing.");
            navigate("/admin");
            return;
          }
          
          const initialForm = {
            ...pgData,
            independent: pgData.independent !== undefined ? Number(pgData.independent) : 0,
            state: pgData.state || "",
            rating_setting: pgData.rating_setting || "reviews",
            contact_display: pgData.contact_display || "both",
            phone2: pgData.phone2 || ""
          };

          setForm(initialForm);
          setHistory([initialForm]);
          setPointer(0);
        }
      })
      .catch(console.error);

  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = () => {
    pushToHistory(form);
  };

  const handleSelectChange = (e) => {
    const updated = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(updated);
    pushToHistory(updated);
  };

  const handleCheckboxChange = (name, value) => {
    const updated = {
      ...form,
      [name]: value,
    };
    setForm(updated);
    pushToHistory(updated);
  };

  const handleUndo = (e) => {
    e.preventDefault();
    if (pointer > 0) {
      const prevIndex = pointer - 1;
      setPointer(prevIndex);
      setForm(history[prevIndex]);
    }
  };

  const handleRedo = (e) => {
    e.preventDefault();
    if (pointer < history.length - 1) {
      const nextIndex = pointer + 1;
      setPointer(nextIndex);
      setForm(history[nextIndex]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Append requester_id for backend authorization validation
      const payload = {
        ...form,
        requester_id: user.id
      };

      const res = await API.post("/admin/updatePG.php", payload);

      if (res.data.success) {
        toast.success("Listing Updated Successfully");
        navigate("/admin");
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

      <div className="container py-5" style={{ maxWidth: "800px" }}>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Edit Listing</h2>
          <div className="d-flex gap-2">
            <button
              onClick={handleUndo}
              disabled={pointer <= 0}
              className="btn btn-outline-secondary d-flex align-items-center gap-1 fw-semibold btn-sm py-2 px-3 rounded-3"
              style={{ transition: "all 0.2s ease" }}
            >
              ↩️ Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={pointer >= history.length - 1 || pointer === -1}
              className="btn btn-outline-secondary d-flex align-items-center gap-1 fw-semibold btn-sm py-2 px-3 rounded-3"
              style={{ transition: "all 0.2s ease" }}
            >
              ↪️ Redo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Property Name / Title <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Cozy Corner Stay, Boys Deluxe Hostel"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">State <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={form.state}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Price <span className="text-danger">*</span></label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>

            {user && user.role === "admin" ? (
              <div className="col-md-6 mb-3">
                <label className="form-label">Admin Custom Rating <span className="text-danger">*</span></label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            ) : null}
          </div>

          {user && user.role === "admin" && (
            <div className="mb-3">
              <label className="form-label">Rating System Option <span className="text-danger">*</span></label>
              <select
                className="form-select"
                name="rating_setting"
                value={form.rating_setting}
                onChange={handleSelectChange}
              >
                <option value="reviews">⭐ Calculate from Customer Reviews</option>
                <option value="admin">✏️ Use Custom Admin Rating</option>
              </select>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Description <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Room / Sharing Type</label>
              <select
                className="form-select"
                name="room_type"
                value={form.room_type}
                onChange={handleSelectChange}
              >
                <option>Rent in Home</option>
                <option>Double Sharing</option>
                <option>Triple Sharing</option>
                <option>Full Apartment</option>
                <option>Private Room</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Gender Allowed</label>
              <select
                className="form-select"
                name="gender"
                value={form.gender}
                onChange={handleSelectChange}
              >
                <option>Boys</option>
                <option>Girls</option>
                <option>Unisex</option>
              </select>
            </div>

          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Property Type</label>
              <select
                className="form-select"
                name="property_type"
                value={form.property_type}
                onChange={handleSelectChange}
              >
                <option value="PG">PG (Paying Guest)</option>
                <option value="Room">Single Room</option>
                <option value="Apartment">Apartment / Flat</option>
                <option value="Hostel">Hostel</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Availability Status</label>
              <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={handleSelectChange}
              >
                <option value="Vacant">Vacant (Available)</option>
                <option value="Full">Full (Occupied)</option>
              </select>
            </div>

          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Bathroom Type</label>
              <select
                className="form-select"
                name="bathroom"
                value={form.bathroom}
                onChange={handleSelectChange}
              >
                <option value="Attached">Attached</option>
                <option value="Common">Common</option>
              </select>
            </div>

            {(form.property_type === "Room" || form.property_type === "Apartment") && (
              <div className="col-md-6 mb-3 d-flex align-items-end">
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="independent-check"
                    checked={Number(form.independent) === 1}
                    onChange={(e) => handleCheckboxChange("independent", e.target.checked ? 1 : 0)}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="independent-check">
                    🏡 Independent Entry / Full Independence
                  </label>
                </div>
              </div>
            )}

            <div className="col-md-6 mb-3">
              <label className="form-label">Image Filename / ID</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={form.image}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. pg1.jpg"
              />
            </div>
          </div>

          <div className="row mb-3 border-top pt-3">
            <h5 className="mb-3 fw-bold text-dark">Contact Details Preferences</h5>
            <div className="col-md-6 mb-3">
              <label className="form-label">Contact Info to Display <span className="text-danger">*</span></label>
              <select
                className="form-select"
                name="contact_display"
                value={form.contact_display}
                onChange={handleSelectChange}
                required
              >
                <option value="both">📞 Display Both Email & Phone Number</option>
                <option value="phone">📱 Display Phone Number Only</option>
                <option value="email">✉️ Display Email Address Only</option>
              </select>
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Secondary Phone (Optional)</label>
              <input
                type="text"
                className="form-control"
                name="phone2"
                value={form.phone2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. 9876543210"
              />
            </div>
          </div>

          <div className="card p-3 mb-4 bg-light border-0 rounded-3">
            <h5 className="mb-3 fw-semibold">Amenities</h5>
            <div className="row">
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wifi-check-edit"
                    checked={Number(form.wifi) === 1}
                    onChange={(e) => handleCheckboxChange("wifi", e.target.checked ? 1 : 0)}
                  />
                  <label className="form-check-label" htmlFor="wifi-check-edit">Free Wi-Fi</label>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="food-check-edit"
                    checked={Number(form.food) === 1}
                    onChange={(e) => handleCheckboxChange("food", e.target.checked ? 1 : 0)}
                  />
                  <label className="form-check-label" htmlFor="food-check-edit">Food Included</label>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="parking-check-edit"
                    checked={Number(form.parking) === 1}
                    onChange={(e) => handleCheckboxChange("parking", e.target.checked ? 1 : 0)}
                  />
                  <label className="form-check-label" htmlFor="parking-check-edit">Parking Space</label>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="power-check-edit"
                    checked={Number(form.power_backup) === 1}
                    onChange={(e) => handleCheckboxChange("power_backup", e.target.checked ? 1 : 0)}
                  />
                  <label className="form-check-label" htmlFor="power-check-edit">Power Backup</label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 rounded-3 fw-bold"
          >
            Update Listing
          </button>

        </form>

      </div>
    </>
  );
}

export default EditPG;