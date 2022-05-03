import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';

import SEO from "../SEO/SEO";
// TODO import Header from "../Header/Header";
// import Footer from "../Footer/Footer";


const Layout = ({ title, siteMetadata, children }) => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    const a = () => {
      setInProp(true);
    }
    setInterval(a);
  }, []);

  return (
    <div id="root">
      <SEO
        title={title}
        siteMetadata={siteMetadata}
      />
      {/* <Header siteMetadata={siteMetadata} /> */}
      <div className="root-container">
        { children }
      </div>
      {/* <Footer siteMetadata={siteMetadata} /> */}
      <ToastContainer />
    </div>
  );
}

export default Layout;
