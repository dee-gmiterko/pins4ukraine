const dotenv = require("dotenv");
const path = require("path");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

module.exports = {
  siteMetadata: {
    title: `Timeless NFT`,
    description: `Own a piece of time.`,
    author: `Timeless`,
    siteUrl: `https://timeless.com/`,
    keywords: ['Timeless', 'NFT'],
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
        name: `Dee Gmiterko`,
        short_name: `Dee Gmiterko`,
        start_url: `/`,
        background_color: `#38174A`,
        theme_color: `#E0C65D`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-facebook-multi-pixels`,
      options: [
        {
          dev: false,
          alias: 'main-pixel',
          pixelId: '928689911405331',
          viewContent: true,
          pageView: true,
        },
      ],
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-M9GYEZ2DVM",
        ],
      },
    },
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
