import React from "react";
import { graphql, Link } from "gatsby";
import logo from "../images/logo.svg";
import bunchImg from "../images/bunch.jpg";
import teamImg from "../images/team.jpg";
import Layout from "../components/Layout/Layout";
import styled from 'styled-components';
import useMinter from "../hooks/useMinter";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import NameMatchingMinigame from "../components/NameMatchingMinigame/NameMatchingMinigame";

const ParagraphStory = styled.p`
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  text-align: justify;
`;

const ParagraphWallet = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 2rem;

`;

const ImageBunch = styled.img`
  display: block;
  max-width: 100%;
  margin: 6rem auto 0 auto;
`;

const ImageTeam = styled.img`
  display: block;
  width: 100%;
  max-width: 800px;
  margin: 3rem auto 0 auto;
  border-radius: 2rem;
`;

const Insignificant = styled.span`
  color: #527B87;
`;

const Fuck = styled.span`
  letter-spacing: 4px;
`;

const StoryPage = ({ data: { site }, pageContext }) => {
  const { contract } = useMinter();

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
              Badges on backpacks, patches on hoodies, or in our case — enamel pins. They all
              share one thing. We wear them to express our attitude and show our support for
              anything we hold dear. And that is no different with these tiny non-fungible
              wearables. Putin, go <Fuck>f**k</Fuck> yourself! Glory to Ukraine!
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
              We're a group of three friends, ordinary guys from Czechia who study or work
              regular jobs and like to go out on Friday nights. We also consider democracy the
              uttermost pillar of modern society and feel the need to protect it at any cost.
              So when there's a psychic lunatic raging just by our doorstep, we naturally
              strive to do anything in our strength to stop him and help our fellow neighbors.
            </ParagraphStory>
            <ParagraphStory>
              Since none of us knows how to hold a firearm, we decided to find another way to
              help the bold Ukrainian nation and fight against Putin's regime. Luckily, we
              share the passion for 3D art, programming, and — of course — NFTs!
            </ParagraphStory>

            <ImageTeam src={teamImg} />
          </div>
        </main>

        <main className="content-box mint faq">
          <div className="p2">
            <h2 id="faq">FAQ</h2>
            <Accordion>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>HOW DOES IT WORK?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    That's easy! First, you need to choose the amount of your donation. If you'd
                    like our NFT pin, we will tell you just how much ETH you need. Then we'll ask
                    you to connect your ETH wallet and finish the transaction.
                  </ParagraphStory>
                  <ParagraphStory>
                    And that's it! To put it simply, you're just a few clicks away from potentially
                    saving someone's life!
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>WHERE DOES MY ETH GO?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    100% of your funds go directly to the ETH address
                    published by the <a href="https://donate.thedigital.gov.ua/"
                    target="_blank">Ministry of Digital Transformation of Ukraine</a>, but you also
                    get an NFT as a reward.
                  </ParagraphStory>
                  <ParagraphWallet>
                    <Insignificant>
                      Public support wallet: <br/>
                      <a href={`https://etherscan.io/address/0x165CD37b4C644C2921454429E7F9358d18A45e14`} target="_blank">0x165CD37b4C644C2921454429E7F9358d18A45e14</a>
                    </Insignificant>
                  </ParagraphWallet>
                  <ParagraphStory>
                    The UA government will then decide what the
                    best use for your support is so you can be sure it is spent as effectively as
                    possible.
                  </ParagraphStory>
                  <ParagraphStory>
                    Our honest-to-God intention is to help the Ukrainian nation, and since yours is
                    the same, there's no way we would ever take any percentage of your support.
                  </ParagraphStory>
                  <ParagraphStory>
                    And if by any chance you still have a hard time believing us, that's why NFTs
                    are perfect — you can always take a peek at our smart contract.
                  </ParagraphStory>
                  <ParagraphWallet>
                    Smart contract: <br/>
                    <a href={`https://etherscan.io/address/${contract.address}`} target="_blank">{contract.address}</a>
                  </ParagraphWallet>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>WHY DOES THE PRICE OF THE PINS KEEP RISING?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    Since this project is built strictly to support a fellow country in need, it
                    didn't feel fair to limit the supply of the pins and steal you a chance to mint
                    whenever you feel like it.
                  </ParagraphStory>
                  <ParagraphStory>
                    But we also want to reward our holders for donating as soon as possible. And
                    thanks to this format, you can get pins that will be eventually worth, e.g., 2
                    ETH, yet you got them for just a fraction of that. Even better, Ukraine will be
                    able to sooner utilize your support. That's what we call killing two birds with
                    one stone!
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>WHAT DO THE PINS MEAN?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    Every pin symbolizes a piece of a narrative that gets quickly revealed by
                    Putin's desperate, stonyhearted, spineless actions.
                  </ParagraphStory>
                  <ParagraphStory>
                    Each of the 6 motives is open to your interpretation and imagination. Although
                    we named all of the pieces to hint at our initial thoughts. You can try to
                    assign the names to the jewels yourself:
                  </ParagraphStory>
                  <NameMatchingMinigame />
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>CAN I GET MULTIPLE PINS?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    You sure can! There's no pins-per-wallet limit. You'll just need to conduct the
                    transactions one by one as some supporters with more ETH do not wish to get
                    flooded with pins and prefer just 1 pin per transaction.
                  </ParagraphStory>
                  <ParagraphStory>
                    By the way, we can tell from experience that our pin makes for a really nice gift, too!
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>WHAT IF I DONATE LESS THAN THE PRICE OF A PIN?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    Don't worry. If you input less ETH than the amount needed to get a pin, 100% of
                    your funds will still get to the ETH address of the Ministry of Digital
                    Transformation of Ukraine (see above). You will just not get rewarded an NFT
                    pin.
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>CAN I SELL MY PINS?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    Of course! They are just like any other NFTs. You can very well make a good
                    profit from these, too. Yet, in the first place, we would like to encourage you
                    to have the nation of Ukraine in your heart when considering a donation.
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>WILL I BE ABLE TO WEAR MY PIN IN A VIRTUAL WORLD?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    You bet! That's what we are excited the most about! Just imagine not having to
                    choose between a virtual GUCCI jumper and a robot suit to wear on your late
                    Friday meta ventures, and being able to pin your favorite piece of jewelry to
                    whatever you please instead. I mean, Terminator going to a Justin Bieber concert
                    showing support to Glorious Ukraine by wearing one of our pins sounds like a
                    dream come true, not going to lie. Anyway, see you there! ;)
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>DO YOU HAVE A ROADMAP?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    NO! We hate that word! No roadmaps here. If you're searching for the next 100x
                    project with shiny roadmaps and whitelists and DAOs, you should probably keep
                    looking. There's nothing but thoughts of sympathy here.
                  </ParagraphStory>
                  <ParagraphStory>
                    Although we don't deny there could be physical pins mailed to our holders in the
                    future and other perks linked to our upcoming collections. Shh! We didn't say
                    that!
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>WHY DO YOU DO THIS?</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ParagraphStory>
                    That is a fair question. It might look odd from the surface to see an NFT
                    project that doesn't raise a single dime for its authors. But if you take it
                    from a different perspective, there are countless projects like that around us —
                    just not yet in the NFT space.
                  </ParagraphStory>
                  <ParagraphStory>
                    We look up to people who are comfortable putting aside their needs to fight for
                    the greater good, even if that doesn't necessarily bring anything material to
                    them. It must be the best feeling in the world, and we wanted to feel it too.
                  </ParagraphStory>
                  <ParagraphStory>
                    And finally —<br/>
                    The world would never be the same if Mr. Zelenskyy and the people of Ukraine
                    hadn't shown such an enormous degree of bravery that ultimately stunned the
                    Russian forces and potentially spared us the horrible fate the nation of Ukraine
                    is going through right now. Our hearts go out to the soldiers, mothers,
                    children, and all people of Ukraine. SLAVA UKRAINI!
                  </ParagraphStory>
                </AccordionItemPanel>
              </AccordionItem>

            </Accordion>
          </div>
        </main>

        <main className="content-box mint">
          <div className="p2">
            <h2 id="contact">Get in touch with US!</h2>
            <ParagraphStory>
              Because we'd be honored to get to know you better and answer any burning questions!
            </ParagraphStory>
            <div className="icon-btn-list">
              <a href={`https://instagram.com/${site.siteMetadata.instagram}`} target="_blank">
                <button className="icon-btn">
                  <i className="instagram">Instagram</i>
                </button>
              </a>
              <a href={`https://twitter.com/${site.siteMetadata.twitter}`} target="_blank">
                <button className="icon-btn">
                  <i className="twitter">Twitter</i>
                </button>
              </a>
              <a href={`mailto:${site.siteMetadata.email}`} target="_blank">
                <button className="icon-btn">
                  <i className="email">Email</i>
                </button>
              </a>
              <a href={`https://opensea.io/collection/${site.siteMetadata.opensea_collection}`} target="_blank">
                <button className="icon-btn">
                  <i className="opensea">OpenSea</i>
                </button>
              </a>
            </div>
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
        instagram
        twitter
        email
        opensea_collection
      }
    }
  }
`;
