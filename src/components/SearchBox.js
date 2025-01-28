import React from "react";

const SearchBox = ({ cityCoordinates, setLocation }) => {
  return (
    <div className="select-container">
      <select
        className="select"
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Wybierz lokację</option>
        {Object.entries(cityCoordinates).map(([city, coords]) => (
          <option key={city} value={coords}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
