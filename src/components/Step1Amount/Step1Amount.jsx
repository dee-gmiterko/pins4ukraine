import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import styled from 'styled-components';
import useMinter from "../../hooks/useMinter";
import {FormattedRelativeTime} from 'react-intl'


const ActionPrompt = styled.p`
  color: #fff;
  font-size: 3.4rem;
  font-weight: bold;
  @media(max-width: 700px) {
    font-size: 2rem;
  }
`;

const AmountInput = styled.input`
  color: #bb8c37;
  background: none;
  border: none;
  border-bottom: 4px solid white;
  font-size: 3rem;
  font-weight: bold;
  width: 8rem;
  text-align: right;
  &:focus {
    color: #fbb03b;
    outline: none;
  }
  @media(max-width: 700px) {
    font-size: 2rem;
  }
`;

const RelevantInfo = styled.strong`
  color: #bb8c37;
  margin: 0 6px;
`;

const MobileBlock = styled.span`
  @media(max-width: 700px) {
    display: block;
  }
`;

const Step1Amount = () => {
  const {amount, setAmount, tokenPrice, tokenPriceIncrease, nextIncreaseIn} = useMinter();

  return (
      <div>
        <p>Choose your support.</p>
        <ActionPrompt>
          I'm happy to donate
          <MobileBlock>
            <AmountInput className="minter-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} step={0.01} min={0} />
            ETH.
          </MobileBlock>
        </ActionPrompt>
        <p>
          You have to donate at least <RelevantInfo>{tokenPrice && ethers.utils.formatEther(tokenPrice)}</RelevantInfo> to get a pin.
        </p>
        <p>
          Time until the price rises by {tokenPriceIncrease && ethers.utils.formatEther(tokenPriceIncrease)} ETH: <RelevantInfo>{
            nextIncreaseIn && <FormattedRelativeTime value={Math.round(nextIncreaseIn/1000)} updateIntervalInSeconds={1} />
          }</RelevantInfo>
        </p>
      </div>
  );
}

export default Step1Amount;
