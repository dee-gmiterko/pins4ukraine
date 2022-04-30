const dotenv = require("dotenv");
const path = require("path");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

module.exports = {
  siteMetadata: {
    title: `Pins for Ukraine`,
    description: `Use your spare ETH to support a meaningful cause and get an NFT in return`,
    author: `Timeless`,
    siteUrl: `https://pins4ukraine.com`,
    keywords: ['Pins', 'Pin', 'Ukraine', 'Support', 'Donate', 'NFT'],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pins for Ukraine`,
        short_name: `pins4ukraine`,
        start_url: `/`,
        background_color: `#003039`,
        theme_color: `#fbb03b`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // {
    //   resolve: `gatsby-plugin-facebook-multi-pixels`,
    //   options: [
    //     {
    //       dev: false,
    //       alias: 'main-pixel',
    //       pixelId: '928689911405331',
    //       viewContent: true,
    //       pageView: true,
    //     },
    //   ],
    // },
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     trackingIds: [
    //       "G-M9GYEZ2DVM",
    //     ],
    //   },
    // },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-anchor-links`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
        `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }) => {
          return allPages
        },
        resolveSiteUrl: ({site}) => site.siteMetadata.siteUrl,
        serialize: ({ path }) => {
          return {
            url: path,
          }
        },
      }
    }
  ],
}
