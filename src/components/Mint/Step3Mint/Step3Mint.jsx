import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Pin4UkraineContract from '../../../artifacts/contracts/Pin4Ukraine.sol/Pin4Ukraine.json';

const Step3Mint = ({design, tokenPrice}) => {
  const { library, chainId, active, error } = useWeb3React();
  const [minting, setMinting] = useState(false);
  const [mintPrice, setMintPrice] = useState('');
  const [mintMessage, setMintMessage] = useState(undefined);

  useEffect(() => {
    if(tokenPrice) {
      setMintPrice(tokenPrice.toString());
    }
  }, [tokenPrice])

  const mint = async () => {
    setMinting(true);
    try {

      const signer = library.getSigner();
      const contract = new ethers.Contract(process.env.GATSBY_SMART_CONTRACT, Pin4UkraineContract.abi, signer);

      const transaction = await contract.mint(design, { value: ethers.utils.parseEther(mintPrice) });
      await transaction.wait();

    } catch (err) {
      setMintMessage(err.toString());
    }
    setMinting(false);
  };


  return (
    <div>
      <div className="flex items-center justify-center">
        <input type="number" className="px-4 py-3 border text-3xl m-3" value={mintPrice} onChange={e => setMintPrice(e.target.value)} />
        <span className="text-2xl mr-6">ETH</span>
        <button disabled={!active || error || minting} className="text-2xl m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded cursor-pointer" onClick={mint}>
          {minting ? 'Minting...' : 'Support'}
        </button>
      </div>
      <div className="w-full">
        <p className="color-red-600">
          {error || mintMessage}
        </p>
      </div>
    </div>
  );
}

export default Step3Mint;
