import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
	const { isAuthenticated, logout } = useAuth0();

	return (
		isAuthenticated && (
			<div>
				<AuthButton
					onClick={() => {
						logout({ returnTo: window.location.origin });
					}}
				>
					Log out
				</AuthButton>
			</div>
		)
	);
};

const AuthButton = styled.button`
	width: 100px;
	height: 50px;
	border: 1px solid lightcoral;

	border-radius: 10px;

	cursor: pointer;

	&:hover {
		color: white;
		background: lightcoral;
	}
`;

export default LogoutButton;
