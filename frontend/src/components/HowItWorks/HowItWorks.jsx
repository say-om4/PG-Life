import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works py-5 border-top border-bottom bg-light-custom">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2 text-uppercase tracking-wider">Guide</span>
          <h2 className="fw-bold text-dark">How StayNest Works</h2>
          <p className="text-muted">Simple step-by-step instructions for finding and listing rentals</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Renters Guide */}
          <div className="col-lg-5 col-md-6">
            <div className="guide-card card p-4 h-100 border-0 shadow-sm rounded-4">
              <h3 className="fw-bold fs-4 mb-4 text-primary d-flex align-items-center gap-2">
                <span>🔍</span> For Renters & Guests
              </h3>
              
              <div className="step-item d-flex gap-3 mb-4">
                <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", flexShrink: 0 }}>1</div>
                <div>
                  <h5 className="fw-bold mb-1">Search Rentals</h5>
                  <p className="text-muted small mb-0">Use the home search bar or browse the listings page. Filter by city, property type, sharing room configurations, or amenities.</p>
                </div>
              </div>

              <div className="step-item d-flex gap-3 mb-4">
                <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", flexShrink: 0 }}>2</div>
                <div>
                  <h5 className="fw-bold mb-1">Check Availability</h5>
                  <p className="text-muted small mb-0">Look for the availability badges: <span className="badge bg-success">Vacant</span> properties are open for rent, while <span className="badge bg-danger">Full</span> properties are occupied.</p>
                </div>
              </div>

              <div className="step-item d-flex gap-3">
                <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", flexShrink: 0 }}>3</div>
                <div>
                  <h5 className="fw-bold mb-1">Contact Host Directly</h5>
                  <p className="text-muted small mb-0">Log in to your account, accept the checkable Terms & Conditions popup, and click "View Landlord Contact Details" on vacant rooms.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hosts Guide */}
          <div className="col-lg-5 col-md-6">
            <div className="guide-card card p-4 h-100 border-0 shadow-sm rounded-4">
              <h3 className="fw-bold fs-4 mb-4 text-success d-flex align-items-center gap-2">
                <span>🏠</span> For Landlords & Hosts
              </h3>
              
              <div className="step-item d-flex gap-3 mb-4">
                <div className="step-number bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", flexShrink: 0 }}>1</div>
                <div>
                  <h5 className="fw-bold mb-1">Register & Log In</h5>
                  <p className="text-muted small mb-0">Create an account. Log in and accept the checkable Terms & Conditions popup to activate your dashboard access.</p>
                </div>
              </div>

              <div className="step-item d-flex gap-3 mb-4">
                <div className="step-number bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", flexShrink: 0 }}>2</div>
                <div>
                  <h5 className="fw-bold mb-1">List Your Property</h5>
                  <p className="text-muted small mb-0">Go to your Dashboard, click "+ Add New Listing". Enter price, photos, type, room features, and amenities, then save.</p>
                </div>
              </div>

              <div className="step-item d-flex gap-3">
                <div className="step-number bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", flexShrink: 0 }}>3</div>
                <div>
                  <h5 className="fw-bold mb-1">Update Status</h5>
                  <p className="text-muted small mb-0">Keep your rentals updated. Set the availability status to <span className="badge bg-danger">Full</span> if rented out, or <span className="badge bg-success">Vacant</span> if it becomes available again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
