import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { AnchorLink } from "gatsby-plugin-anchor-links";

const Step2Design = ({design, setDesign, firstOpenDesign, lastOpenDesign}) => {

  const designIds = firstOpenDesign > 0 && lastOpenDesign > 0 && Array.from({ length: lastOpenDesign - firstOpenDesign + 1 }, (_, i) => i+1);

  return (
    <div className="flex">
      {designIds && designIds.map((designId, index) => (
        <div key={index} className="p-5 flex">
          {(design === designId) ? (
            <button onClick={() => setDesign.bind(designId)} className="block p-8 border-4 border-red-600 shadow-xl rounded-xl" >
              <img src={`assets/${designId}.jpeg`} alt="Pin4Ukraine" />
            </button>
          ) : (
            <button onClick={() => setDesign.bind(designId)} className="block p-8 border border-gray-100 shadow-xl rounded-xl" >
              <img src={`assets/${designId}.jpeg`} alt="Pin4Ukraine" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Step2Design;
