import React, { createContext, useState } from "react";

export const ShipmentContext = createContext(null);

const ShipmentProvider = ({ children }) => {
	const [distance, setDistance] = useState();
	const [drivingTime, setDrivingTime] = useState();
	const [dateTime, setDateTime] = useState();
	const [locations, setLocations] = useState({
		origin: "",
		destination: "",
	});

	const [selectedDriver, setSelectedDriver] = useState("");
	const [driverId, setDriverId] = useState("");

	const [selectedShipperReceiver, setSelectedShipperReceiver] = useState("");
	const [shipperReceiverId, setShipperReceiverId] = useState("");

	const [loadInfo, setLoadInfo] = useState({
		tripNumber: "",
		weight: "",
		commodity: "",
		rate: "",
	});

	return (
		<div>
			<ShipmentContext.Provider
				value={{
					distance,
					setDistance,
					drivingTime,
					setDrivingTime,
					selectedDriver,
					setSelectedDriver,
					loadInfo,
					setLoadInfo,
					locations,
					setLocations,
					driverId,
					setDriverId,
					dateTime,
					setDateTime,
					selectedShipperReceiver,
					setSelectedShipperReceiver,
					shipperReceiverId,
					setShipperReceiverId,
				}}
			>
				{children}
			</ShipmentContext.Provider>
		</div>
	);
};

export default ShipmentProvider;
