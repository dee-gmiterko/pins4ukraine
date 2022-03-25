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

  const [tokenPrice, setTokenPrice] = useState(undefined);
  const [firstOpenDesign, setFirstOpenDesign] = useState(undefined);
  const [lastOpenDesign, setLastOpenDesign] = useState(undefined);
  const [mintOpenSince, setMintOpenSince] = useState(undefined);

  const [design, setDesign] = useState(0);
  const [mintError, setMintError] = useState(null);

  useEffect(() => {
    const initSmartContractState = async () => {
      const signer = library.getSigner();
      const contract = new ethers.Contract(contract_address, Pin4UkraineContract.abi, signer);

      const tokenPricePromise = contract.TOKEN_PRICE();
      const firstOpenDesignPromise = contract.firstOpenDesign();
      const lastOpenDesignPromise = contract.lastOpenDesign();
      const mintOpenSincePromise = contract.mintOpenSince();

      const [tokenPrice, firstOpenDesign, lastOpenDesign, mintOpenSince] = await Promise.all(
        [tokenPricePromise, firstOpenDesignPromise, lastOpenDesignPromise, mintOpenSince]
      );

      setTokenPrice(tokenPrice);
      setFirstOpenDesign(firstOpenDesign);
      setLastOpenDesign(lastOpenDesign);
      setMintOpenSincePromise(mintOpenSincePromise);
    }
    initSmartContractState().catch(setMintError);
  }, []);

  return (
    <div>
      <p>Connect wallet</p>
      <Step1Wallet />
      <p>Select pin you want to recieve</p>
      <Step2Design design={design} setDesign={setDesign} firstOpenDesign={firstOpenDesign} lastOpenDesign={lastOpenDesign} />
      <p>Support</p>
      <Step3Mint design={design} tokenPrice={tokenPrice} />
    </div>
  );
}

export default Mint;
