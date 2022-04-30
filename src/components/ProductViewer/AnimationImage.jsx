import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  user-select: none;
  touch-action: none;
  cursor: inherit;
  -webkit-user-drag: none;
`;

const AnimationImage = ({ src, isVisible, width, height }) => {
  let d = isVisible ? "1" : "0";
  return (
    <StyledImage
      alt="Rotating object"
      src={src}
      style={{ opacity: `${d}` }}
    ></StyledImage>
  );
};

export default AnimationImage;
