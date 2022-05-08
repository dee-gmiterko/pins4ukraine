import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import tapItPrompt from "../images/tap-it-prompt.svg";
import Layout from "../components/Layout/Layout";
import AllDesignSlider from "../components/AllDesignSlider/AllDesignSlider";
import styled from "styled-components";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const HorizontalSpacing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .tap-it-container {
    width: 70%;
  }
  .slider-box {
    width: 30%;
    max-width: 350px;
    margin-left: 3rem;
    margin-top: 5rem;
  }
  @media(max-width: 900px) {
    flex-wrap: wrap;
    main {
      width: 100%;
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
`;

const IndexPage = ({ data: { site }, pageContext }) => {
  const [tapIt, setTapIt] = useState(false);

  return (
    <Layout siteMetadata={site.siteMetadata}>
      <HorizontalSpacing>
        <main className="tap-it-container">
          <LargeLogo>
            <Link to="/">
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
                100% of your support goes to ukraine! <AnchorLink to="/story#100-percent">See how</AnchorLink>
              </p>
            </div>
          </div>

          <div className="content-box-buttons">
            <Link to="/mint/amount">
              <button className="btn primary">
                Support & Mint
              </button>
            </Link>
            <Link to="/story">
              <button className="btn">
                The Story
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
      }
    }
  }
`;
