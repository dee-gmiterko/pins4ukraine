import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo.svg";
import Layout from "../../components/Layout/Layout";
import Step2Design from "../../components/Step2Design/Step2Design";
import useMinter from "../../hooks/useMinter";

const MintDesignPage = ({ data: { site }, pageContext }) => {
  const { rewardDeserved } = useMinter();

  return (
    <Layout siteMetadata={site.siteMetadata}>
      <main className="content-free">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <Step2Design />
        {!rewardDeserved && (
          <div className="content-free-buttons">
            <Link to="/mint/confirm">
              <button className="btn">
                No reward
              </button>
            </Link>
          </div>
        )}
      </main>
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
