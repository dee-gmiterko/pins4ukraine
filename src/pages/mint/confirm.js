import React from "react";
import { graphql, Link } from "gatsby";
import confirmConnectImg from "../../images/confirm-connect.svg";
import confirmGreatPickImg from "../../images/confirm-great-pick.svg";
import Layout from "../../components/Layout/Layout";
import Step3Confirm from "../../components/Step3Confirm/Step3Confirm";
import useMinter from "../../hooks/useMinter";
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import designNames from "../../designNames.json";

const HorizontalSpacing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  .design-pick-box {
    width: 30%;
    margin-right: 2rem;
  }
  .content-box {
    width: 70%;
  }
  @media(max-width: 900px) {
    flex-direction: column-reverse;
    main {
      width: 100%;
    }
  }
`;

const LogoConnect = styled.div`
  position: relative;
  padding-left: 50%;
  img {
    position: absolute;
    top: -6rem;
    width: 100%;
    max-width: 600px;
    margin-left: max(-50%, -300px);
  }
`;

const LogoGreatPick = styled.div`
  position: relative;
  padding-left: 50%;
  img {
    position: absolute;
    top: -1.5rem;
    width: 100%;
    margin-left: -50%;
  }
`;

const MintConfirmPage = ({ data: { site } }) => {
  const { mint, design, rewardDeserved } = useMinter();
  const { active } = useWeb3React();

  return (
    <Layout title="Confirmation" siteMetadata={site.siteMetadata}>
      <HorizontalSpacing>
        {rewardDeserved && (
          <div className="design-pick-box">
            <div className="design-pick-container">
              <img src={`/assets/${design}.png`} alt={designNames[design]} />
            </div>
            <LogoGreatPick>
              <img src={confirmGreatPickImg} alt="Great pick!" />
            </LogoGreatPick>
          </div>
        )}

        <main className="content-box mint mint-confirm">
          <LogoConnect>
            <img src={confirmConnectImg} alt="Connect your wallet" />
          </LogoConnect>
          <Step3Confirm />
          <div className="content-box-buttons">
            <Link to="/mint/amount" className="no-flex-grow">
              <button className="btn">
                Go Back
              </button>
            </Link>
            <button className="btn primary mint-btn" onClick={mint} disabled={!active}>
              Mint
            </button>
          </div>
        </main>
      </HorizontalSpacing>
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
        instagram
        twitter
        email
        opensea_collection
      }
    }
  }
`;
