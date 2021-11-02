import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	return (
		!isAuthenticated && (
			<div>
				<AuthButton onClick={loginWithRedirect}>Login</AuthButton>
			</div>
		)
	);
};

const AuthButton = styled.button`
	width: 100px;
	height: 50px;
	border: 1px solid blue;
	border-radius: 10px;

	cursor: pointer;

	&:hover {
		color: white;
		background: blue;
	}
`;

export default LoginButton;
