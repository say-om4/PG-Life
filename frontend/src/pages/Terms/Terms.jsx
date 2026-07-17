import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Terms() {
  return (
    <>
      <Navbar />
      <div className="container py-5 my-5" style={{ maxWidth: "800px" }}>
        <div className="card shadow-lg p-5 border-0 rounded-4">
          <h1 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>Terms & Conditions</h1>
          <p className="text-muted">Last Updated: July 15, 2026</p>
          <hr className="my-4" />
          
          <div className="terms-content">
            <h4 className="fw-bold text-dark mt-4">1. Acceptance of Terms</h4>
            <p className="text-muted">
              By accessing and using <strong>StayNest</strong>, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>

            <h4 className="fw-bold text-dark mt-4">2. Description of Service</h4>
            <p className="text-muted">
              StayNest is a web application that helps users find nearby rooms, Hostels, PGs, and apartments available for rent. We do not process direct bookings or financial transactions on the platform. The platform serves as a search directory to connect tenants (customers) with landlords (hosts).
            </p>

            <h4 className="fw-bold text-dark mt-4">3. User Responsibility & Content</h4>
            <p className="text-muted">
              Hosts are solely responsible for the accuracy of their listings, descriptions, pricing, availability, and images. Registered users can only create, update, or edit their own property listings and user profile details. Modifying or attempting to edit details belonging to other users is strictly prohibited.
            </p>

            <h4 className="fw-bold text-dark mt-4">4. Customer (Guest) Search Use</h4>
            <p className="text-muted">
              Customers can search, filter, and view information regarding vacant and full listings. Customers cannot add, edit, or modify listing details on this platform.
            </p>

            <h4 className="fw-bold text-dark mt-4">5. Disclaimer of Warranties</h4>
            <p className="text-muted">
              StayNest provides listings on an "as-is" and "as-available" basis. We do not guarantee the condition of the rentals, the truthfulness of host listings, or the availability of the rentals upon visit. Users are advised to inspect properties in person before making any rental agreements.
            </p>

            <h4 className="fw-bold text-dark mt-4">6. Intellectual Property & Copyright</h4>
            <p className="text-muted">
              All branding, designs, logo (SVG), and frontend codebase of StayNest are protected by copyright laws. Unauthorized copying or redistribution of this software is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
