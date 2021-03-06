import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import styled from 'styled-components';
import useMinter from "../../hooks/useMinter";
import Countdown from 'react-countdown';
import moment from "moment";

const ActionPrompt = styled.p`
  color: #fff !important;
  font-size: 4rem;
  font-weight: 900;
  @media(max-width: 700px) {
    font-size: 2rem;
  }
  margin: 2rem 0;
`;

const AmountInput = styled.input`
  color: #bb8c37;
  background: none;
  border: none;
  border-bottom: 8px solid white;
  font-size: 4rem;
  font-weight: 900;
  width: 10rem;
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
  const {amount, setAmount, tokenPrice, tokenPriceIncrease, nextIncreaseAt} = useMinter();

  const countdownRenderer = ({days, hours, minutes, seconds}) => {
    let v = "";
    if (days > 0) {
      v += `${days}d `;
    }
    if (hours > 0 || days > 0) {
      v += `${hours}h `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      v += `${minutes}m `;
    }
    v += `${seconds}s`;
    return v;
  };

  const countdown = nextIncreaseAt && (
    <span title={moment(nextIncreaseAt).format("dddd, MMMM Do YYYY, hh:mm:ss")}>
      <Countdown date={nextIncreaseAt}  renderer={countdownRenderer} />
    </span>
  );

  return (
      <div>
        <p>Choose your support.</p>
        <ActionPrompt>
          I'm happy to donate<> </>
          <MobileBlock>
            <AmountInput className="minter-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} step={0.01} min={0} />
            &nbsp;ETH.
          </MobileBlock>
        </ActionPrompt>
        <p>
          You need to donate at least <Link to="/story" state={{ expandFaq: 'why-does-the-price-of-the-pins-keep-rising' }}><RelevantInfo>{tokenPrice && ethers.utils.formatEther(tokenPrice)}</RelevantInfo></Link> to get a pin.
          <br />
          Time until the price rises by {tokenPriceIncrease && ethers.utils.formatEther(tokenPriceIncrease)} ETH:
          <br />
          <Link to="/story" state={{ expandFaq: 'why-does-the-price-of-the-pins-keep-rising' }}><RelevantInfo>{countdown}</RelevantInfo></Link>
        </p>
      </div>
  );
}

export default Step1Amount;
