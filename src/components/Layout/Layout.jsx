import React from "react";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";

import SEO from "../SEO/SEO";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const Layout = ({ title, siteMetadata, connectWallet, children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <main>
        <SEO
          title={title}
          siteMetadata={siteMetadata}
        />
        <Header siteMetadata={siteMetadata} />
        { children }
        <Footer siteMetadata={siteMetadata} />
      </main>
    </Web3ReactProvider>
  );
}

export default Layout;
