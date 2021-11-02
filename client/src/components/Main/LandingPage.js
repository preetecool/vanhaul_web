import React from "react";

import heroimg from "../../assets/img/hero.jpg";
import styled from "styled-components";

const LandingPage = () => {
	return (
		<>
			<h2>Welcome to VanHaul</h2>
			<Wrapper>
				<HeroImage src={heroimg}></HeroImage>
				<InfoCard>
					<h4>
						From one ocean to the other,
						<br />
						shipping dry goods for all.
					</h4>

					<MainButton>Learn More</MainButton>
				</InfoCard>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const HeroImage = styled.img`
	width: 70%;
	max-width: 100%;
`;

const InfoCard = styled.div`
	background: #fafafa;
	display: flex;
	flex-direction: column;
	padding: 3%;
	margin-left: -5%;
	margin-top: 5%;
	margin-bottom: -5%;
	align-items: center;
	align-content: center;
	justify-content: center;
`;

const MainButton = styled.button`
	width: 200px;
	height: 50px;
	border: 1px solid blue;
	border-radius: 10px;
	margin-top: 5%;
	margin-right: auto;

	cursor: pointer;

	&:hover {
		color: white;
		background: blue;
	}
`;

export default LandingPage;
