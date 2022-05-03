import React from "react";
import { graphql, Link, navigate } from "gatsby";
import logo from "../../images/logo.svg";
import { ethers } from 'ethers';
import Layout from "../../components/Layout/Layout";
import Step2Design from "../../components/Step2Design/Step2Design";
import useMinter from "../../hooks/useMinter";
import styled from 'styled-components';

const ActionPrompt = styled.p`
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 3rem;
  margin-bottom: 5rem;
  @media(max-width: 700px) {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

const MintDesignPage = ({ data: { site }, pageContext }) => {
  const { rewardDeserved, missingToReward, tokenPrice, setAmount } = useMinter();

  const matchReward = () => {
    setAmount(ethers.utils.formatEther(tokenPrice));
  }

  return (
    <Layout siteMetadata={site.siteMetadata}>
      <main className="content-free">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        {rewardDeserved ? (
          <ActionPrompt>Choose your reward.</ActionPrompt>
        ) : (
          <ActionPrompt>You need to increase the amount by {ethers.utils.formatEther(missingToReward)} to get a pin.</ActionPrompt>
        )}
        <Step2Design />
        {!rewardDeserved && (
          <div className="content-free-buttons">
            <button className="btn" onClick={matchReward}>
              Add {ethers.utils.formatEther(missingToReward)}
            </button>
            <Link to="/mint/confirm">
              <button className="btn">
                Continue with no reward
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
