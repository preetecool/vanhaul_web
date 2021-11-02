import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import viewDetails from "../../assets/icons/main/circle-arrow.svg";

const DispatcherLoads = () => {
	const { user, isAuthenticated } = useAuth0();
	const [loads, setLoads] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}
		const getDispatcherLoads = async () => {
			const dispatcherId = user.email;
			const response = await fetch(`/api/dispatchedloads/${dispatcherId}`);
			const data = await response.json();
			setLoads(data.data);
			setLoading(false);
		};
		getDispatcherLoads();
	}, []);

	if (!isAuthenticated || !loads || loading) return null;
	return (
		<>
			{loads.map((load, index) => {
				return (
					<Container key={index}>
						<InfoLabel>Trip Number</InfoLabel>
						<ViewLoadDetails to={`/loads/${load._id}`}>
							<Icon src={viewDetails} />
						</ViewLoadDetails>

						<span style={{ fontWeight: "bold" }}>{load.tripNumber}</span>

						<Seperation />
						<br />
						<LoadInfoContainer>
							<LoadInfoWrapper>
								<LoadInfo>
									<InfoLabel>Driver</InfoLabel>
									{load.driver}
								</LoadInfo>
								<LoadInfo>
									<InfoLabel>Next Appointment</InfoLabel>
									{load.dateTime}
								</LoadInfo>
								<LoadInfo>
									<InfoLabel>Origin</InfoLabel>
									{load.origin}
								</LoadInfo>
							</LoadInfoWrapper>
							<LoadInfoWrapper>
								<LoadInfo>
									<InfoLabel>Commodity</InfoLabel>
									{load.commodity}
								</LoadInfo>
								<LoadInfo>
									<InfoLabel>Destination</InfoLabel>
									{load.destination}
								</LoadInfo>
							</LoadInfoWrapper>
						</LoadInfoContainer>
						<br />
						<Seperation />
						<Eta>
							<InfoLabel>ETA</InfoLabel>
							{load.drivingTime}
						</Eta>
					</Container>
				);
			})}
		</>
	);
};

const Container = styled.div`
	width: 70%;
	border-radius: 15px;
	box-shadow: rgba(149, 157, 165, 0.15) 2px 2px 8px;
	margin-bottom: 3%;
	padding: 4%;
`;

const InfoLabel = styled.span`
	display: block;
	font-size: 0.7em;
	color: lightgrey;
`;

const Seperation = styled.div`
	border-bottom: 1px solid lightgrey;
	width: 100%;
`;

const Eta = styled.span`
	display: block;
	font-size: 1em;
	font-weight: bold;
	color: blue;
	text-align: center;
`;

const ViewLoadDetails = styled(Link)`
	float: right;
	font-size: 0.7em;
	margin-top: -2%;

	&:hover {
		transform: scale(1.2);
	}
`;

const Icon = styled.img`
	width: 15px;
	height: 15px;
	margin-top: 3%;
`;

const LoadInfo = styled.div`
	font-size: 0.9em;
	margin-top: 2%;
`;

const LoadInfoWrapper = styled.div`
	width: 50%;
	padding-right: 4%;
`;

const LoadInfoContainer = styled.div`
	display: flex;
`;

export default DispatcherLoads;
