import React, { useState, useRef } from "react";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import styled from 'styled-components';
import Slider from "react-slick";
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DesignName = styled.div`
  color: #fff;
  padding: 1rem;
  font-family: "Trueno", sans-serif;
  font-style: italic;
  font-weight: normal;
  font-size: 1.2rem;
`;

const AllDesignSlider = () => {
  const { design, setDesign, totalDesigns, rewardDeserved } = useMinter();

  const designIds = Array.from({ length: totalDesigns }, (_, i) => i+1) || [];

  const sliderRef = useRef();
  const playActiveSlide = () => {
    const activeSlideVideo = sliderRef.current.querySelector(".slick-slide.slick-current video");
    if(activeSlideVideo) {
      activeSlideVideo.play();
    }
  }

  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3333,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    afterChange: playActiveSlide,
    onInit: () => {
      setTimeout(playActiveSlide)
    },
  };

  return (
    <div className="all-design-slider" ref={(element) => sliderRef.current = element}>
      <Slider {...settings}>
        {designIds.map((designId, index) => (
          <div key={index}>
            <Slide>
              <div className="product-background">
                <video muted="muted">
                  <source src={`/assets/${designId}.mp4`} type="video/mp4" />
                  <img src={`/assets/${designId}.png`} alt={designNames[designId]} />
                </video>
              </div>
              <DesignName>
                {designNames[designId.toString()]}
              </DesignName>
            </Slide>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AllDesignSlider;
