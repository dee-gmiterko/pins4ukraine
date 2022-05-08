import React, { useEffect } from "react";
import { ethers } from "ethers";
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";
import styled from "styled-components";

const HorizontalSpacing = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media(max-width: 700px) {
    div {
      width: 100%;
    }
  }
`;

const Receipt = () => {
  const { amount, design, rewardDeserved, estimatedGasPrice, transactionReceipt } = useMinter();

  console.log(estimatedGasPrice, transactionReceipt);

  const gasPrice = transactionReceipt ? (
    ethers.utils.formatEther(transactionReceipt.effectiveGasPrice).substring(0, 6)
  ) : (
    <>
      <span title="estimated to be">~ </span>
      {ethers.utils.formatEther(estimatedGasPrice).substring(0, 6)}
    </>
  );

  return (
    <dl className="receipt">
      <HorizontalSpacing>
        <dt>{
          rewardDeserved ? (
            <>1* {designNames[design.toString()]}</>
          ) : (
            <>No reward</>
          )}
        </dt>
        <dd></dd>
      </HorizontalSpacing>
      <hr />
      <HorizontalSpacing>
        <dt>Support</dt>
        <dd>
          {amount} ETH
        </dd>
      </HorizontalSpacing>
      <HorizontalSpacing>
        <dt>Gas price</dt>
        <dd>
          {gasPrice} ETH
        </dd>
      </HorizontalSpacing>
      <hr />
      <HorizontalSpacing>
        <dt>Total</dt>
        <dd>
          <span alt="About">~ </span>
          {amount && ethers.utils.formatEther(ethers.utils.parseEther(amount).add(estimatedGasPrice)).substring(0, 6)} ETH
        </dd>
      </HorizontalSpacing>
    </dl>
  )
};

export default Receipt;
