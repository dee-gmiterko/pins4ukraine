import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Mint from "../components/Mint/Mint";
import Information from "../components/Information/Information";

const IndexPage = ({ data: { site }, pageContext }) => {
  return (
    <Layout siteMetadata={site.siteMetadata}>

      <Mint />

      <Information />

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
