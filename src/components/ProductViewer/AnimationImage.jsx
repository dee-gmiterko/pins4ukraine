import React from "react";
import styled, { css } from "styled-components";

const ImageContainer = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  user-select: none;
  touch-action: none;
  cursor: inherit;
  -webkit-user-drag: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
`;

const AnimationImage = ({ src, isVisible }) => {
  let d = isVisible ? "1" : "0";
  return (
    <ImageContainer>
      <Image
        alt="Rotating object"
        src={src}
        style={{ opacity: `${d}` }}
      />
    </ImageContainer>
  );
};

export default AnimationImage;
