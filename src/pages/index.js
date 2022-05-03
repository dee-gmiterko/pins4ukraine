import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import Layout from "../components/Layout/Layout";
import AllDesignSlider from "../components/AllDesignSlider/AllDesignSlider";

const IndexPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>
      <>
        <main className="content-box">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt={ site.siteMetadata.title } />
            </Link>
          </div>

          <div className="p2">
            <p>Pins for Ukraine is an NFT project designed to help Ukraine in the war against Russia. As effectively as possible.</p>
          </div>

          <div className="content-box-buttons">
            <Link to="/mint/amount">
              <button className="btn primary">
                Support & Mint
              </button>
            </Link>
            <Link to="/story">
              <button className="btn">
                Story
              </button>
            </Link>
          </div>
        </main>

        <AllDesignSlider />
      </>
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
