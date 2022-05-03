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
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
};

const AllDesignSlider = () => {
  const { design, setDesign, firstOpenDesign, lastOpenDesign, rewardDeserved } = useMinter();

  const designIds = firstOpenDesign > 0 && lastOpenDesign > 0 && Array.from({ length: lastOpenDesign }, (_, i) => i+1) || [];

  return (
    <div className="all-design-slider">
      <Slider {...settings}>
        {designIds.map((designId, index) => (
          <div key={index}>
            <ProductViewer
              imagesBaseUrl={`/assets/${designId}`}
              imagesCount={16}
              imagesFiletype="png"
            />
            <p>
              {designNames[designId.toString()]}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AllDesignSlider;
