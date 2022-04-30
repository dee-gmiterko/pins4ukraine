import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ProductViewer from "../ProductViewer/ProductViewer";
import Slider from "react-slick";
import useMinter from "../../hooks/useMinter";

const Step2Design = () => {
  const { design, setDesign, firstOpenDesign, lastOpenDesign } = useMinter();

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

  console.log(design);

  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          {designIds.map((designId, index) => (
            <div key={index}>
              <div className="design-container">
                <div className={(design === designId) ? "design design-selected": "design"}>
                  <ProductViewer
                    imagesBaseUrl={`/assets/${designId}`}
                    imagesCount={16}
                    imagesFiletype="png"
                    width={400}
                    height={440}
                  />
                </div>
                <button
                  onClick={setDesign.bind(this, designId)}
                  className={(design === designId) ? "btn primary": "btn"}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Step2Design;
