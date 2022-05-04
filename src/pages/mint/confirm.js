import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo.svg";
import Layout from "../../components/Layout/Layout";
import Step3Confirm from "../../components/Step3Confirm/Step3Confirm";
import useMinter from "../../hooks/useMinter";
import { useWeb3React } from '@web3-react/core';

const MintConfirmPage = ({ data: { site }, pageContext }) => {
  const { mint } = useMinter();
  const { active } = useWeb3React();

  return (
    <Layout title="Confirmation" siteMetadata={site.siteMetadata}>
      <main className="content-box mint">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <Step3Confirm />
        <div className="content-box-buttons">
          <Link to="/mint/amount">
            <button className="btn">
              Back
            </button>
          </Link>
          <button className="btn primary flex-grow" onClick={mint} disabled={!active}>
            Support
          </button>
        </div>
      </main>
    </Layout>
  )
};

export default MintConfirmPage;

export const pageQuery = graphql`
  query MintConfirmQuery {
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
