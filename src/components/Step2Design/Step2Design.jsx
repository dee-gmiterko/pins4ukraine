import React, { useState } from "react";
import { navigate } from "gatsby";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ProductViewer from "../ProductViewer/ProductViewer";
import Slider from "react-slick";
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";

const Step2Design = () => {
  const { design, setDesign, totalDesigns, rewardDeserved } = useMinter();

  const designIds = Array.from({ length: totalDesigns }, (_, i) => i+1) || [];

  const setDesignNavigate = (designId) => {
    setDesign(designId);
    navigate("/mint/confirm");
  }

  return (
    <div>
      <div className="designs-container">
        {designIds.map((designId, index) => (
          <button
            key={index}
            onClick={setDesignNavigate.bind(this, designId)}
            className="design"
            disabled={!rewardDeserved}
          >
            <ProductViewer
              imagesBaseUrl={`/assets/${designId}`}
              imagesCount={20}
              imagesFiletype="webp"
            />
            {designNames[designId.toString()]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Step2Design;
