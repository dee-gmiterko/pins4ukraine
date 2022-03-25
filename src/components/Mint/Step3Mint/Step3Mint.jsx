import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Pin4UkraineContract from '../../../artifacts/contracts/Pin4Ukraine.sol/Pin4Ukraine.json';

const Step3Mint = () => {
  const { library, chainId, active, error } = useWeb3React();
  const [minting, setMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [mintMessage, setMintMessage] = useState(undefined);

  const mint_price = 0.2;

  const mint = async () => {
    setMinting(true);
    try {

      const signer = library.getSigner();
      const contract = new ethers.Contract(process.env.GATSBY_SMART_CONTRACT, Pin4UkraineContract.abi, signer);

      const mintAmountInt = parseInt(mintAmount, 10);
      const totalPrice = mint_price * mintAmountInt;
      const transaction = await contract.mint(mintAmountInt, { value: ethers.utils.parseEther(totalPrice.toString()) });
      await transaction.wait();

    } catch (err) {
      setMintMessage(err.toString());
    }
    setMinting(false);
  };

  const showError = (chainId !== process.env.GATSBY_CHAIN_ID) && "Incorrect chain ID" || error;

  var button = null;
  if (showError) {
    button = (
      <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded cursor-not-allowed">
        Error: {showError.toString()}
      </button>
    )
  } else if (active) {
    button = (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded" onClick={mint}>
        Mint
      </button>
    )
  } else if (active && minting) {
    button = (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded">
        Minting...
      </button>
    )
  } else {
    button = (
      <AnchorLink className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded cursor-not-allowed" to="/wallet">
        Connect wallet
      </AnchorLink>
    )
  }

  return (
    <div>
      <div className="flex mb-4">
        <div>
          <input type="text" className="px-4 py-3" value={mintAmount} onChange={e => setMintAmount(e.target.value)} />
        </div>
        <div>{button}</div>
        <div className="w-full">
          {error || mintMessage}
        </div>
      </div>
    </div>
  );
}

export default Step3Mint;
