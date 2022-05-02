import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo.svg";
import Layout from "../../components/Layout/Layout";
import Step2Design from "../../components/Step2Design/Step2Design";
import useMinter from "../../hooks/useMinter";

const MintSuccessPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>
      <main className="content-box mint">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <h2>Supported</h2>
      </main>
    </Layout>
  )
};

export default MintSuccessPage;

export const pageQuery = graphql`
  query MintSuccessQuery {
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
