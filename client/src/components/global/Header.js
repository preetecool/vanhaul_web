import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import AuthenticationButton from "./auth0/AuthButton";
import logo from "../../assets/vanhaul_logo.svg";

const Header = () => {
	const { user, isAuthenticated } = useAuth0();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}
		const fetchUsers = async () => {
			const id = user.email;
			let response;
			try {
				response = await fetch(`https://vanhaul.herokuapp.com/api/users/${id}`);
				const data = await response.json();

				setUserData(data.data);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};

		fetchUsers();
	}, [isAuthenticated]);

	return (
		<Wrapper>
			<LogoLink to={"/"}>
				<Logo src={logo}></Logo>
			</LogoLink>
			{!isAuthenticated || loading ? null : (
				<>
					<NavLink to={"/Shipments"}>Shipments</NavLink>
					{!loading &&
						isAuthenticated &&
						userData &&
						userData.role === "dispatcher" && (
							<NavLink to={"/NewLoad"}>New Shipment</NavLink>
						)}
					<NavLink to={"/Contacts"}>Contacts</NavLink>
				</>
			)}
			<AuthenticationButton />
		</Wrapper>
	);
};

const Wrapper = styled.header`
	display: flex;
	width: 100%;
	margin: auto;
	height: 8vh;
	border-bottom: 1px solid lightgrey;
`;

const Logo = styled.img`
	width: 23px;
`;

const LogoLink = styled(Link)`
	margin-left: 1%;
`;

const NavLink = styled(Link)`
	margin: auto;
	font-size: 0.8em;
	text-decoration: none;
	color: black;

	&:hover {
		color: blue;
		text-decoration: underline;
	}
`;

const Icon = styled.img`
	width: 32px;
	height: 32px;
`;

export default Header;
