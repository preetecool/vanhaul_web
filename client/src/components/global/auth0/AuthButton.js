import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthenticationButton = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<Wrapper> {isAuthenticated ? <LogoutButton /> : <LoginButton />}</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-left: auto;
`;

export default AuthenticationButton;
