import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ShipmentContext } from "../global/hooks/ShipmentContext";

import Route from "./Route";
import DriverSelection from "./DriverSelection";
import LoadInformation from "./LoadInformation";
import ContactSelection from "./ContactSelection";

const ShipmentCreation = () => {
  const { user } = useAuth0();

  const {
    selectedDriver,
    driverId,
    loadInfo,
    distance,
    locations,
    drivingTime,
    selectedShipperReceiver,
    shipperReceiverId,
  } = useContext(ShipmentContext);

  const createAndAssignLoad = () => {
    if (!selectedDriver || !loadInfo || !distance) {
      return;
    }
    fetch(`https://vanhaul.herokuapp.com/api/loads`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver: selectedDriver,
        driverId: driverId,
        origin: locations.origin,
        destination: locations.destination,
        distance: distance,
        drivingTime: drivingTime,
        tripNumber: loadInfo.tripNumber,
        weight: loadInfo.weight,
        commodity: loadInfo.commodity,
        rate: loadInfo.rate,
        dateTime: loadInfo.dateTime,
        dispatcherId: user.email,
        shipperReceiver: selectedShipperReceiver,
        shipperReceiverId: shipperReceiverId,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <br />
      <h2>New Shipment</h2>
      <form onSubmit={createAndAssignLoad}>
        <DriverSelection />
        <LoadInformation />
        <Route />
        <ContactSelection />
        <button>Create Load</button>
        <br />
      </form>
      <br />
    </>
  );
};

export default ShipmentCreation;
