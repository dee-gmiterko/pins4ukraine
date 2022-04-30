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
    <Layout siteMetadata={site.siteMetadata}>
      <>
        <div className="content-box-logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <Step3Confirm />
        <div className="content-box-buttons">
          <Link to="/mint/design">
            <button className="btn">
              Back
            </button>
          </Link>
          <button className="btn primary" onClick={mint} disabled={!active}>
            Support
          </button>
        </div>
      </>
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
