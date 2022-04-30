import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo.svg";
import Layout from "../../components/Layout/Layout";

const MintDesignPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>
      <>
        <div className="content-box-logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <h2>About</h2>
        <div className="content-box-buttons">
          <Link to="/mint/confirm">
            <button className="btn primary">
              Proceed
            </button>
          </Link>
        </div>
      </>
    </Layout>
  )
};

export default MintDesignPage;

export const pageQuery = graphql`
  query MintDesignQuery {
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
