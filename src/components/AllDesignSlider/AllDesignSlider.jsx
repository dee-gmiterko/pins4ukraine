import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ProductViewer from "../ProductViewer/ProductViewer";
import styled from 'styled-components';
import Slider from "react-slick";
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";

var settings = {
  infinite: true,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
};

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DesignName = styled.div`
  color: #fff;
  padding: 1rem;
  font-family: "Trueno", sans-serif;
  font-style: italic;
  font-weight: normal;
  font-size: 1.2rem;
  // wahcky graphics
  background: linear-gradient(to right, #666 0%, #fff 50%, #666 100%);
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AllDesignSlider = () => {
  const { design, setDesign, firstOpenDesign, lastOpenDesign, rewardDeserved } = useMinter();

  const designIds = firstOpenDesign > 0 && lastOpenDesign > 0 && Array.from({ length: lastOpenDesign }, (_, i) => i+1) || [];

  return (
    <div className="all-design-slider">
      <Slider {...settings}>
        {designIds.map((designId, index) => (
          <div key={index}>
            <Slide>
              <div className="product-background">
                <ProductViewer
                  imagesBaseUrl={`/assets/${designId}`}
                  imagesCount={16}
                  imagesFiletype="webp"
                />
              </div>
              <DesignName>
                {designNames[designId.toString()]}
              </DesignName>
            </Slide>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AllDesignSlider;
