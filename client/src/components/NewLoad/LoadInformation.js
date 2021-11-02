import React, { useContext } from "react";
import { ShipmentContext } from "../global/hooks/ShipmentContext";

const LoadInformation = () => {
	const { loadInfo, setLoadInfo } = useContext(ShipmentContext);

	return (
		<>
			<br />
			<input
				required
				type="number"
				placeholder="Enter Trip number"
				onChange={(e) =>
					setLoadInfo({ ...loadInfo, tripNumber: e.target.value })
				}
			></input>

			<br />

			<input
				required
				type="text"
				placeholder="Enter Load Weight"
				onChange={(e) => setLoadInfo({ ...loadInfo, weight: e.target.value })}
			></input>

			<br />

			<input
				required
				type="text"
				placeholder="Commodity"
				onChange={(e) =>
					setLoadInfo({ ...loadInfo, commodity: e.target.value })
				}
			></input>

			<br />

			<input
				required
				type="text"
				placeholder="Load Rate"
				onChange={(e) => setLoadInfo({ ...loadInfo, rate: e.target.value })}
			></input>

			<br />

			<input
				required
				type="text"
				placeholder="Appointment"
				onChange={(e) => setLoadInfo({ ...loadInfo, dateTime: e.target.value })}
			/>
		</>
	);
};

export default LoadInformation;
