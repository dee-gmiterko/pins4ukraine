import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import siteImage from '../../images/og-banner.jpg';

const SEO = ({ title, siteMetadata }) => {

  const siteName = siteMetadata.title;
  const siteDescription = siteMetadata.description;
  const keywords = siteMetadata.keywords;

  return (
    <Helmet
      title={title ? `${title} | ${siteName}` : siteName}
      meta={[
        {
          name: `description`,
          content: siteDescription
        },
        {
          property: `og:title`,
          content: siteName
        },
        {
          property: `og:description`,
          content: siteDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `og:image`,
          content: siteImage
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:title`,
          content: (title ? `${title} | ${siteName}` : siteName)
        },
        {
          name: `twitter:description`,
          content: siteDescription
        },
        {
          property: `twitter:image`,
          content: siteImage
        },
        {
          name: `keywords`,
          content: keywords.join(`, `)
        }
      ]}
    >
      <body lang="en" />
    </Helmet>
  );
}

SEO.defaultProps = {
  title: null,
};

SEO.propTypes = {
  title: PropTypes.string,
  siteMetadata: PropTypes.object,
};

export default SEO;
