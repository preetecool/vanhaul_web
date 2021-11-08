import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import DriverLoads from "./DriverLoads";
import DispatcherLoads from "./DispatcherLoads";
import ShipperReceiverLoads from "./ShipperReceiverLoads";

const Home = () => {
	const { user, isAuthenticated } = useAuth0();

	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	//   fetching user by email address
	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}
		const fetchUsers = async () => {
			const id = user.email;
			const response = await fetch(
				`https://vanhaul.herokuapp.com/api/users/${id}`
			);
			const data = await response.json();
			setUserData(data.data);
			setLoading(false);
		};
		fetchUsers();
	}, [isAuthenticated]);

	if (!isAuthenticated || loading || !userData) return null;

	return (
		<div>
			<h2>Shipments</h2>

			<br />
			{userData.role === "driver" && <DriverLoads />}
			{userData.role === "dispatcher" && <DispatcherLoads />}
			{userData.role === "shipper-receiver" && <ShipperReceiverLoads />}
		</div>
	);
};

export default Home;
