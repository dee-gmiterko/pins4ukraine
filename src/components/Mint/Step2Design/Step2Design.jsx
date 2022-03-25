import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { AnchorLink } from "gatsby-plugin-anchor-links";

const Step2Design = ({design, setDesign, firstOpenDesign, lastOpenDesign}) => {

  const designIds = firstOpenDesign && lastOpenDesign && Array.from({ length: lastOpenDesign - firstOpenDesign + 1 }, (_, i) => i);

  return (
    <div>
      {designIds && designIds.map((designId, index) => (
        <button key={index} onClick={() => setDesign.bind(designId)}>
          <img src={`assets/${designId}`} alt="Pin4Ukraine" />
        </button>
      ))}
    </div>
  );
}

export default Step2Design;
