import React, { createContext, useState, useEffect } from "react";
import { navigate } from "gatsby";
import { ethers, BigNumber } from "ethers";
import axios from "axios";
import moment from "moment";
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { parseError } from "../utils/error";
import Pins4UkraineContract from '../artifacts/contracts/Pins4Ukraine.sol/Pins4Ukraine.json';

const ONE_WEEK = BigNumber.from(604800);

const MinterContext = createContext({});

export const MinterProvider = ({ children }) => {
  const { library, chainId, active, error } = useWeb3React();

  const provider = library ? library.getSigner() : new ethers.providers.AlchemyProvider("homestead", process.env.GATSBY_ALCHEMY_API_KEY);
  const contract = new ethers.Contract(process.env.GATSBY_SMART_CONTRACT, Pins4UkraineContract.abi, provider);

  const totalDesigns = 6;
  const mintOpenSince = BigNumber.from("1656115200"); // Sat Jun 25 2022 00:00:00 UTC
  const mintOpenUntil = BigNumber.from("1671840000"); // Sat Dec 24 2022 00:00:00 UTC

  const [tokenPrice, setTokenPrice] = useState(undefined);
  const [tokenPriceIncrease, setTokenPriceIncrease] = useState(undefined);
  const [nextIncreaseAt, setNextIncreaseAt] = useState(undefined);
  const [nextIncreaseTimeout, setNextIncreaseTimeout] = useState(undefined);
  const [estimatedGas, setEstimatedGas] = useState(BigNumber.from(0));
  const [gasPrice, setGasPrice] = useState(BigNumber.from(0));

  const [amount, setAmount] = useState(0);
  const [design, setDesign] = useState(1);

  const [transaction, setTransaction] = useState(undefined);
  const [transactionReceipt, setTransactionReceipt] = useState(undefined);

  const rewardDeserved = amount && (ethers.utils.parseEther(amount.toString()).gte(tokenPrice));
  const missingToReward = (tokenPrice && amount) ? tokenPrice.sub(ethers.utils.parseEther(amount.toString())) : BigNumber.from(0);
  const estimatedGasPrice = estimatedGas.mul(gasPrice);

  const tokenPriceAt = (time) => {
      // ethers BigNumber implementation of tokenPriceAt function from the smart contract
      const t = time.sub(mintOpenSince); // seconds
      const w = t.div(ONE_WEEK).add(BigNumber.from(1)); // 1-26
      const w3 = w.mul(w).mul(w); // 1-17576
      let p = (w3.mul(BigNumber.from(50))).div(BigNumber.from(17576)); // 0-50
      if (p.lt(BigNumber.from(1))) {
        p = BigNumber.from(1); // 1-50
      }
      const price = p.mul(BigNumber.from("10000000000000000"));

      return price;
  }

  useEffect(() => {
    const calculatePrice = () => {
      const time = BigNumber.from(moment().unix());
      const tokenPrice = tokenPriceAt(time);
      setTokenPrice(tokenPrice);
      setAmount(ethers.utils.formatEther(tokenPrice));

      let nextWeek = time.div(ONE_WEEK).mul(ONE_WEEK).add(ONE_WEEK);
      let nextPrice = tokenPriceAt(nextWeek);
      while (!nextPrice.gt(tokenPrice)) {
        nextWeek = nextWeek.add(ONE_WEEK);
        nextPrice = tokenPriceAt(nextWeek);
      }
      const tokenPriceIncrease = nextPrice.sub(tokenPrice);
      setTokenPriceIncrease(tokenPriceIncrease);

      const nextIncreaseAt = nextWeek.toNumber() * 1000;
      const nextIncreaseIn = nextIncreaseAt - moment.now();
      setNextIncreaseAt(nextIncreaseAt);

      // schedule update
      if(nextIncreaseTimeout) {
        clearTimeout(nextIncreaseTimeout);
      }
      setNextIncreaseTimeout(setTimeout(calculatePrice, nextIncreaseIn + 100));
    }
    calculatePrice();
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
      let transaction;

      if(rewardDeserved) {
        transaction = await contract.mint(design, { value: ethers.utils.parseEther(amount) });

      } else {
        const signer = library.getSigner();
        transaction = await signer.sendTransaction({
          to: process.env.GATSBY_SMART_CONTRACT,
          value: ethers.utils.parseEther(amount)
        });
      }

      navigate("/mint/success");

      setTransaction(transaction);
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

        tokenPrice,
        tokenPriceIncrease,
        totalDesigns,
        mintOpenSince,
        mintOpenUntil,
        nextIncreaseAt,
        estimatedGasPrice,

        amount,
        setAmount,
        design,
        setDesign,
        transaction,
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
