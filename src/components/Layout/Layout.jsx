import React from "react";
import { ToastContainer } from 'react-toastify';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import SEO from "../SEO/SEO";
// TODO import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

// <TransitionGroup>
//   <CSSTransition key={title || "index"} timeout={500} classNames="navigate">

const Layout = ({ title, siteMetadata, children }) => {
  return (
    <div id="root">
      <SEO
        title={title}
        siteMetadata={siteMetadata}
      />
      {/* <Header siteMetadata={siteMetadata} /> */}
      { children }
      {/* <Footer siteMetadata={siteMetadata} /> */}
      <ToastContainer />
    </div>
  );
}

export default Layout;
