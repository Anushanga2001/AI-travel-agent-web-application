import React, { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Form } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import Maps from "./Map";
import Suggestion from "./Suggestion";

import { getLocationInfo } from "./api/api";
// import DialogflowMessenger from "./Chatbot1";

export default function Screen() {
  const [places, setPlaces] = useState();
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    //console.log(bounds, bounds);
    getLocationInfo(bounds.ne, bounds.sw).then((data) => {
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  const autoComplete1Ref = useRef(null);

  const [childClicked, setchildClicked] = useState(null);

  const onLoad1 = (autocomplete) => {
    autoComplete1Ref.current = autocomplete;
  };

  const onPlaceChanged1 = () => {
    if (autoComplete1Ref.current) {
      const place = autoComplete1Ref.current.getPlace();
      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <div
      className="container-fluid h-screen"
      style={{ backgroundColor: "#101418", height: "100%" , overflow: "hidden"}}
    >
      <div className="row h-screen">
        {/* Input */}
        <div className="col-md-4 p-4">
          <Card className="h-full text-white bg-dark">
            <Card.Body className="">
              <div className="mt-1">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="fs-5 fw-bold">Search Place</label>
                    <Autocomplete
                      onLoad={onLoad1}
                      onPlaceChanged={onPlaceChanged1}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Search..."
                        className="cc1"
                        style={{
                          width: "100%",
                          backgroundColor: "gray",
                          color: "white",
                        }}                 
                      />
                    </Autocomplete>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-3">Duration</h5>
                    <label className="text-lg">Start Date:</label>
                    <Form.Control
                      type="date"
                      placeholder="Start Date"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h3 className="mb-3">&nbsp;</h3>
                    <label className="text-lg">End Date:</label>
                    <Form.Control
                      type="date"
                      placeholder="End Date"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div> */}
              </div>
            </Card.Body>
          </Card>
          <div className="mt-2 flex flex-row  gap-x-10">
            <Card className="w-full text-white bg-dark ">
              <Card.Body >
                <Card.Title className="fs-5 fw-bold">
                  Places Near You
                </Card.Title>
                <div>
                  <Suggestion pls={places} childClicked={childClicked} />
                </div>
              </Card.Body>
            </Card>
            {/* <div class="fixed bottom-0 right-0 mb-4 mr-4">
              <DialogflowMessenger />
            </div> */}
          </div>
        </div>

        {/* map */}
        <div className="col-md-8 p-4 ">
          <Card
            style={{
              width: "100%",
              height: "80vh",
              backgroundColor: "#101418",
            }}
            className="h-full"
          >
            <Card.Body>
              <Maps
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={places}
                setchildClicked={setchildClicked}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
