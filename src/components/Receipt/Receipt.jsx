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

  const gasPrice = transactionReceipt ? (transactionReceipt.effectiveGasPrice) : (estimatedGasPrice);
  const estimateElement = transactionReceipt ? <></> : <span title="estimated to be">~ </span>

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
          {estimateElement} {ethers.utils.formatEther(gasPrice).substring(0, 6)} ETH
        </dd>
      </HorizontalSpacing>
      <hr />
      <HorizontalSpacing>
        <dt>Total</dt>
        <dd>
          {estimateElement} {amount && ethers.utils.formatEther(ethers.utils.parseEther(amount).add(gasPrice)).substring(0, 6)} ETH
        </dd>
      </HorizontalSpacing>
    </dl>
  )
};

export default Receipt;
