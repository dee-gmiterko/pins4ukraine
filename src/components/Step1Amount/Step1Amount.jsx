import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import useMinter from "../../hooks/useMinter";
import {FormattedRelativeTime} from 'react-intl'

const Step1Amount = () => {
  const {amount, setAmount, tokenPrice, tokenPriceIncrease, nextIncreaseIn} = useMinter();

  return (
      <div>
        <p className="action-prompt">
          I'm happy to donate
          <input className="minter-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} step={0.01} min={0} />
          ETH.
        </p>
        <p>
          You have to donate at least <strong>{tokenPrice && ethers.utils.formatEther(tokenPrice)}</strong> to get a pin.
        </p>
        <p>
          Time until the price rises by {ethers.utils.formatEther(tokenPriceIncrease)} ETH: <strong>{
            nextIncreaseIn && <FormattedRelativeTime value={Math.round(nextIncreaseIn/1000)} updateIntervalInSeconds={1} />
          }</strong>
        </p>
      </div>
  );
}

export default Step1Amount;
