import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer py-4 mt-5">
      <div className="container text-center">
        <h4 className="fw-bold mb-1">StayNest</h4>
        <p className="text-muted mb-3">Find vacant rooms, Hostels, PGs, and apartments nearby with ease.</p>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <Link to="/terms" className="text-decoration-none text-secondary small fw-medium">Terms & Conditions</Link>
          <span className="text-muted">|</span>
          <Link to="/privacy" className="text-decoration-none text-secondary small fw-medium">Privacy Policy</Link>
        </div>

        <hr className="my-3" />

        <p className="small text-muted mb-2">
          © 2026 StayNest. All Rights Reserved. Unauthorised copying or distribution of this software is strictly prohibited under copyright law.
        </p>
        <p className="small mb-0">
          Developed by <a href="https://www.linkedin.com/in/om-jee-77869b325/" target="_blank" rel="noopener noreferrer" className="fw-semibold text-primary">Om</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;