import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import Layout from "../components/Layout/Layout";

const IndexPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>
      <main className="content-box">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <p>Pins for Ukraine is an NFT project designed to help Ukraine in the war against Russia. As effectively as possible.</p>
        <div className="content-box-buttons">
          <Link to="/mint/amount">
            <button className="btn primary">
              Support & Mint
            </button>
          </Link>
          <Link to="/about">
            <button className="btn">
              About us
            </button>
          </Link>
        </div>
      </main>
    </Layout>
  )
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        author
        description
        siteUrl
        title
        keywords
      }
    }
  }
`;
