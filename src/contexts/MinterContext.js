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
  const mintOpenSince = BigNumber.from("1652054400"); // Mon May 09 2022 00:00:00 UTC
  const mintOpenUntil = BigNumber.from("1667779200"); // Mon Nov 07 2022 00:00:00 UTC

  const [tokenPrice, setTokenPrice] = useState(undefined);
  const [tokenPriceIncrease, setTokenPriceIncrease] = useState(undefined);
  const [nextIncreaseAt, setNextIncreaseAt] = useState(undefined);
  const [nextIncreaseTimeout, setNextIncreaseTimeout] = useState(undefined);
  const [estimatedGas, setEstimatedGas] = useState(BigNumber.from(0));
  const [gasPrice, setGasPrice] = useState(BigNumber.from(0));

  const [amount, setAmount] = useState(0);
  const [design, setDesign] = useState(1);

  const [transaction, setTransaction] = useState({
  "hash": "0xd080e7d4983d9ed9e539075b8e2c8cf34e94c7da90eddc4b7625f62829f3e8ec",
  "type": 2,
  "accessList": null,
  "blockHash": null,
  "blockNumber": null,
  "transactionIndex": null,
  "confirmations": 0,
  "from": "0x5Fe43b690Fb180aDC357F0bbEbaEa679663E5821",
  "gasPrice": {
    "_hex": "0x7026956e",
    "_isBigNumber": true
  },
  "maxPriorityFeePerGas": {
    "_hex": "0x59682f00",
    "_isBigNumber": true
  },
  "maxFeePerGas": {
    "_hex": "0x7026956e",
    "_isBigNumber": true
  },
  "gasLimit": {
    "_hex": "0x8d1b",
    "_isBigNumber": true
  },
  "to": "0x15ad44F5601C4bead5E78B411161487Ee9fBc0B5",
  "value": {
    "_hex": "0x2386f26fc10000",
    "_isBigNumber": true
  },
  "nonce": 12,
  "data": "0xa0712d680000000000000000000000000000000000000000000000000000000000000003",
  "r": "0xd42987059ba120f4d67a709b38f0cab4b79e76ba9cb0424eae62bbcc841a309d",
  "s": "0x568be8744d311b212e3e7f45f31d996ac812817f73c9759ea2cb12cfa0fbc5b7",
  "v": 0,
  "creates": null,
  "chainId": 0
});
  const [transactionReceipt, setTransactionReceipt] = useState({
  "to": "0x15ad44F5601C4bead5E78B411161487Ee9fBc0B5",
  "from": "0x5Fe43b690Fb180aDC357F0bbEbaEa679663E5821",
  "contractAddress": null,
  "transactionIndex": 46,
  "gasUsed": BigNumber.from({
    "_hex": "0x8d1b",
    "_isBigNumber": true
  }),
  "logsBloom": "0x00000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000800000000000800000020000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000008000000000000000020000000000000000000200000000000000000000000000000000000080000000000",
  "blockHash": "0x4d74e374e7f38c44a2bb656419e381125867864fdb9f9b85d052da56ff099ea4",
  "transactionHash": "0xd080e7d4983d9ed9e539075b8e2c8cf34e94c7da90eddc4b7625f62829f3e8ec",
  "logs": [
    {
      "transactionIndex": 46,
      "blockNumber": 10650630,
      "transactionHash": "0xd080e7d4983d9ed9e539075b8e2c8cf34e94c7da90eddc4b7625f62829f3e8ec",
      "address": "0x15ad44F5601C4bead5E78B411161487Ee9fBc0B5",
      "topics": [
        "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62",
        "0x0000000000000000000000005fe43b690fb180adc357f0bbebaea679663e5821",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000005fe43b690fb180adc357f0bbebaea679663e5821"
      ],
      "data": "0x00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001",
      "logIndex": 175,
      "blockHash": "0x4d74e374e7f38c44a2bb656419e381125867864fdb9f9b85d052da56ff099ea4"
    }
  ],
  "blockNumber": 10650630,
  "confirmations": 1,
  "cumulativeGasUsed": {
    "_hex": "0xc3cb37",
    "_isBigNumber": true
  },
  "effectiveGasPrice": BigNumber.from(1818355938),
  "status": 1,
  "type": 2,
  "byzantium": true,
  "events": [
    {
      "transactionIndex": 46,
      "blockNumber": 10650630,
      "transactionHash": "0xd080e7d4983d9ed9e539075b8e2c8cf34e94c7da90eddc4b7625f62829f3e8ec",
      "address": "0x15ad44F5601C4bead5E78B411161487Ee9fBc0B5",
      "topics": [
        "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62",
        "0x0000000000000000000000005fe43b690fb180adc357f0bbebaea679663e5821",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000005fe43b690fb180adc357f0bbebaea679663e5821"
      ],
      "data": "0x00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001",
      "logIndex": 175,
      "blockHash": "0x4d74e374e7f38c44a2bb656419e381125867864fdb9f9b85d052da56ff099ea4",
      "args": [
        "0x5Fe43b690Fb180aDC357F0bbEbaEa679663E5821",
        "0x0000000000000000000000000000000000000000",
        "0x5Fe43b690Fb180aDC357F0bbEbaEa679663E5821",
        {
          "_hex": "0x03",
          "_isBigNumber": true
        },
        {
          "_hex": "0x01",
          "_isBigNumber": true
        }
      ],
      "event": "TransferSingle",
      "eventSignature": "TransferSingle(address,address,address,uint256,uint256)"
    }
  ]
} && undefined);

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
