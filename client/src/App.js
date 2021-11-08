import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import { GlobalStyles } from "./components/global/GlobalStyles";
import Header from "./components/global/Header";
import Wrapper from "./components/global/auth0/authWrapper";
import AddUserRole from "./components/global/AddUserRole";

import Home from "./components/Main/Home";
import ShipmentCreation from "./components/NewLoad/ShipmentCreation";
import LoadDetails from "./components/Main/LoadDetails";
import Contacts from "./components/Main/Contacts";
import LandingPage from "./components/Main/LandingPage";

const App = () => {
	const { user, isAuthenticated } = useAuth0();
	const [userData, setUserData] = useState(null);
	const history = useHistory();
	const location = useLocation();

	const fetchUsers = async () => {
		const id = user.email;
		let response;
		try {
			response = await fetch(`https://vanhaul.herokuapp.com/api/users/${id}`);
			const data = await response.json();

			setUserData(data.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			const postUserData = async () => {
				const userInfo = {
					fullName: user.name,
					email: user.email,
					image: user.picture,
					role: null,
				};
				await fetch(`https://vanhaul.herokuapp.com/api/users`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userInfo),
				});
				fetchUsers();
			};
			postUserData();
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (!isAuthenticated) {
			if (location.pathname !== "/") {
				history.push("/Shipments");
			}
			return;
		}

		fetchUsers();
	}, [isAuthenticated]);

	useEffect(() => {
		if (!userData) {
			return;
		}
		if (userData.role === null && location.pathname !== "/addRole") {
			history.push("/addRole");
		}
	}, [userData]);
	return (
		<Wrapper>
			<Header />
			<GlobalStyles />
			<Switch>
				<Container>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route exact path="/Shipments">
						<Home />
					</Route>
					<Route exact path="/addRole">
						<AddUserRole />
					</Route>
					<Route exact path="/Contacts">
						<Contacts />
					</Route>
					<Route exact path="/NewLoad">
						<ShipmentCreation />
					</Route>
					<Route exact path="/loads/:_id">
						<LoadDetails />
					</Route>
				</Container>
			</Switch>
		</Wrapper>
	);
};

const Container = styled.div`
	padding: 5%;
`;

export default App;
