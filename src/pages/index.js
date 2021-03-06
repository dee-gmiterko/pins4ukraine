import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import tapItPrompt from "../images/tap-it-prompt.svg";
import Layout from "../components/Layout/Layout";
import AllDesignSlider from "../components/AllDesignSlider/AllDesignSlider";
import styled from "styled-components";

const HorizontalSpacing = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 150px;
  padding-bottom: 6rem;
  .tap-it-container {
    width: 70%;
  }
  .slider-box {
    width: 30%;
    max-width: 350px;
    margin-left: 3rem;
  }
  @media(max-width: 900px) {
    padding: 1rem;
    padding-top: 150px;
    flex-direction: column;
    .tap-it-container {
      width: 100%;
      margin-bottom: 1rem;
    }
    .slider-box {
      width: 100%;
      margin-left: 0;
      max-width: none;
      box-sizing: border-box;
    }
  }
`;

const LargeLogo = styled.div`
  position: relative;
  padding-left: 50%;
  z-index: 2;
  img {
    position: absolute;
    top: -100px;
    width: 100%;
    max-width: 300px;
    margin-left: -150px;
  }
  @media(max-width: 900px) {
    img {
      top: -60px;
      max-width: 200px;
      margin-left: -100px;
    }
  }
`;

const IndexPage = ({ data: { site } }) => {
  const [tapIt, setTapIt] = useState(false);

  return (
    <Layout siteMetadata={site.siteMetadata}>
      <HorizontalSpacing>
        <main className="tap-it-container">
          <LargeLogo>
            <Link to="/story">
              <img src={logo} alt={ site.siteMetadata.title } />
            </Link>
          </LargeLogo>
          <div className={tapIt ? "tap-it-box tapped" : "tap-it-box"} onClick={() => setTapIt(!tapIt)}>
            <div className="tap-it-prompt">
              <img src={tapItPrompt} alt="Tap it" />
            </div>

            <div className="tap-it-front">
              <p>Pins for Ukraine is an NFT project designed to help Ukraine in the war against Russia. As effectively as possible.</p>
            </div>

            <div className="tap-it-back">
              <p className="text-uppercase text-italic">
                100% of your support goes to ukraine! <Link to="/story" state={{ expandFaq: 'where-does-my-eth-go' }}>See how</Link>
              </p>
            </div>
          </div>

          <div className="content-box-buttons">
            <Link to="/story">
              <button className="btn">
                Read More
              </button>
            </Link>
            <Link to="/mint/amount">
              <button className="btn primary">
                Support & Mint
              </button>
            </Link>
          </div>
        </main>

        <main className="slider-box">
          <div className="slider-container">
            <AllDesignSlider />
          </div>
        </main>
      </HorizontalSpacing>
    </Layout>
  )
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
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
