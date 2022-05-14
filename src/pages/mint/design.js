import React, { useState } from "react";
import { graphql, Link, navigate } from "gatsby";
import logo from "../../images/logo-small.svg";
import { ethers } from 'ethers';
import Layout from "../../components/Layout/Layout";
import Step2Design from "../../components/Step2Design/Step2Design";
import useMinter from "../../hooks/useMinter";
import styled from 'styled-components';

const ActionPrompt = styled.p`
  color: #fff !important;
  font-size: 2.5rem;
  font-weight: 900;
  margin-top: 3rem;
  margin-bottom: 5rem;
  @media(max-width: 700px) {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

const MintDesignPage = ({ data: { site } }) => {
  const { rewardDeserved, missingToReward, tokenPrice, setAmount } = useMinter();

  const matchReward = () => {
    setAmount(ethers.utils.formatEther(tokenPrice));
  }

  return (
    <Layout title="Pick design" siteMetadata={site.siteMetadata}>
      <main className="content-free">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        {rewardDeserved ? (
          <ActionPrompt>You. Are. Just. Incredible! Choose away!</ActionPrompt>
        ) : (
          <ActionPrompt>You need to increase the amount by {ethers.utils.formatEther(missingToReward)} ETH to get a pin.</ActionPrompt>
        )}
        <Step2Design />
        {rewardDeserved ? (
          <div className="content-free-buttons">
            <Link to="/">
              <button className="btn">
                Go back
              </button>
            </Link>
          </div>
        ) : (
          <div className="content-free-buttons">
            <button className="btn primary" onClick={matchReward}>
              Add {ethers.utils.formatEther(missingToReward)} ETH
            </button>
            <Link to="/mint/confirm">
              <button className="btn">
                Proceed with no reward
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
        instagram
        twitter
        email
        opensea_collection
      }
    }
  }
`;
