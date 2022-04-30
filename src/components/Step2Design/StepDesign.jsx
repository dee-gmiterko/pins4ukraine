import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ProductViewer from "../../ProductViewer/ProductViewer";
import Slider from "react-slick";

const StepDesign = ({design, setDesign, firstOpenDesign, lastOpenDesign}) => {

  const designIds = firstOpenDesign > 0 && lastOpenDesign > 0 && Array.from({ length: lastOpenDesign - firstOpenDesign + 1 }, (_, i) => i+1) || [];

  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
  };

  return (
    <Slider {...settings}>
      {designIds.map((designId, index) => (
        <div key={index}>
          <div className="flex-col">
            <div className="relative">
              {(design === designId) && <div className="bg-red-600 absolute" />}
              <ProductViewer
                imagesBaseUrl={`/assets/${designId}`}
                imagesCount={16}
                imagesFiletype="png"
                width={400}
                height={440}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={setDesign.bind(this, designId)}
                className="block px-8 py-4 border border-gray-100 shadow-xl rounded-xl"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default StepDesign;
