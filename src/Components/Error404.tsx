import styled from "styled-components";

const Title = styled.h2`
  font-size: 43px;
  color: red;
  font-weight: bold;
`;

function Error404() {
  return (
    <Title>Sorry! The information of this Coin is not in the API!!!</Title>
  );
}

export default Error404;
