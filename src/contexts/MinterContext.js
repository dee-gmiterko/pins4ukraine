import React, { createContext, useState, useEffect } from "react";
import { navigate } from "gatsby";
import { ethers } from "ethers";
import axios from "axios";
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

  const [loading, setLoading] = useState(true);
  const tokenPriceInitial = ethers.utils.parseEther("0.04");
  const tokenPriceIncrease = ethers.utils.parseEther("0.01");
  const increaseRate = 259200; // 3 days
  const [tokenPrice, setTokenPrice] = useState(undefined);
  const [firstOpenDesign, setFirstOpenDesign] = useState(undefined);
  const [lastOpenDesign, setLastOpenDesign] = useState(undefined);
  const [mintOpenSince, setMintOpenSince] = useState(undefined);
  const [mintOpenUntil, setMintOpenUntil] = useState(undefined);
  const [nextIncreaseAt, setNextIncreaseAt] = useState(undefined);
  const [nextIncreaseTimeout, setNextIncreaseTimeout] = useState(undefined);
  const [estimatedGas, setEstimatedGas] = useState(ethers.BigNumber.from("0"));
  const [gasPrice, setGasPrice] = useState(ethers.BigNumber.from("0"));

  const [amount, setAmount] = useState(0);
  const [design, setDesign] = useState(0);
  const [transactionReceipt, setTransactionReceipt] = useState(undefined);

  const rewardDeserved = amount && (ethers.utils.parseEther(amount.toString()).gte(tokenPrice));
  const missingToReward = (tokenPrice && amount) ? tokenPrice.sub(ethers.utils.parseEther(amount.toString())) : ethers.BigNumber.from(0);
  const estimatedGasPrice = estimatedGas.mul(gasPrice);

  useEffect(() => {
    const initSmartContractState = async () => {
      /*
      const firstOpenDesignPromise = contract.firstOpenDesign();
      const lastOpenDesignPromise = contract.lastOpenDesign();
      const mintOpenSincePromise = contract.mintOpenSince();
      const mintOpenUntilPromise = contract.mintOpenUntil();

      const [firstOpenDesign, lastOpenDesign, mintOpenSince, mintOpenUntil] = await Promise.all(
        [firstOpenDesignPromise, lastOpenDesignPromise, mintOpenSincePromise, mintOpenUntilPromise]
      );
      */
      const [firstOpenDesign, lastOpenDesign, mintOpenSince, mintOpenUntil] = await Promise.all(
        [ethers.BigNumber.from("1"), ethers.BigNumber.from("6"), ethers.BigNumber.from("1651505561"), ethers.BigNumber.from("0")]
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
        setNextIncreaseAt(nextIncreaseAt);

        // schedule update
        if(nextIncreaseTimeout) {
          clearTimeout(nextIncreaseTimeout);
        }
        setNextIncreaseTimeout(setTimeout(calculateIncrease, nextIncreaseIn + 100));
      }

      calculateIncrease();
      setLoading(false);
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

  useEffect(() => {
    const initEstimatedGas = async () => {
      if(rewardDeserved) {
        setEstimatedGas(await contract.estimateGas.mint(design, { value: ethers.utils.parseEther(amount) }));
      } else {
        setEstimatedGas(ethers.BigNumber.from("21055"));
      }
    }
    initEstimatedGas().catch(err => {
      toast.error(parseError(err));
    });
  }, [rewardDeserved]);

  useEffect(() => {
    const initGasPrice = async () => {
      const gasPriceResponse = await axios.get("https://ethergas.io/standard");
      const gasPriceGwei = ethers.BigNumber.from(gasPriceResponse.data);
      const gasPrice = gasPriceGwei.mul(ethers.BigNumber.from("1000000000"));
      setGasPrice(gasPrice);
    }

    const handleGasPrice = () => {
      initGasPrice().catch(err => {
        console.error(parseError(err));
      });
    }

    const interval = setInterval(handleGasPrice, 20000);
    handleGasPrice();
    return () => {clearInterval(interval)};
  }, []);

  const mint = async () => {
    try {
      if(rewardDeserved) {
        const transaction = await contract.mint(design, { value: ethers.utils.parseEther(amount) });

      } else {
        const signer = library.getSigner();
        const transaction = await signer.sendTransaction({
          to: process.env.GATSBY_SMART_CONTRACT,
          value: ethers.utils.parseEther(amount)
        });
      }

      navigate("/mint/success");

      const transactionReceipt = await transaction.wait();
      setTransactionReceipt(transactionReceipt);

    } catch (err) {
      toast.error(parseError(err));
    }
  };

  return (
    <MinterContext.Provider
      value={{
        contract,

        loading,
        tokenPrice,
        increaseRate,
        tokenPriceIncrease,
        firstOpenDesign,
        lastOpenDesign,
        mintOpenUntil,
        mintOpenSince,
        nextIncreaseAt,
        estimatedGasPrice,

        amount,
        setAmount,
        design,
        setDesign,
        transactionReceipt,
        rewardDeserved,
        missingToReward,

        mint,
      }}
    >
      {children}
    </MinterContext.Provider>
  )
}

export default MinterContext;
