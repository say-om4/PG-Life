import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../services/api";
import Footer from "../../components/Footer/Footer";
import "./PGListing.css";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function PGListing() {
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);

  const [search, setSearch] = useState(querySearch);
  const [roomType, setRoomType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  useEffect(() => {
    API.get("/pg/getAllPGs.php")
      .then((res) => {
        if (res.data.success) {
          setPgs(res.data.data);
          setFilteredPgs(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let data = [...pgs];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      data = data.filter(
        (pg) =>
          pg.name.toLowerCase().includes(q) ||
          pg.city.toLowerCase().includes(q) ||
          (pg.state && pg.state.toLowerCase().includes(q)) ||
          (pg.address && pg.address.toLowerCase().includes(q))
      );
    }

    if (roomType !== "") {
      data = data.filter((pg) => pg.room_type === roomType);
    }

    if (propertyType !== "") {
      data = data.filter((pg) => (pg.property_type || "PG") === propertyType);
    }

    setFilteredPgs(data);
  }, [search, roomType, propertyType, pgs]);

  return (
    <>
      <Navbar />

      <SearchBar
        search={search}
        setSearch={setSearch}
        roomType={roomType}
        setRoomType={setRoomType}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
      />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Explore Nearby Rentals</h2>
          <span className="text-muted fw-medium">{filteredPgs.length} properties found</span>
        </div>

        {filteredPgs.length === 0 ? (
          <div className="alert alert-warning text-center py-5 rounded-4 border-0 shadow-sm">
            <h4 className="fw-bold text-dark">No Listings Found</h4>
            <p className="text-muted mb-0">Try adjusting your filters or location search query.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPgs.map((pg) => {
              const isFull = pg.status === "Full";
              return (
                <div key={pg.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                    {/* Status Badge */}
                    <span className={`position-absolute top-0 end-0 m-3 badge ${isFull ? 'bg-danger' : 'bg-success'} py-2 px-3 rounded-pill shadow`}>
                      {pg.status || "Vacant"}
                    </span>
                    
                    <img
                      src={
                        imageMap[pg.image]
                          ? imageMap[pg.image]
                          : `http://localhost/PG-Life/backend/uploads/${pg.image}`
                      }
                      alt={pg.name}
                      style={{ height: "220px", objectFit: "cover" }}
                      className="card-img-top"
                    />
                    
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex gap-2 align-items-center">
                          <span className="badge bg-secondary-subtle text-secondary text-uppercase px-2.5 py-1 rounded small">
                            {pg.property_type || "PG"}
                          </span>
                          {Number(pg.independent) === 1 && (
                            <span className="badge bg-info-subtle text-info px-2.5 py-1 rounded small">
                              🏡 Independent
                            </span>
                          )}
                        </div>
                        <span className="text-warning fw-bold small">⭐ {pg.rating || "5.0"}</span>
                      </div>
                      
                      <h4 className="fw-bold card-title text-dark mb-1">{pg.name}</h4>
                      <p className="text-muted small mb-3">📍 {pg.city}, {pg.state}</p>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small">🛏 {pg.room_type}</span>
                        <span className="fw-bold text-primary">₹{pg.price} <span className="small text-muted fw-normal">/mo</span></span>
                      </div>
                      
                      <Link
                        to={`/pg-details/${pg.id}`}
                        className="btn btn-outline-primary btn-sm w-100 py-2 rounded-3 fw-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PGListing;