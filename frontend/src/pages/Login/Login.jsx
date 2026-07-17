import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login.php", formData);

      if (res.data.success) {
        const user = res.data.user;

        if (user.role === "admin") {
          toast.success(res.data.message);
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else {
          // Normal users must agree to Terms and Conditions first
          setPendingUser(user);
          setShowTermsModal(true);
        }
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  const handleAcceptTerms = () => {
    if (!acceptedTerms || !pendingUser) return;

    localStorage.setItem("user", JSON.stringify(pendingUser));
    toast.success("Welcome to StayNest! Terms accepted.");
    setShowTermsModal(false);

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="container py-5">
        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card shadow p-4">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label>Password</label>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

                <div className="text-end mb-3">
                  <Link to="/forgot-password" style={{ fontSize: "0.85rem", textDecoration: "none" }} className="fw-semibold">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Login
                </button>

              </form>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register">
                  Register
                </Link>
              </p>

            </div>

          </div>

        </div>
      </div>

      {showTermsModal && (
        <div className="terms-modal-overlay">
          <div className="terms-modal-card card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white py-3 rounded-top-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">📄 Terms & Conditions</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => {
                  setShowTermsModal(false);
                  setPendingUser(null);
                  setAcceptedTerms(false);
                }}
              />
            </div>
            
            <div className="card-body p-4 overflow-y-auto" style={{ maxHeight: "300px" }}>
              <p className="fw-semibold text-dark">Welcome to StayNest! Please read and accept our Terms before proceeding:</p>
              
              <ol className="text-muted small ps-3">
                <li className="mb-2"><strong>Platform Directory:</strong> StayNest is a search directory to locate rooms, hostels, PGs, and apartments. We do not handle booking transactions, deposits, or rental contracts.</li>
                <li className="mb-2"><strong>Direct Host Contact:</strong> Contacting hosts is at your own risk. Please inspect any property in person before making financial agreements.</li>
                <li className="mb-2"><strong>Data Accuracy:</strong> Hosts are solely responsible for the validity of listings, pricing, pictures, and vacancy status.</li>
                <li className="mb-2"><strong>Privacy:</strong> We use your details (name, email, phone) to connect you to hosts. We do not sell or lease your details to third parties.</li>
                <li className="mb-2"><strong>Code of Conduct:</strong> You agree not to attempt unauthorized listing edits, profile modifications, or duplicate accounts.</li>
              </ol>
            </div>
            
            <div className="card-footer bg-light p-4 rounded-bottom-4 border-top">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="accept-terms-check"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label className="form-check-label small fw-semibold text-dark text-start" htmlFor="accept-terms-check">
                  I agree to the Terms & Conditions and Privacy Policy of StayNest.
                </label>
              </div>
              
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-secondary w-50 py-2 fw-semibold rounded-3"
                  onClick={() => {
                    setShowTermsModal(false);
                    setPendingUser(null);
                    setAcceptedTerms(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary w-50 py-2 fw-semibold rounded-3"
                  disabled={!acceptedTerms}
                  onClick={handleAcceptTerms}
                >
                  Accept & Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Login;