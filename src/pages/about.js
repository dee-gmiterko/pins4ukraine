import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import Layout from "../components/Layout/Layout";

const AboutPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout title="About" siteMetadata={site.siteMetadata}>
      <main className="content-box">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt={ site.siteMetadata.title } />
          </Link>
        </div>
        <h2>About</h2>
        <div className="content-box-buttons">
          <Link to="/mint/amount">
            <button className="btn primary">
              Support & Mint
            </button>
          </Link>
          <Link to="/">
            <button className="btn">
              And back
            </button>
          </Link>
        </div>
      </main>
    </Layout>
  )
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutQuery {
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
