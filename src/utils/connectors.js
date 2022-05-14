import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

// based on https://github.com/NoahZinsmeister/web3-react/blob/v6/example/connectors.ts
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { MagicConnector } from "@web3-react/magic-connector";
import iconMetamask from "./wallet_icons/metamask.svg";
import iconMagic from "./wallet_icons/magic.svg";
import iconWalletConnect from "./wallet_icons/wallet-connect.svg";

const RPC_URLS = {
  1: process.env.GATSBY_WALLETCONNECT_RPC_URL,
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 4, 1337] })

export const magic = new MagicConnector({
  apiKey: process.env.GATSBY_MAGIC_API_KEY,
  chainId: 1,
  email: 'd.gmiterko@gmail.com'
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});

export const connectorsData = [
  {
    methodMessage: "Connect using browser extension",
    name: "MetaMask",
    icon: iconMetamask,
    connector: injected,
  },
  // {
  //   methodMessage: "Connect using your email",
  //   name: "Magic",
  //   icon: iconMagic,
  //   connector: magic,
  // },
  // {
  //   methodMessage: "Connect using QR code",
  //   name: "WalletConnect",
  //   icon: iconWalletConnect,
  //   connector: walletconnect,
  // },
];
