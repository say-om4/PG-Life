import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { toast } from "react-toastify";

function AddPG() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    price: "",
    rating: "5.0",
    rating_setting: "reviews",
    room_type: "Rent in Home",
    gender: "Boys",
    food: 1,
    wifi: 1,
    bathroom: "Attached",
    parking: 1,
    power_backup: 1,
    image: null,
    description: "",
    property_type: "PG",
    status: "Vacant",
    independent: 0,
    contact_display: "both",
    phone2: "",
  });

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      
      // Append creator's user_id
      formData.append("user_id", user.id);

      const res = await API.post("/admin/addPG.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Listing Added Successfully");
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

        <h2 className="mb-4 fw-bold text-center">Add New Listing</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Property Name / Title <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
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
                required
              />
            </div>

            {user && user.role === "admin" ? (
              <div className="col-md-6 mb-3">
                <label className="form-label">Rating <span className="text-danger">*</span></label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
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
                onChange={handleChange}
              >
                <option value="reviews">⭐ Calculate from Customer Reviews</option>
                <option value="admin">✏️ Use Custom Admin Rating</option>
              </select>
            </div>
          )}
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Room / Sharing Type</label>
              <select
                className="form-select"
                name="room_type"
                value={form.room_type}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                    checked={form.independent === 1}
                    onChange={(e) => setForm({ ...form, independent: e.target.checked ? 1 : 0 })}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="independent-check">
                    🏡 Independent Entry / Full Independence
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="row mb-3 border-top pt-3">
            <h5 className="mb-3 fw-bold text-dark">Contact Details Preferences</h5>
            <div className="col-md-6 mb-3">
              <label className="form-label">Contact Info to Display <span className="text-danger">*</span></label>
              <select
                className="form-select"
                name="contact_display"
                value={form.contact_display}
                onChange={handleChange}
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
                placeholder="e.g. 9876543210"
              />
            </div>
          </div>

          <div className="card p-3 mb-3 bg-light border-0 rounded-3">
            <h5 className="mb-3 fw-semibold">Amenities</h5>
            <div className="row">
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wifi-check"
                    checked={form.wifi === 1}
                    onChange={(e) => setForm({ ...form, wifi: e.target.checked ? 1 : 0 })}
                  />
                  <label className="form-check-label" htmlFor="wifi-check">Free Wi-Fi</label>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="food-check"
                    checked={form.food === 1}
                    onChange={(e) => setForm({ ...form, food: e.target.checked ? 1 : 0 })}
                  />
                  <label className="form-check-label" htmlFor="food-check">Food Included</label>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="parking-check"
                    checked={form.parking === 1}
                    onChange={(e) => setForm({ ...form, parking: e.target.checked ? 1 : 0 })}
                  />
                  <label className="form-check-label" htmlFor="parking-check">Parking Space</label>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="power-check"
                    checked={form.power_backup === 1}
                    onChange={(e) => setForm({ ...form, power_backup: e.target.checked ? 1 : 0 })}
                  />
                  <label className="form-check-label" htmlFor="power-check">Power Backup</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your property (pricing details, guidelines, exact location)..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setForm({
                  ...form,
                  image: e.target.files[0],
                });
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success btn-lg w-100 rounded-3"
          >
            Add Listing
          </button>

        </form>

      </div>

    </>
  );
}

export default AddPG;