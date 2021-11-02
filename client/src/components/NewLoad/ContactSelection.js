import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ShipmentContext } from "../global/hooks/ShipmentContext";

const ContactSelection = () => {
	const { setSelectedShipperReceiver, setShipperReceiverId } =
		useContext(ShipmentContext);

	const [shippersReceivers, setShipperReceivers] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const getContact = async () => {
			const response = await fetch("/api/shipper-receiver");
			const data = await response.json();
			setShipperReceivers(data.data);
		};
		getContact();
	}, []);

	//auto complete functionality
	const onChangeHandler = (searchValue) => {
		let results = [];
		if (searchValue.length > 0) {
			results = shippersReceivers.filter((shipperReceiver) => {
				//regex expression to skip case sensitivity
				const regex = new RegExp(`${searchValue}`, "gi");
				// matching regex expression with queried driver names
				return shipperReceiver.fullName.match(regex);
			});
		}
		setSuggestions(results);
		setSearchValue(searchValue);
	};

	const suggestionHandler = (searchValue) => {
		setSearchValue(searchValue);
		setSelectedShipperReceiver(searchValue);
		setSuggestions([]);
	};

	return (
		<>
			<br />
			<input
				required
				onChange={(e) => onChangeHandler(e.target.value)}
				onBlur={() => {
					setTimeout(() => {
						setSuggestions([]);
					}, 100);
				}}
				value={searchValue}
				placeholder="Search Contacts"
				required
			/>

			{suggestions &&
				suggestions.map((suggestion, index) => (
					<List key={index}>
						<li
							onClick={() => {
								suggestionHandler(suggestion.fullName);
								setShipperReceiverId(suggestion.email);
							}}
						>
							{suggestion.fullName}
						</li>
						<SecondaryListItem>{suggestion.email}</SecondaryListItem>
					</List>
				))}
			<br />
		</>
	);
};

const List = styled.ul`
	width: 25%;
	display: block;
	text-decoration: none;
	text-align: left;
	align-content: center;
	background-color: #fff;
	line-height: 2em;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	padding: 1%;
	margin: 0 5px 0 5px;
	cursor: pointer;
`;

const SecondaryListItem = styled.span`
	display: block;
	font-size: 0.9em;
	color: lightgrey;
	font-style: italic;
	cursor: block;
`;

export default ContactSelection;
