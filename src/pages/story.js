import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import bunchImg from "../images/bunch.jpg";
import Layout from "../components/Layout/Layout";
import styled from 'styled-components';
import { AnchorLink } from "gatsby-plugin-anchor-links";

const ParagraphStory = styled.p`
  text-align: left;
  color: #fff;
`;

const ImageBunch = styled.img`
  max-width: 80%;
  margin: 6rem auto 0 auto;
`;

const StoryPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout title="Story" siteMetadata={site.siteMetadata}>
      <>
        <main className="content-box mint story">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt={ site.siteMetadata.title } />
            </Link>
          </div>

          <div className="p3">
            <h2>Beyond little pieces of 3D metal</h2>
            <ParagraphStory>
              Badges on backpacks, patches on hoodies or in this case — enamel pins.
              They all share one thing. We wear them to express our opinions and show
              our support of things we hold dear. And that is no different with these
              tiny non-fungible wearables. Slava Ukraini! We will not forget!
            </ParagraphStory>
          </div>

          <div className="content-box-buttons">
            <AnchorLink to="/story#who-are-we">
              <button className="btn secondary">
                Who are we?
              </button>
            </AnchorLink>
            <AnchorLink to="/story#faq">
              <button className="btn secondary">
                FAQ
              </button>
            </AnchorLink>
            <AnchorLink to="/story#contact">
              <button className="btn secondary">
                Write us!
              </button>
            </AnchorLink>
          </div>

          <ImageBunch src={bunchImg} />
        </main>

        <main className="content-box mint">
          <div className="p2">
            <h2 id="who-are-we">Who are we?</h2>
            <ParagraphStory>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </ParagraphStory>
          </div>
        </main>

        <main className="content-box mint faq">
          <div className="p2">
            <h2 id="faq">FAQ</h2>
            <dl>
              <dt>Lorem ipsum dolor sit amet</dt>
              <dd>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
              <dt>Lorem ipsum dolor sit amet</dt>
              <dd>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
              <dt>Lorem ipsum dolor sit amet</dt>
              <dd>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
              <dt>Lorem ipsum dolor sit amet</dt>
              <dd>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
              <dt>Lorem ipsum dolor sit amet</dt>
              <dd>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
            </dl>
          </div>
        </main>

        <main className="content-box mint">
          <div className="p2">
            <h2 id="contact">Contact</h2>
            <p>
              Twitter
            </p>
            <p>
              Instagram
            </p>
            <p>
              Email: <a href="mailto:info@pins4ukraine.com">info@pins4ukraine.com</a>
            </p>
            <p>
              Twitter
            </p>
          </div>
        </main>

        <div className="content-free-buttons p2">
          <Link to="/mint/amount">
            <button className="btn primary">
              Support & Mint
            </button>
          </Link>
        </div>
      </>
    </Layout>
  )
};

export default StoryPage;

export const pageQuery = graphql`
  query StoryQuery {
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
