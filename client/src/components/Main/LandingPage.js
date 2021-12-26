import React from "react";
import { Link } from "react-router-dom";
import truckingImg01 from "../../assets/img/national-transport.png";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	return (
		<>
			<Wrapper>
				<LeftContent>
					<HeadingOne>
						The Best Dry Van <br />
						Logistics Solution
					</HeadingOne>
					<p>
						VanHaul offers an easy to use solution for all of <br />
						your dry-van dispatching needs.
					</p>
					<LinkTo onClick={loginWithRedirect}>Register Account</LinkTo>
				</LeftContent>
				<RightContent>
					<BG>
						<ImgWrap>
							<HeroImg src={truckingImg01}></HeroImg>
						</ImgWrap>
					</BG>
				</RightContent>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const LeftContent = styled.div`
	margin-top: 7em;
	width: 50%;
	padding: 5%;
`;

const HeadingOne = styled.h1`
	font-size: 3em;
`;

const BG = styled.div`
	padding: 2%;
	border-top-left-radius: 50%;
	border-bottom-left-radius: 50%;
	background: blue;
	height: 100vh;
	width: 40vw;
`;

const ImgWrap = styled.div`
	display: flex;
	padding: 5%;
	width: 410px;
	height: 410px;
	border-radius: 50%;
	border: 1px solid blue;
	margin: 9em 0 0 -4em;
`;

const RightContent = styled.div`
	margin-left: auto;
`;

const HeroImg = styled.img``;

const LinkTo = styled(Link)`
	display: flex;
	color: blue;
	border: 1px solid blue;
	margin-top: 8%;
	border-radius: 10px;
	width: 200px;
	height: 50px;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	text-decoration: none;
	&:hover {
		color: white;
		background: blue;
	}
`;

export default LandingPage;
