import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo.svg";
import Layout from "../../components/Layout/Layout";
import Step1Amount from "../../components/Step1Amount/Step1Amount";
import useMinter from "../../hooks/useMinter";

const MintAmountPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>
      <main className="content-box mint">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <div className="p2">
          <Step1Amount />
        </div>
        <div className="content-box-buttons">
          <Link to="/mint/design">
            <button className="btn primary">
              Proceed
            </button>
          </Link>
        </div>
      </main>
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
