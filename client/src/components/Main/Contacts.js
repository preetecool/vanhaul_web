import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contacts = () => {
	const [contacts, setContacts] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const [suggestions, setSuggestions] = useState([]);
	const [value, setValue] = useState("");

	const apiURL = process.env.BASE_URL;

	useEffect(() => {
		const getContacts = async () => {
			const response = await fetch(`${apiURL}/api/users`);
			const data = await response.json();
			setContacts(data.data);
		};
		getContacts();
	}, []);

	//auto complete functionality
	const onChangeHandler = (searchValue) => {
		let results = [];
		if (searchValue.length > 0) {
			results = contacts.filter((shipperReceiver) => {
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
		setValue(searchValue);
		setSuggestions([]);
	};

	return (
		<>
			<br />
			<h2>Contacts</h2>
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
							}}
						>
							<img src={suggestion.image} />
							{suggestion.fullName}
						</li>
						<SecondaryListItem>{suggestion.role}</SecondaryListItem>
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

export default Contacts;
