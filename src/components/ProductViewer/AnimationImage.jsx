import React from "react";
import styled, { css } from "styled-components";

const StyledImage = styled.img`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  user-select: none;
  touch-action: none;
  cursor: inherit;
  -webkit-user-drag: none;
  ${(props) =>
    css`
    width: ${props.width}px;
    height: ${props.height}px;
    `
  }
`;

const AnimationImage = ({ src, isVisible, width, height }) => {
  let d = isVisible ? "1" : "0";
  return (
    <StyledImage
      alt="Rotating object"
      src={src}
      style={{ opacity: `${d}` }}
      width={width}
      height={height}
    ></StyledImage>
  );
};

export default AnimationImage;
