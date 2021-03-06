/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
**/
import React from "react";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { MinterProvider } from "./src/contexts/MinterContext";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './src/styles/reset.scss';
import './src/styles/global.scss';
import './src/styles/main.scss';
import './src/styles/slider.scss';
import './src/styles/accordion.scss';
import './src/styles/mobile.scss';
import 'react-toastify/dist/ReactToastify.css';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export const wrapRootElement = ({ element }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MinterProvider>
        {element}
      </MinterProvider>
    </Web3ReactProvider>
  )
}

export const wrapPageElement = ({ element, props: {path} }) => {
  return (
    <>
      <div className={path.startsWith("/story") ? "bg-playful visible" : "bg-playful"} />
      <div className={path.startsWith("/mint") ? "bg-dark visible" : "bg-dark"} />
      <TransitionGroup>
        <CSSTransition key={path} timeout={300} classNames="navigate">
          {element}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
