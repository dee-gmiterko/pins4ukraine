/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
**/
import React from "react";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { MinterProvider } from "./src/contexts/MinterContext";
import { IntlProvider } from 'react-intl';

import './src/styles/reset.scss';
import './src/styles/global.scss';
import './src/styles/main.scss';
import './src/styles/slider.scss';
import 'react-toastify/dist/ReactToastify.css';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export const wrapRootElement = ({ element }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MinterProvider>
        <IntlProvider locale="en-US">
          {element}
        </IntlProvider>
      </MinterProvider>
    </Web3ReactProvider>
  )
}
