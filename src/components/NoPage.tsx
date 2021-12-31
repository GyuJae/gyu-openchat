import React from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: ${(props) => props.theme.basicWidth};
  margin: 0px auto;
  color: ${(props) => props.theme.color.accent};
  font-size: 25px;
  font-weight: 700;
`;

const NoPage = () => {
  return <Container>No Page</Container>;
};

export default NoPage;
