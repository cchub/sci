import React from "react";
import {
  One,
  Two,
  Three,
  SearchIcon,
  DiscoverIcon,
  CompareIcon,
} from "../../components/Icons";
import search_illustration from "../../assets/search-illustration.svg";
import discover_illustration from "../../assets/discover-illustration.svg";
import compare_illustration from "../../assets/compare-illustration.svg";

import "./How.scss";

const How = React.forwardRef((props, ref) => {
  return (
    <section className="how" ref={ref}>
      <div className="max-container">
        <div className="section-top">
          <h5>3 SIMPLE STEPS</h5>
          <h3>How It Works</h3>
        </div>
        <div className="content illustrations">
          <div className="img-container">
            <img src={search_illustration} alt="" />
          </div>
          <div className="img-container">
            <img src={discover_illustration} alt="" />
          </div>
          <div className="img-container">
            <img src={compare_illustration} alt="" />
          </div>
        </div>
        <div className="content">
          <div className="step">
            <div className="img-container">
              <img src={search_illustration} alt="" />
            </div>
            <One />
            <div className="icon-text">
              <SearchIcon />
              <p>Search</p>
            </div>
            <p>
              Simply select the country you wish to export from. You can only
              select African countries.
            </p>
          </div>
          <div className="step">
            <div className="img-container">
              <img src={discover_illustration} alt="" />
            </div>
            <Two />
            <div className="icon-text">
              <DiscoverIcon />
              <p>Discover</p>
            </div>
            <p>
              With a minimal design, you can quickly &amp; easily glance through
              a large network of trade opportunities.
            </p>
          </div>
          <div className="step">
            <div className="img-container">
              <img src={compare_illustration} alt="" />
            </div>
            <Three />
            <div className="icon-text">
              <CompareIcon />
              <p>Compare</p>
            </div>
            <p>
              Dig deeper into trade between two countries and compare data with
              other countries to determine your next trade opportunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default How;
