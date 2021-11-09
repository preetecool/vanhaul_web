import React, { useState, useContext } from "react";
import styled from "styled-components";

import PlacesAutocomplete from "react-places-autocomplete";
import { ShipmentContext } from "../global/hooks/ShipmentContext";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

const Route = () => {
  const {
    distance,
    setDistance,
    drivingTime,
    setDrivingTime,
    locations,
    setLocations,
  } = useContext(ShipmentContext);

  const [loaded, setLoaded] = useState(true);

  const handleOriginAddressChange = (value) => {
    setLocations({ ...locations, origin: value });
  };

  const handleDestinationAddressChange = (value) => {
    setLocations({ ...locations, destination: value });
  };

  //   const getDistanceAndTime = (e) => {
  //     e.preventDefault();
  //     if (!locations) {
  //       return;
  //     }
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${locations.origin}&destinations=${locations.destination}&units=imperial&key=AIzaSyAS_aEppj2N3qwPyEa4Q_UWD5gHFu7kTAs`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setDistance(data.rows[0].elements[0].distance.text);
  //         setDrivingTime(data.rows[0].elements[0].duration.text);
  //       })
  //       .then(() => {
  //         setLoaded(false);
  //       });
  //   };

  const getDistanceAndTime = (e) => {
    e.preventDefault();
    if (!locations) {
      return;
    }
    const matrix = new google.maps.DistanceMatrixService();
    matrix.getDistanceMatrix(
      {
        origins: [locations.origin],
        destinations: [locations.destination],
        travelMode: google.maps.TravelMode.DRIVING,
      }
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
    );
  };

  return (
    <>
      {/* Input for origin Address */}

      <PlacesAutocomplete
        value={locations.origin}
        onChange={handleOriginAddressChange}
        onSelect={handleOriginAddressChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter Origin Address",
              })}
              style={{ backgroundColor: "none" }}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? {
                      backgroundColor: "#fbffb0",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* Input for destination Address */}
      <PlacesAutocomplete
        value={locations.destination}
        onChange={handleDestinationAddressChange}
        onSelect={handleDestinationAddressChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Destination Address",
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? {
                      backgroundColor: "#fbffb0",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* <DateTimeContainer>
				<DateTimePicker onChange={setDateTime} value={dateTime} />
			</DateTimeContainer> */}
      <button onClick={getDistanceAndTime}>Get Distance</button>

      {!loaded ? (
        <>
          <div style={{ fontSize: "0.9em" }}>Distance: {distance}</div>
          <div style={{ fontSize: "0.9em" }}>Driving Time: {drivingTime}</div>
        </>
      ) : null}
    </>
  );
};

const DateTimeContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default Route;
