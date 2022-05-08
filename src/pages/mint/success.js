import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Receipt from "../../components/Receipt/Receipt";
import styled from 'styled-components';
import useMinter from "../../hooks/useMinter";
import { TwitterShareButton, FacebookShareButton } from "react-share";
import designNames from "../../designNames.json";

const HorizontalSpacing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 100%;
  .content-free {
    width: 60%;
    padding: 6rem 0;
  }
  .receipt-container {
    width: 40%;
    margin-left: 3rem
  }
  @media(max-width: 900px) {
    flex-direction: column-reverse;
    main {
      width: 100%;
    }
  }
`;

const SuccessHeading = styled.h2`
  text-align: center;
  font-size: 3.2rem;
`;

const MintedHeading = styled.h2`
  font-size: 2.3rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ThanksHeading = styled.h2`
  font-size: 2.3rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`;

const MintSuccessPage = ({ data: { site } }) => {
  const {contract, design, rewardDeserved} = useMinter();

  return (
    <Layout title="Mint success" siteMetadata={site.siteMetadata}>
      <HorizontalSpacing>
        <main className="content-free success">
          <SuccessHeading>WHOA! You've just proven yourself a bona fide hero!</SuccessHeading>

          <p>I mean, we can't be sure but you might just have saved someone's life! You badass motherf...</p>
          <p>Be sure to share your reward among your friends so we can get even more help to where it's needed.</p>

          <div className="icon-btn-list simple">
            <TwitterShareButton
              url={`pins4ukraine.com/assets/${design}.png`}
              title={"I supported Ukraine and got this NFT pin"}
              related={[site.siteMetadata.twitter]}
            >
              <div className="icon-btn">
                <i className="twitter">Twitter</i>
              </div>
            </TwitterShareButton>

            <FacebookShareButton
              url={`pins4ukraine.com/assets/${design}.png`}
              quote={"I supported Ukraine and got this NFT pin"}
            >
              <div className="icon-btn">
                <i className="facebook">Facebook</i>
              </div>
            </FacebookShareButton>

            <a href={`https://instagram.com/${site.siteMetadata.instagram}`} target="_blank">
              <button className="icon-btn">
                <i className="instagram">Instagram</i>
              </button>
            </a>
          </div>

          <p>And don't forget to bring your pin to the virtual worlds further down the line ;)</p>
        </main>

        <div className="receipt-container">
          <main className="receipt-box">

            <MintedHeading>you just minted:</MintedHeading>

            <Receipt />

            {rewardDeserved && (
              <Link to={`https://opensea.io/assets/${contract.address}/${design}`} className="reward">
                <img src={`/assets/${design}.png`} alt={designNames[design]} />
              </Link>
            )}

            <ThanksHeading>Thanks for your support!</ThanksHeading>
          </main>
        </div>

      </HorizontalSpacing>
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
        instagram
        twitter
        email
        opensea_collection
      }
    }
  }
`;
