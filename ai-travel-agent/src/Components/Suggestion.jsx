import React, { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Places from "./Places";

const Suggestion = ({ pls, childClicked }) => {
  const [type, setType] = useState("Attraction");
  const [ratings, setRatings] = useState("");
  console.log({ childClicked });

  return (
    <div>
      <div className="flex gap-x-6 pl-4">
        <div>
          <NavDropdown
            id="nav-dropdown"
            title="type"
            default={type}
            onSelect={(selectedType) => setType(selectedType)}
          >
            <NavDropdown.Item value="Attraction">Famous Places</NavDropdown.Item>
            <NavDropdown.Item value="Restaurants">Restaurants</NavDropdown.Item>
            <NavDropdown.Item value="Hotels">Hotels</NavDropdown.Item>
          </NavDropdown>
        </div>
        <div>
          <NavDropdown
            id="nav-dropdown"
            title="Ratings"
            default={ratings}
            onSelect={(selectedType) => setRatings(selectedType)}
          >
            <NavDropdown.Item value={0}>All</NavDropdown.Item>
            <NavDropdown.Item value={3.0}>Above 3.0</NavDropdown.Item>
            <NavDropdown.Item value={4.0}>Above 4.0</NavDropdown.Item>
            <NavDropdown.Item value={4.5}>Above 4.5</NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      <div className="flex flex-col mt-4 h-96 overflow-scroll">
        {pls?.map((place, i) => (
          <div key={i} className="">
            <Places place={place} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Suggestion;
