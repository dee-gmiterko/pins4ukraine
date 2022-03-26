import React, { useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Pin4UkraineContract from '../../artifacts/contracts/Pin4Ukraine.sol/Pin4Ukraine.json';

import Step1Wallet from "./Step1Wallet/Step1Wallet";
import Step2Design from "./Step2Design/Step2Design";
import Step3Mint from "./Step3Mint/Step3Mint";

const Mint = () => {
  const { library, chainId, active, error } = useWeb3React();

  const tokenPrice = 0.05;
  const [firstOpenDesign, setFirstOpenDesign] = useState(undefined);
  const [lastOpenDesign, setLastOpenDesign] = useState(undefined);
  const [mintOpenSince, setMintOpenSince] = useState(undefined);

  const [design, setDesign] = useState(0);
  const [mintError, setMintError] = useState(null);

  useEffect(() => {
    const initSmartContractState = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(process.env.GATSBY_SMART_CONTRACT, Pin4UkraineContract.abi, provider);

      const firstOpenDesignPromise = contract.firstOpenDesign();
      const lastOpenDesignPromise = contract.lastOpenDesign();
      const mintOpenSincePromise = contract.mintOpenSince();

      const [firstOpenDesign, lastOpenDesign, mintOpenSince] = await Promise.all(
        [firstOpenDesignPromise, lastOpenDesignPromise, mintOpenSincePromise]
      );

      setFirstOpenDesign(firstOpenDesign.toNumber());
      setDesign(firstOpenDesign.toNumber());
      setLastOpenDesign(lastOpenDesign.toNumber());
      setMintOpenSince(mintOpenSince.toNumber());
    }
    initSmartContractState().catch(setMintError);
  }, []);

  useEffect(() => {
    if(chainId && chainId !== parseInt(process.env.GATSBY_CHAIN_ID, 10)) {
      setMintError("Incorrect chain id!")
    }
  }, [chainId]);

  return (
    <div className="container mx-auto p-3 flex-column">

      <h3 className="text-xl">1. Connect wallet</h3>
      <p>You need na crypto wallet to support Ukraine in this way and to recieve a pin. <a href="https://metamask.io/" target="_blank">MetaMask</a> is the most commonly used one.</p>
      <Step1Wallet />

      <h3 className="text-xl mt-8">2. Select pin design</h3>
      <p>There is no difference between them, pick the one you like</p>
      <Step2Design design={design} setDesign={setDesign} firstOpenDesign={firstOpenDesign} lastOpenDesign={lastOpenDesign} />

      <h3 className="text-xl mt-8">3. Support</h3>
      <p>You can choose any amount to support Ukraine. Minimal amount to recieve an NFT pin is {tokenPrice}</p>
      <Step3Mint design={design} tokenPrice={tokenPrice} />
      {mintError && (
        <p className="color-red-600">
          {mintError.toString()}
        </p>
      )}
    </div>
  );
}

export default Mint;
