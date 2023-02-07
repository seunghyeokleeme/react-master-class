import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`;

//  bgColor: "white",
//   textColor: "black",
//   btnColor: "tomato",

function App() {
  return (
    <Container>
      <H1>Hello React.js</H1>
    </Container>
  );
}

export default App;
