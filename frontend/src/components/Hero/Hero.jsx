import "./Hero.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      navigate(`/pgs?search=${encodeURIComponent(city)}`);
    } else {
      navigate("/pgs");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="container">
        <div className="hero-card" data-aos="zoom-in">

          <span className="badge-custom">🏠 StayNest</span>

          <h1>
            Find Your <span>Rentals Nearby</span>
          </h1>

          <p>
            Discover verified PGs, rooms, and apartments with modern amenities, 
            affordable rates, and vacant availability status near you.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter City, State, Name or Address..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSearch}>
              Search
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;