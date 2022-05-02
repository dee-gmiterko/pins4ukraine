import React, { useState } from "react";
import { navigate } from "gatsby";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ProductViewer from "../ProductViewer/ProductViewer";
import styled from 'styled-components';
import Slider from "react-slick";
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";

const ActionPrompt = styled.p`
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const Step2Design = () => {
  const { design, setDesign, firstOpenDesign, lastOpenDesign, rewardDeserved } = useMinter();

  const designIds = firstOpenDesign > 0 && lastOpenDesign > 0 && Array.from({ length: lastOpenDesign - firstOpenDesign + 1 }, (_, i) => i+1) || [];

  const setDesignNavigate = (designId) => {
    setDesign(designId);
    navigate("/mint/confirm");
  }

  return (
    <div>
      <ActionPrompt>Choose your reward.</ActionPrompt>
      <div className="designs-container">
        {designIds.map((designId, index) => (
          <button
            onClick={setDesignNavigate.bind(this, designId)}
            className="design"
            disabled={!rewardDeserved}
          >
            <ProductViewer
              imagesBaseUrl={`/assets/${designId}`}
              imagesCount={16}
              imagesFiletype="png"
            />
            {designNames[designId.toString()]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Step2Design;
