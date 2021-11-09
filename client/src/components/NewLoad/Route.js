/*global google*/
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

    const orig = locations.origin;
    const dest = locations.destination;

    matrix.getDistanceMatrix(
      {
        origins: [orig],
        destinations: [dest],
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status !== "OK") {
          alert("Error was: " + status);
        } else {
          let origins = response.originAddresses;
          let destinations = response.destinationAddresses;

          //Loop through the elements row to get the value of duration and distance
          for (let i = 0; i < origins.length; i++) {
            let results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              let element = results[j];
              let distanceString = element.distance.text;
              let durationString = element.duration.text;

              setDistance(parseInt(distanceString, 10));
              setDrivingTime(parseInt(durationString, 10));
              console.log(distance);
              console.log(drivingTime);
            }
          }
        }
      }
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
