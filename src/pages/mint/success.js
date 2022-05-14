import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../../images/logo-small.svg";
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

const SuccessParagraph = styled.p`
  color: #fff !important;
`;

const SuccessHeading = styled.h2`
  text-align: center;
  font-size: 3.2rem;
  text-transform: none !important;
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

const Spinner = styled.div`
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  &, &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const MintSuccessPage = ({ data: { site } }) => {
  const { contract, design, rewardDeserved, transaction, transactionReceipt } = useMinter();

  return (
    <Layout title="Mint success" siteMetadata={site.siteMetadata}>
      <HorizontalSpacing>
        <main className="content-free success">
          <SuccessHeading>WHOA! You've just proven yourself a bona fide hero!</SuccessHeading>

          <SuccessParagraph>I mean, we can't be sure but you might just have saved someone's life! You badass motherf...</SuccessParagraph>
          <SuccessParagraph>Be sure to share your reward among your friends so we can get even more help to where it's needed.</SuccessParagraph>

          <div className="icon-btn-list simple">
            <TwitterShareButton
              url={`https://pins4ukraine.com/assets/${design}.gif`}
              title={"I supported Ukraine and got this NFT pin"}
              related={[site.siteMetadata.twitter]}
            >
              <div className="icon-btn">
                <i className="twitter">Twitter</i>
              </div>
            </TwitterShareButton>

            <FacebookShareButton
              url={`https://pins4ukraine.com/assets/${design}.gif`}
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

          <SuccessParagraph>And don't forget to bring your pin to the virtual worlds further down the line ;)</SuccessParagraph>

          <div className="logo">
            <Link to="/">
              <img src={logo} alt={ site.siteMetadata.title } />
            </Link>
          </div>
        </main>

        {transaction && (
          <div className="receipt-container">
            <main className="receipt-box">

              <MintedHeading>you just minted:</MintedHeading>

              <Receipt />

              {transactionReceipt ? (
                <>
                  {rewardDeserved && (
                    <a href={`https://opensea.io/assets/${contract.address}/${design}`} className="reward">
                      <div className="design-pick-container">
                        <video autoPlay muted loop>
                          <source src={`/assets/${design}.mp4`} type="video/mp4" />
                          <img src={`/assets/${design}.png`} alt={designNames[design]} />
                        </video>
                      </div>
                    </a>
                  )}

                  <ThanksHeading>Thanks for your support!</ThanksHeading>
                </>
              ) : (
                <>
                  <Spinner />
                  <p className="confirmation">
                    Waiting for transaction<br/>
                    <a href={`https://etherscan.io/tx/${transaction.hash}`} className="reward">
                      {transaction.hash.substring(0, 10)}...{transaction.hash.substring(transaction.hash.length-10  , transaction.hash.length)}
                    </a><br/>
                    confirmation...
                  </p>
                </>
              )}
            </main>
          </div>
        )}

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
