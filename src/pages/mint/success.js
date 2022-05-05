import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout/Layout";
import styled from 'styled-components';
import useMinter from "../../hooks/useMinter";
import { TwitterShareButton, FacebookShareButton } from "react-share";

const SuccessHeading = styled.h2`
  text-align: center;
  font-size: 3.2rem;
`;

const RelevantInfo = styled.strong`
  color: #fff;
`;

const MintSuccessPage = ({ data: { site }, pageContext }) => {
  const {contract, design} = useMinter();

  return (
    <Layout title="Mint success" siteMetadata={site.siteMetadata}>
      <main className="content-box mint">
        <SuccessHeading>You. Are. Just. Incredible!</SuccessHeading>
        <p>I mean, we can't be sure but you might just have saved someone's life! You badass motherf...</p>
        <p>Be sure to <RelevantInfo>share your reward</RelevantInfo> among your friends so we can get even more help to where it's needed.</p>
        <div className="content-free-buttons">
          <TwitterShareButton
            url={`pins4ukraine.com/assets/${design}.png`}
            title={"I supported Ukraine and got this NFT pin"}
            related={[site.siteMetadata.twitter]}
          >
            <p className="btn primary">
              Twitter
            </p>
          </TwitterShareButton>
          <FacebookShareButton
            url={`pins4ukraine.com/assets/${design}.png`}
            quote={"I supported Ukraine and got this NFT pin"}
          >
            <p className="btn primary">
              Facebook
            </p>
          </FacebookShareButton>
          <Link to={`https://opensea.io/assets/${contract.address}/${design}`}>
            <p className="btn primary">
              View on OpenSea
            </p>
          </Link>
        </div>
        <p />
        <p>And don't forget to bring your pin to the virtual worlds further down the line ;)</p>
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
        twitter
      }
    }
  }
`;
