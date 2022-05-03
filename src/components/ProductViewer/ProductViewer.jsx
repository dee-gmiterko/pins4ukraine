import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import AnimationImage from "./AnimationImage";

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  padding-top: 125%;
  user-select: none;
  touch-action: none;
`;

const ProductViewer = ({
  imagesCount,
  imagesBaseUrl,
  imagesFiletype,
  imageFilenamePrefix,
  imageInitialIndex = 0,
}) => {
  const elementRef = useRef(null);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [startingImageIndexOnPointerDown, setStartingImageIndexOnPointerDown] =
    useState(0);
  const [currentMousePosition, setCurrentMousePosition] = useState(0);
  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    function createImageSources() {
      let baseUrl = imagesBaseUrl.endsWith("/")
        ? imagesBaseUrl
        : imagesBaseUrl + "/";
      let srces = [];
      let fileType = imagesFiletype.replace(".", "");
      for (let i = 1; i <= imagesCount; i++) {
        srces.push({
          src: `${baseUrl}${
            imageFilenamePrefix ? imageFilenamePrefix : ""
          }${i}.${fileType}`,
          index: i.toString(),
        });
      }
      return srces;
    }
    setImageSources(createImageSources());
  }, [imagesBaseUrl, imagesFiletype, imagesCount, imageFilenamePrefix]);

  const onMouseMove = (e) => {
    setCurrentMousePosition(e.clientX);
  };

  let selectedImageIndex = Math.floor(imagesCount / 2);
  if (elementRef.current && currentMousePosition > 0) {
    const boundingBox = elementRef.current.getBoundingClientRect();
    selectedImageIndex = Math.min(imagesCount-1,
      (imagesCount-1) - Math.floor( ((currentMousePosition - boundingBox.x) / boundingBox.width) * imagesCount )
    );
  }

  return (
    <StyledDiv
      ref={elementRef}
      onPointerMove={onMouseMove}
    >
      {imageSources.map((s, index) => (
        <AnimationImage
          src={s.src}
          isVisible={index === selectedImageIndex}
          key={index}
        ></AnimationImage>
      ))}
    </StyledDiv>
  );
};

export default ProductViewer;
