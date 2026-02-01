import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/header/Header";
import TopSection from "../../components/commodities/TopSection";
import { baseUrl } from "../../utils/url";
import { fetchData } from "../../utils/api";
import { debounce, getFlag } from "../../utils/utils";
import DetectOutsideClick from "../../components/detectOutsideClick/DetectOutsideClick";
import { ArrowDown } from "../../components/Icons";
import loader from "../../assets/table-loader.svg";
import info_icon from "../../assets/info-icon.svg";

import { RangeSlider } from "rsuite";

import "./OpiRanking.scss";
import "../../rs-slider.scss";

class OpiRanking extends Component {
  state = {
    rankData: [],
    region: "",
    sortBy: "Country OPI",
    order: "desc",
    range: [0, 100],
    showRange: false,
  };

  componentDidMount() {
    this.fetchRankData();
  }

  generateUrl = () => {
    const { region, order, sortBy, range } = this.state;

    let sortValue = "";
    switch (sortBy) {
      case "Country":
        sortValue = "country";
        break;
      case "Country OPI":
        sortValue = "country_index";
        break;
      case "Region":
        sortValue = "region";
        break;
      default:
        return;
    }

    let qs = [];
    if (region) qs[qs.length] = `region=${region}`;
    if (sortBy) qs[qs.length] = `sort_by=${sortValue}`;
    if (order) qs[qs.length] = `order=${order}`;
    qs[qs.length] = `min=${range[0]}`;
    qs[qs.length] = `max=${range[1]}`;

    const url = `${baseUrl}/country/index?${qs.join("&")}`;

    return url;
  };

  fetchRankData = async () => {
    this.setState({ rankData: [], isLoading: true });
    const url = this.generateUrl();
    const response = await fetchData(url);
    const data = response && response.data;
    const regions = response && response.regions;
    let formattedRegions = [];
    regions &&
      regions.forEach((item) => {
        const { region, size } = item;
        formattedRegions = [...formattedRegions, { name: region, size }];
      });
    this.setState({
      rankData: data ? data : [],
      isLoading: data ? false : true,
      regions: formattedRegions,
    });
  };

  debouncedFetch = debounce((value) => this.fetchRankData(), 500);

  search = async (search_value) => {
    if (search_value) {
      this.setState({ isLoading: true, rankData: [] });
      const url = `${baseUrl}/country/index?&search=${search_value}`;
      const response = await fetchData(url);
      const data = response && response.data;
      this.setState({
        rankData: data ? data : [],
        isLoading: data ? false : true,
      });
    } else {
      this.fetchRankData();
    }
  };

  setShowRange = (value) => {
    this.setState({
      showRange: value,
    });
  };

  handleCategory = (value) => {
    this.setState({
      region: value,
    });
  };

  handleSort = (value) => {
    this.setState({
      sortBy: value,
    });
  };

  handleOrder = (value) => {
    this.setState({
      order: value,
    });
  };

  handleRange = (range) => {
    this.setState(
      {
        range,
      },
      () => this.debouncedFetch()
    );
  };

  handleFilters = () => {
    this.fetchRankData();
  };

  gotoHome = () => {
    this.props.history.push("/");
  };

  scrollTo = (section) => {
    this.props.history.push({
      pathname: "/",
      state: {
        section,
      },
    });
  };

  render() {
    const {
      rankData,
      showRange,
      range,
      regions,
      region,
      order,
      sortBy,
      isLoading,
    } = this.state;
    return (
      <section className="opi-ranking-page">
        <Header
          theme="light"
          scrollTo={this.scrollTo}
          logoAction={this.gotoHome}
          active="copi"
        />
        <div className="opi-main">
          <div className="max-container">
            <h3 className="page-title">
              Country OPI Ranking
              <span>
                <img src={info_icon} alt="" />
                <div className="description">
                  The ranking of a country’s opportunities amongst other African
                  countries. This can be used to rank and compare the country’s
                  trading potential with others. It ranges from 0 (lowest) to
                  100 (highest).
                </div>
              </span>
            </h3>
            <TopSection
              categories={regions}
              category={region}
              handleCategory={this.handleCategory}
              handleSort={this.handleSort}
              handleOrder={this.handleOrder}
              order={order}
              sortBy={sortBy}
              handleFilters={this.handleFilters}
              sortValues={["Country", "Region", "Country OPI"]}
              type="country"
              handleSearch={this.search}
            />
            <div className="list">
              <div className="desktop-list">
                <div className="list-top">
                  <div>S/N</div>
                  <div>Country</div>
                  <div>Region</div>
                  <div>
                    <div
                      className="value-range"
                      onClick={() => this.setShowRange(true)}
                    >
                      Country OPI
                      <ArrowDown color="#6A6A6A" />
                      {showRange && (
                        <div className="menu">
                          <DetectOutsideClick
                            action={() => this.setShowRange(false)}
                          >
                            <div className="range-div">
                              <RangeSlider
                                progress
                                style={{ marginTop: 16 }}
                                value={range}
                                max={100}
                                // step={0.1}
                                onChange={(value) => {
                                  this.handleRange(value);
                                }}
                              />
                              <div className="min-max">
                                <p>Minimum</p>
                                <p>Maximum</p>
                              </div>
                              <div className="range-values">
                                <p>0</p>
                                <p>100%</p>
                              </div>
                            </div>
                          </DetectOutsideClick>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {rankData.map((item, index) => {
                  const { country, country_index, country_code, region } = item;
                  const number = index + 1;
                  return (
                    <div className="list-item" key={index}>
                      <div>{number}</div>
                      <div className="flag-name">
                        <img
                          src={getFlag(country_code.toLowerCase())}
                          alt=""
                        />
                        {country}
                      </div>
                      <div>{region}</div>
                      <div>{country_index ? `${country_index}%` : 'Not Available'}</div>
                    </div>
                  );
                })}
                {isLoading && rankData.length === 0 && (
                  <div className="loader-div">
                    <img src={loader} alt="" />
                  </div>
                )}
              </div>
              <div className="mobile-list">
                {rankData.map((item, index) => {
                  const { country, country_index } = item;
                  const number = index + 1;
                  return (
                    <div className="list-item" key={index}>
                      <div className="item-top">{number}</div>
                      <div className="item-content">
                        <div className="key-value">
                          <p>Country</p>
                          <p>{country}</p>
                        </div>
                        <div className="key-value">
                          <p>Country Opi</p>
                          <p>{country_index ? `${country_index}%` : 'Not Available'}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {isLoading && rankData.length === 0 && (
                  <div className="loader-div">
                    <img src={loader} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(OpiRanking);
