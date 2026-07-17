import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact-page">
        <div className="container">

          <h1>Contact Us</h1>

          <div className="contact-box">

            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />

            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
            />

            <textarea
              className="form-control"
              rows="5"
              placeholder="Your Message"
            ></textarea>

            <button className="btn btn-primary">
              Send Message
            </button>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;