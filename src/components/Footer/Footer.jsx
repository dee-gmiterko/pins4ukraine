import React from "react";

const Footer = ({ siteMetadata }) => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {siteMetadata.author}
    </footer>
  );
}

export default Footer;
