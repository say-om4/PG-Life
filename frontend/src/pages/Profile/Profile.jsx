import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    user_id: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your profile");
      navigate("/login");
      return;
    }

    // Fetch latest user details from server
    API.get(`/profile/getProfile.php?user_id=${user.id}`)
      .then((res) => {
        if (res.data.success) {
          const profileData = res.data.data;
          setForm({
            user_id: profileData.id,
            full_name: profileData.full_name,
            email: profileData.email,
            phone: profileData.phone,
            password: "", // Keep password field empty by default
          });
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile details");
        setLoading(false);
      });
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
      const res = await API.post("/profile/updateProfile.php", form);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        
        // Update user in local storage
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Clear password field
        setForm(prev => ({
          ...prev,
          password: ""
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error: Failed to update profile");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <div className="text-center mb-4">
                <div className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle mb-2" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                  👤
                </div>
                <h3 className="fw-bold">My Profile</h3>
                <p className="text-muted small">Update your account settings below</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-3"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4 position-relative">
                  <label className="form-label fw-semibold">New Password (Leave blank to keep current)</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg rounded-3 pe-5"
                    name="password"
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "48px",
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted, #6c757d)",
                      zIndex: 10,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-3"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
