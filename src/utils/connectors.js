import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

// based on https://github.com/NoahZinsmeister/web3-react/blob/v6/example/connectors.ts
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import iconMetamask from "./wallet_icons/metamask.svg";
import iconWalletConnect from "./wallet_icons/wallet-connect.svg";

const RPC_URLS = {
  1: process.env.GATSBY_RPC_URL_1,
  4: process.env.GATSBY_RPC_URL_4,
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] })

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});


export const connectorsData = [
  {
    name: "MetaMask",
    icon: iconMetamask,
    connector: injected,
  },
  // {
  //   name: "WalletConnect",
  //   icon: iconWalletConnect,
  //   connector: walletconnect,
  // },
];
