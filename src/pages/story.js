import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import Layout from "../components/Layout/Layout";
import styled from 'styled-components';

const ParagraphStory = styled.p`
  text-align: left;
  color: #fff;
`;

const StoryPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout title="Story" siteMetadata={site.siteMetadata}>
      <main className="content-box mint story">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>

        <div className="p2">
          <h2>Beyond little pieces of 3D metal</h2>
          <ParagraphStory>
            Badges on backpacks, patches on hoodies or in this case — enamel pins.
            They all share one thing. We wear them to express our opinions and show
            our support of things we hold dear. And that is no different with these
            tiny non-fungible wearables. Slava Ukraini! We will not forget!
          </ParagraphStory>
        </div>

        <div className="content-box-buttons">
          <Link to="/">
            <button className="btn secondary">
              Who are we?
            </button>
          </Link>
          <Link to="/">
            <button className="btn secondary">
              F&Q
            </button>
          </Link>
          <Link to="/">
            <button className="btn secondary">
              Write us!
            </button>
          </Link>
        </div>
      </main>
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
