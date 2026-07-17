import "./SearchBar.css";

function SearchBar({
  search,
  setSearch,
  roomType,
  setRoomType,
  propertyType,
  setPropertyType,
}) {
  return (
    <div className="search-section">
      <div className="container">
        <div className="search-card d-flex gap-3 align-items-center">

          <input
            type="text"
            className="form-control"
            placeholder="Search by City, State, Name or Address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">All Room Types</option>
            <option value="Rent in Home">Rent in Home</option>
            <option value="Double Sharing">Double Sharing</option>
            <option value="Triple Sharing">Triple Sharing</option>
            <option value="Full Apartment">Full Apartment</option>
            <option value="Private Room">Private Room</option>
          </select>

          <select
            className="form-select w-auto"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Property Types</option>
            <option value="PG">PG (Paying Guest)</option>
            <option value="Room">Single Room</option>
            <option value="Apartment">Apartment</option>
            <option value="Hostel">Hostel</option>
          </select>

        </div>
      </div>
    </div>
  );
}

export default SearchBar;