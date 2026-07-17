import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">
        <div className="container">

          <h1 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>About StayNest</h1>

          <p className="about-text text-muted fs-5 mb-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
            StayNest is a premium search directory connecting tenants, students, and working professionals directly with landlords and hosts. We help you find vacant rooms, Hostels, PGs, and apartments nearby without any booking fees or intermediaries.
          </p>

          <div className="about-cards row g-4 mt-2">

            <div className="col-md-4">
              <div className="about-card card p-4 border-0 shadow-sm h-100 rounded-4">
                <h3 className="fw-bold fs-5 mb-2">🏠 Verified Listings</h3>
                <p className="text-muted small mb-0">Browse through verified Rooms, PGs, and Apartments with accurate pricing and amenities.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card card p-4 border-0 shadow-sm h-100 rounded-4">
                <h3 className="fw-bold fs-5 mb-2">⚡ Direct Owner Contact</h3>
                <p className="text-muted small mb-0">No booking fees. Instantly view landlord phone numbers and email addresses to inquire directly.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card card p-4 border-0 shadow-sm h-100 rounded-4">
                <h3 className="fw-bold fs-5 mb-2">❤️ Wishlist & Compare</h3>
                <p className="text-muted small mb-0">Save your favorite locations to your personal wishlist and find the perfect match.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;