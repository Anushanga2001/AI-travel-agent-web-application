import React from "react";
import Card from "react-bootstrap/Card";
import { Chip, Rating } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";


export default function Places({ place }) {
  console.log(place);
  return (
    <div className=" flex mt-10 justify-center items-center">
      <Card style={{ width: "21rem" }}>
        <Card.Img
          variant="top"
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
        />
        <Card.Body>
          <Card.Title>{place.name}</Card.Title>
          <Card.Text className="flex justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <div>Ratings</div>
            <Rating size="small" value={Number(place.rating)} />
          </Card.Text>
          <Card.Text className="flex justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <div>price</div>
            <div>{place?.price_level}</div>
          </Card.Text>
          <Card.Text className="flex flex-row justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <div>ranking</div>
            <div>{place?.ranking}</div>
          </Card.Text>
          <Card.Text className="flex flex-row justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <CiLocationOn />
            <div>{place?.location_string}</div>
          </Card.Text>
          <Card.Text className="flex flex-row justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <BsTelephone />
            <div>{place?.phone}</div>
          </Card.Text>
          <Card.Text className="flex gap-x-2 text-xs pl-1 pr-1 text-gray-400 mb-0 mt-2 overflow-scroll">
            {place?.cuisine?.map(({ name }) => (
              <Chip key={name} label={name} size="small"></Chip>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
