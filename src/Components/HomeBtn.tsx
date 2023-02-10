import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.textColor};
  border-radius: 25px;
  a {
    font-size: 20px;
    color: ${props => props.theme.bgColor};
    font-weight: bold;
  }
  position: fixed;
  top: 20px;
  left: 30px;
`;

export function HomeBtn() {
  return (
    <Container>
      <Link to={`/`}>&larr;Home</Link>
    </Container>
  );
}
