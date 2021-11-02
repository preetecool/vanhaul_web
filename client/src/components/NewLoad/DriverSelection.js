import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ShipmentContext } from "../global/hooks/ShipmentContext";

const DriverSelection = () => {
	const { setSelectedDriver, setDriverId } = useContext(ShipmentContext);

	const [drivers, setDrivers] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	//fetching drivers from database
	useEffect(() => {
		const getDrivers = async () => {
			const response = await fetch("/api/drivers");
			const data = await response.json();
			setDrivers(data.data);
		};
		getDrivers();
	}, []);

	//auto complete functionality
	const onChangeHandler = (searchValue) => {
		let results = [];
		if (searchValue.length > 0) {
			results = drivers.filter((driver) => {
				//regex expression to skip case sensitivity
				const regex = new RegExp(`${searchValue}`, "gi");
				// matching regex expression with queried driver names
				return driver.fullName.match(regex);
			});
		}
		setSuggestions(results);
		setSearchValue(searchValue);
	};

	const suggestionHandler = (searchValue) => {
		setSearchValue(searchValue);
		setSelectedDriver(searchValue);
		setSuggestions([]);
	};

	return (
		<>
			<input
				required
				onChange={(e) => onChangeHandler(e.target.value)}
				onBlur={() => {
					setTimeout(() => {
						setSuggestions([]);
					}, 100);
				}}
				value={searchValue}
				placeholder="Search for driver"
				required
			/>

			{suggestions &&
				suggestions.map((suggestion, index) => (
					<List key={index}>
						<li
							onClick={() => {
								suggestionHandler(suggestion.fullName);
								setDriverId(suggestion.email);
							}}
						>
							{suggestion.fullName}
						</li>
						<SecondaryListItem>{suggestion.email}</SecondaryListItem>
					</List>
				))}
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

export default DriverSelection;
