import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.4rem;
  width: auto;
`;

export default function Logo() {
  return (
    <StyledLogo>
      <Img src="vite.svg" alt="logo" />
    </StyledLogo>
  );
}
