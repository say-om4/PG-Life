import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Privacy() {
  return (
    <>
      <Navbar />
      <div className="container py-5 my-5" style={{ maxWidth: "800px" }}>
        <div className="card shadow-lg p-5 border-0 rounded-4">
          <h1 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>Privacy Policy</h1>
          <p className="text-muted">Last Updated: July 15, 2026</p>
          <hr className="my-4" />

          <div className="privacy-content">
            <h4 className="fw-bold text-dark mt-4">1. Information We Collect</h4>
            <p className="text-muted">
              We collect user-provided details during account registration, including full name, email address, phone number, and password. For hosts, we collect property listing data such as name, city, address, rental price, amenities, descriptions, and uploaded images.
            </p>

            <h4 className="fw-bold text-dark mt-4">2. How We Use Your Information</h4>
            <p className="text-muted">
              Your contact details (Full Name, Phone, and Email) are displayed publicly to customers on vacant property details pages to allow potential renters to contact you. We also use your email for login authentication and account verification.
            </p>

            <h4 className="fw-bold text-dark mt-4">3. Data Control & Security</h4>
            <p className="text-muted">
              You have complete control over your own account and listing information. You can edit your profile details or listings at any time. Security checks ensure that users cannot access or edit other users' personal information or listings. All operations are strictly audited, and overall control is held by the Super Admin.
            </p>

            <h4 className="fw-bold text-dark mt-4">4. Sharing of Data</h4>
            <p className="text-muted">
              StayNest does not sell, rent, or lease your personal information to third parties. Listing details are visible to public visitors strictly for real-estate rental purposes.
            </p>

            <h4 className="fw-bold text-dark mt-4">5. Cookies & Local Storage</h4>
            <p className="text-muted">
              We use standard browser local storage (`localStorage`) to manage user sessions and login states to enhance your user experience and keep you authenticated.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
