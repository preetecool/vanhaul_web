import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoadDetails = () => {
  const { _id } = useParams();

  const { user, isAuthenticated } = useAuth0();
  const [load, setLoad] = useState({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const getLoadDetails = async () => {
      const response = await fetch(`/api/loads/${_id}`);
      const data = await response.json();
      setLoad(data.data);
      setLoading(false);
    };
    getLoadDetails();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated) {
      return;
    }
    const fetchUsers = async () => {
      const id = user.email;
      let response;
      try {
        response = await fetch(`/api/users/${id}`);
        const data = await response.json();

        setUserData(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [isAuthenticated]);

  if (!isAuthenticated || !load || loading) return null;
  return (
    <>
      <Container key={load}>
        <InfoLabel>Trip Number</InfoLabel>
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
            <LoadInfo>
              <InfoLabel>Load Rate</InfoLabel>
              {load.rate}
            </LoadInfo>
          </LoadInfoWrapper>
        </LoadInfoContainer>
        <br />
        <Seperation />
        <Eta>
          <InfoLabel>ETA</InfoLabel>
          {load.drivingTime}
        </Eta>
        <br />

        <ButtonWrap>
          <CancelLoad>Cancel Shipment</CancelLoad>
          <CompleteLoad>Complete Shipment</CompleteLoad>
        </ButtonWrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 70%;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.15) 2px 2px 8px;
  margin-bottom: 3%;
  padding: 2.5%;
`;

const InfoLabel = styled.span`
  display: block;
  font-size: 0.7em;
  color: lightgrey;
`;

const ViewLoadDetails = styled(Link)`
  float: right;
  margin-top: -2%;
`;

const Eta = styled.span`
  display: block;
  font-size: 1em;
  font-weight: bold;
  color: blue;
  text-align: center;
  margin-top: 15px;
`;

const CancelLoad = styled.button`
  border: 1px solid lightcoral;
  width: 200px;
  height: 4vh;
  border-radius: 10px;
  margin: 2%;

  cursor: pointer;

  &:hover {
    color: white;
    background: lightcoral;
  }
`;

const CompleteLoad = styled.button`
  border: 1px solid blue;
  width: 200px;
  height: 4vh;
  border-radius: 10px;
  margin: 2%;

  cursor: pointer;

  &:hover {
    color: white;
    background: blue;
  }
`;

const Seperation = styled.div`
  border-bottom: 1px solid lightgrey;
  width: 100%;
`;

const LoadInfo = styled.div`
  font-size: 0.9em;
  padding-top: -0.5%;
`;

const LoadInfoWrapper = styled.div`
  width: 50%;
  padding-right: 4%;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const LoadInfoContainer = styled.div`
  display: flex;
`;

export default LoadDetails;
