import React from "react";
import Discover from "../../components/discover/Discover";
import background_image from "../../assets/hero-bg.svg";
// import africa_image from '../../assets/africa-icon.svg';
import underline from "../../assets/underline.svg";
// import cchub_logo from "../../assets/cchub_logo.svg";
import cchub_logo_white from "../../assets/cchub_logo_white.png";

import "./Hero.scss";

const backgroundStyle = {
  backgroundImage: `url(${background_image})`,
};

const Hero = ({ openCommodities, setToFalse }) => {
  return (
    <section className="hero" style={backgroundStyle}>
      <div className="hero-content">
        <div className="text-content">
          <h3 className="title">
            Discover new trade opportunities and networks{" "}
            <span className="underline">
              within Africa
              <img src={underline} alt="" />
            </span>
            <span className="yellow">.</span>
          </h3>
          <p className="sub-title">
            The SCI-Trade Opportunity Index presents an immediate opportunity
            for trade flows under AfCFTA across Africa.
          </p>
        </div>
        <div className="image-container">
          <Discover
            position="top"
            openCommodities={openCommodities}
            setToFalse={setToFalse}
          />
        </div>
      </div>
      <div className="max-container powered-container">
        <div className="powered-by">
          <p>Powered by</p>
          <img src={cchub_logo_white} alt="Co-creation Hub logo" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
