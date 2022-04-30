import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo.svg";
import Layout from "../../components/Layout/Layout";
import Step1Amount from "../../components/Step1Amount/Step1Amount";

const MintAmountPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>
      <>
        <div className="content-box-logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <Step1Amount />
        <div className="content-box-buttons">
          <Link to="/mint/design">
            <button className="btn primary">
              Proceed
            </button>
          </Link>
        </div>
      </>
    </Layout>
  )
};

export default MintAmountPage;

export const pageQuery = graphql`
  query MintAmountQuery {
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
