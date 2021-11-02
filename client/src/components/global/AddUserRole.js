import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AddUserRole = () => {
	const { user, isAuthenticated } = useAuth0();

	const [userSelectedRole, setUserSelectedRole] = useState(null);

	const history = useHistory();

	//checking if user has role of null. If yes, assign them the role they select.
	const handleRoleSubmit = (e) => {
		e.preventDefault();
		fetch("/api/users", {
			method: "PATCH",
			body: JSON.stringify({
				email: user.email,
				role: userSelectedRole,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		history.push("/");
		window.location.reload();
	};

	return (
		<Wrapper>
			<h2>Role Selection</h2>
			<Form onSubmit={handleRoleSubmit}>
				<label>
					Driver{" "}
					<input
						value="driver"
						name="role"
						type="radio"
						onClick={(e) => setUserSelectedRole(e.target.value)}
						required
					/>
				</label>

				<label>
					Dispatcher{" "}
					<input
						value="dispatcher"
						name="role"
						type="radio"
						onClick={(e) => setUserSelectedRole(e.target.value)}
						required
					/>
				</label>

				<label>
					Shipper/Receiver{" "}
					<input
						value="shipper-receiver"
						name="role"
						type="radio"
						onClick={(e) => setUserSelectedRole(e.target.value)}
						required
					/>
				</label>
				<MainButton type="submit">Submit Role</MainButton>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* position: absolute; */
	z-index: 100;
	/* width: 50%;
  height: 50vh; */
	margin: auto;
	overflow: hidden;
	justify-content: space-evenly;
`;

const MainButton = styled.button`
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

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export default AddUserRole;
