import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import moment from "moment";
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { parseError } from "../utils/error";

import Pins4UkraineContract from '../artifacts/contracts/Pins4Ukraine.sol/Pins4Ukraine.json';

const MinterContext = createContext({});

export const MinterProvider = ({ children }) => {
  const { library, chainId, active, error } = useWeb3React();

  const provider = library ? library.getSigner() : new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(process.env.GATSBY_SMART_CONTRACT, Pins4UkraineContract.abi, provider);

  const tokenPriceInitial = ethers.utils.parseEther("0.04");
  const tokenPriceIncrease = ethers.utils.parseEther("0.01");
  const increaseRate = 259200; // 3 days
  const [tokenPrice, setTokenPrice] = useState(undefined);
  const [firstOpenDesign, setFirstOpenDesign] = useState(undefined);
  const [lastOpenDesign, setLastOpenDesign] = useState(undefined);
  const [mintOpenSince, setMintOpenSince] = useState(undefined);
  const [mintOpenUntil, setMintOpenUntil] = useState(undefined);
  const [nextIncreaseIn, setNextIncreaseIn] = useState(undefined);
  const [nextIncreaseTimeout, setNextIncreaseTimeout] = useState(undefined);

  const [amount, setAmount] = useState(0);
  const [design, setDesign] = useState(0);

  useEffect(() => {
    const initSmartContractState = async () => {

      const firstOpenDesignPromise = contract.firstOpenDesign();
      const lastOpenDesignPromise = contract.lastOpenDesign();
      const mintOpenSincePromise = contract.mintOpenSince();
      const mintOpenUntilPromise = contract.mintOpenUntil();

      const [firstOpenDesign, lastOpenDesign, mintOpenSince, mintOpenUntil] = await Promise.all(
        [firstOpenDesignPromise, lastOpenDesignPromise, mintOpenSincePromise, mintOpenUntilPromise]
      );

      setFirstOpenDesign(firstOpenDesign.toNumber());
      setDesign(firstOpenDesign.toNumber());
      setLastOpenDesign(lastOpenDesign.toNumber());
      const mintOpenSinceN = mintOpenSince.toNumber()
      setMintOpenSince(moment.unix(mintOpenSinceN));
      const mintOpenUntilN = mintOpenUntil.toNumber();
      setMintOpenUntil(mintOpenUntilN > 0 ? moment.unix(mintOpenUntilN) : null);

      const calculateIncrease = () => {
        const increases = Math.floor((moment().unix() - mintOpenSinceN) / increaseRate);
        const tokenPrice = tokenPriceInitial.add(ethers.BigNumber.from(increases).mul(tokenPriceIncrease));
        setTokenPrice(tokenPrice);
        setAmount(ethers.utils.formatEther(tokenPrice));
        const nextIncreaseAt = (mintOpenSinceN + (increases+1) * increaseRate) * 1000;
        const nextIncreaseIn = nextIncreaseAt - moment.now();
        setNextIncreaseIn(nextIncreaseIn);

        // schedule update
        if(nextIncreaseTimeout) {
          clearTimeout(nextIncreaseTimeout);
        }
        setNextIncreaseTimeout(setTimeout(calculateIncrease, nextIncreaseIn + 100));
      }

      calculateIncrease();
    }
    initSmartContractState().catch(err => {
      toast.error(parseError(err));
    });
  }, []);

  useEffect(() => {
    if(chainId && chainId !== parseInt(process.env.GATSBY_CHAIN_ID, 10)) {
      toast.error("Incorrect chain id!")
    }
  }, [chainId]);

  return (
    <MinterContext.Provider
      value={{
        contract,

        tokenPrice,
        increaseRate,
        tokenPriceIncrease,
        firstOpenDesign,
        lastOpenDesign,
        mintOpenUntil,
        mintOpenSince,
        nextIncreaseIn,

        amount,
        setAmount,
        design,
        setDesign,
      }}
    >
      {children}
    </MinterContext.Provider>
  )
}

export default MinterContext;
