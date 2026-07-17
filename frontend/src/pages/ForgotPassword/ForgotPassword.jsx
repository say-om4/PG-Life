import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await API.post("/auth/resetPassword.php", {
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4 text-dark dark-text-white">
                Reset Password
              </h2>
              <p className="text-muted text-center mb-4 small">
                Verify your registered email and phone number to set a new password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-dark dark-text-white">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. user@gmail.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark dark-text-white">Registered Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label text-dark dark-text-white">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn btn border-0 p-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <div className="mb-4 position-relative">
                  <label className="form-label text-dark dark-text-white">Confirm New Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control pe-5"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn btn border-0 p-0 text-muted"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle Password Visibility"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <button
                  className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
                  type="submit"
                >
                  Reset Password
                </button>
              </form>

              <div className="text-center mt-4">
                <Link to="/login" className="text-decoration-none fw-semibold">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
