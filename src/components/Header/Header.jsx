import React from "react";

const Header = ({ siteMetadata }) => {
  return (
    <header className="header">
      <div className="icon-btn-list simple">
        <a href={`https://opensea.io/collection/${siteMetadata.opensea_collection}`} target="_blank">
          <button className="icon-btn">
            <i className="opensea">OpenSea</i>
          </button>
        </a>
        <a href={`https://twitter.com/${siteMetadata.twitter}`} target="_blank">
          <button className="icon-btn">
            <i className="twitter">Twitter</i>
          </button>
        </a>
        <a href={`https://instagram.com/${siteMetadata.instagram}`} target="_blank">
          <button className="icon-btn">
            <i className="instagram">Instagram</i>
          </button>
        </a>
        <a href={`mailto:${siteMetadata.email}`} target="_blank">
          <button className="icon-btn">
            <i className="email">Email</i>
          </button>
        </a>
      </div>
    </header>
  );
}

export default Header;
