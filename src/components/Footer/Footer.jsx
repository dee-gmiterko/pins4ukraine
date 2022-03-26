import React from "react";

const Footer = ({ siteMetadata }) => {
  return (
    <footer className="container mx-auto p-3">
      © {new Date().getFullYear()} {siteMetadata.author}
    </footer>
  );
}

export default Footer;
