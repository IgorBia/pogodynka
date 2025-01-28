import React from "react";

const Button = ({ onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading} className="button">
      {loading ? "Ładowanie..." : "Sprawdź pogodę"}
    </button>
  );
};

export default Button;
