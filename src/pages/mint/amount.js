import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo-small.svg";
import Layout from "../../components/Layout/Layout";
import Step1Amount from "../../components/Step1Amount/Step1Amount";
import useMinter from "../../hooks/useMinter";
import {ethers} from "ethers";
import styled from 'styled-components';

const ProceedButton = styled.button`
  padding-left: 6rem !important;
  padding-right: 6rem !important;
`;

const MintAmountPage = ({ data: { site } }) => {
  const { amount } = useMinter();

  let canParseAmount = false;
  try {
    if(amount) {
      ethers.utils.parseEther(amount.toString());
      canParseAmount = true;
    }
  } catch (err) {
    //pass
  }

  return (
    <Layout title="Support" siteMetadata={site.siteMetadata}>
      <main className="content-free">
        <div className="logo">
          <Link to="/story">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <div className="p2">
          <Step1Amount />
        </div>
        <div className="content-free-buttons">
          <Link to="/">
            <button className="btn">
              Go back
            </button>
          </Link>
          <Link to="/mint/design">
            <ProceedButton className="btn primary" disabled={!canParseAmount}>
              Proceed
            </ProceedButton>
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
        instagram
        twitter
        email
        opensea_collection
      }
    }
  }
`;
