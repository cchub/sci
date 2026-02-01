import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, LockIcon } from "../Icons";
import CountryOptions from "../countryOptions/CountryOptions";
import CommodityOptions from "../commodityOptions/CommodityOptions";
import { getAfricanCountries, getCodeByIp } from "../../utils/utils";
import { baseUrl } from "../../utils/url";
import { getFlag } from "../../utils/utils";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  Text,
  Button,
} from "@chakra-ui/react";

import "./Discover.scss";

export default class Discover extends Component {
  state = {
    country: {},
    showList: false,
    showCommodities: false,
    commodities: [],
    commodity: "",
    commodityAvailable: true,
    progress: 0,
    isLoading: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    if (process.env.NODE_ENV !== "development") {
      const code = await getCodeByIp();
      if(code) this.getCountry(code);
      else this.getCountry("ng");
    } else {
      this.getCountry("ng");
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.openCommodities !== this.props.openCommodities && this.props.openCommodities) {
      this.setState({
        showCommodities: this.props.openCommodities,
      });
    }
  }

  getCountry = (code) => {
    const country = getAfricanCountries().find(
      (item) => item.Country_Code === code.toUpperCase()
    );
    if (country) {
      this.setState({
        country,
      });
      this.getCountryCommodities(code);
    } else {
      this.getCountry('ng');
    }
  };

  getCountryCommodities = (code) => {
    this.setState({ isLoading: true, commodities: [] });
    fetch(`${baseUrl}/country/commodities?export_code=${code}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (this._isMounted) {
          this.setState({
            commodities: responseJSON,
            isLoading: false
          });
        }
      });
  };

  setCountry = (code) => {
    this.getCountry(code);
    this.toggleList();
    const { commodityAvailable } = this.state;
    if(!commodityAvailable) this.setState({ commodityAvailable: true })
  };

  setCommodity = (commodity) => {
    const { commodityAvailable } = this.state;
    if (!commodityAvailable) this.closeAlert();
    this.setState({ commodity });
    this.toggleCommodities();
  };

  toggleList = () => {
    this.setState({
      showList: !this.state.showList,
    });
  };

  toggleCommodities = () => {
    this.setState({
      showCommodities: !this.state.showCommodities,
    }, () => {
      if (!this.state.showCommodities) this.props.setToFalse()
    });
  };

  isCommodityAvailable = (commodity) => {
    if (commodity.length === 0) {
      this.setState({
        commodityAvailable: false,
        commodity: "",
        missingCommodity: this.state.commodity,
      });
    }
  };

  closeAlert = () => {
    this.setState({
      commodityAvailable: true,
    });
  };

  render() {
    const { position } = this.props;
    const {
      country,
      showList,
      commodities,
      showCommodities,
      commodity,
      commodityAvailable,
      isLoading,
      missingCommodity,
    } = this.state;
    const country_name = country && country.Country_Name;
    const code = country && country.Country_Code;
    const flagUrl =
      code && getFlag(code.toLowerCase());

    const qs = [];
    if (code) qs[qs.length] = `focus=${code.toLowerCase()}`;
    if (commodity) qs[qs.length] = `commodity=${encodeURIComponent(commodity)}`;

    return (
      <React.Fragment>
        {position === "top" && (
          <Box bg="#FFFFFF" borderRadius="6px">
            <Tabs isFitted>
              <TabList>
                <Tab
                  // fontSize={18}
                  fontSize={["14px", "18px", "18px", "18px"]}
                  color="rgba(42, 42, 42, 0.7)"
                  pt="24px"
                  pb="26px"
                  fontFamily="Gilroy, sans-serif"
                  _selected={{
                    color: "#1629D3",
                    fontWeight: 700,
                    outline: 0,
                    borderBottom: "4px solid #1629D3",
                    background: "#F6F7FF",
                  }}
                >
                  By Commodity
                </Tab>
                <Tab
                  fontSize={["14px", "18px", "18px", "18px"]}
                  color="rgba(42, 42, 42, 0.7)"
                  pt="24px"
                  pb="26px"
                  fontFamily="Gilroy, sans-serif"
                  _selected={{
                    color: "#1629D3",
                    fontWeight: 700,
                    outline: 0,
                    borderBottom: "4px solid #1629D3",
                    background: "#F6F7FF",
                  }}
                >
                  By Location
                </Tab>
              </TabList>

              <TabPanels
                p={["18px 16px", "27px 30px", "27px 30px", "27px 30px"]}
              >
                <TabPanel p={0}>
                  <Box>
                    <div
                      className={`select-country${
                        !commodityAvailable ? " alert" : ""
                      }`}
                      onClick={this.toggleCommodities}
                    >
                      <div className="text-input">
                        <p className="label">
                          I want to discover opportunities for exporting
                        </p>
                        <div className="flag-country">
                          {/* <img src={flagUrl} alt="" /> */}
                          <p>{commodity || "Select a commodity"}</p>
                        </div>
                      </div>
                      <ArrowDown customClass="arrow" color="#161616" />
                    </div>
                    {!commodityAvailable && (
                      <Box mt="-20px" mb="20px">
                        <Alert
                          status="warning"
                          background="#F2C9A9"
                          p="16px 34px 16px 21px"
                        >
                          <Text
                            color="#734A2A"
                            fontSize={12}
                            fontWeight={600}
                            // mr="30px"
                          >
                            Currently, we don’t have data about exporting{" "}
                            {missingCommodity} from {country_name}. However, we
                            are updating our database.
                          </Text>
                        </Alert>
                      </Box>
                    )}
                    <div className="select-country" onClick={this.toggleList}>
                      <div className="text-input">
                        <p className="label">From</p>
                        <div className="flag-country">
                          <img src={flagUrl} alt="" />
                          <p>{country_name}</p>
                        </div>
                      </div>
                      <ArrowDown customClass="arrow" color="#161616" />
                    </div>
                    <Link to={`/countries?${qs.join("&")}`}>
                      <Button
                        _focus=""
                        _hover=""
                        color="#ffffff"
                        background="#004AD9"
                        width="100%"
                        height="64px"
                        marginTop="16px"
                        marginBottom="10px"
                        fontFamily="Gilroy, sans-serif"
                        fontSize={16}
                        fontWeight={700}
                        borderRadius={0}
                        isLoading={isLoading && commodity}
                        loadingText="Searching..."
                      >
                        Discover Opportunities
                      </Button>
                    </Link>
                  </Box>
                </TabPanel>
                <TabPanel p={0}>
                  <Box>
                    <div className="select-country locked">
                      <div className="text-input">
                        <p className="label">
                          I want to discover opportunities for exporting
                        </p>
                        <div className="flag-country">
                          {/* <img src={flagUrl} alt="" /> */}
                          <p>Any commodity</p>
                        </div>
                      </div>
                      <LockIcon />
                    </div>
                    <div className="select-country" onClick={this.toggleList}>
                      <div className="text-input">
                        <p className="label">From</p>
                        <div className="flag-country">
                          <img src={flagUrl} alt="" />
                          <p>{country_name}</p>
                        </div>
                      </div>
                      <ArrowDown customClass="arrow" color="#161616" />
                    </div>
                    <Link to={`/countries?focus=${code && code.toLowerCase()}`}>
                      <button className="discover-btn">
                        Discover Opportunities
                      </button>
                    </Link>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
        {position === "bottom" && (
          <div className={`select-button dark`}>
            <div className="select-country" onClick={this.toggleCommodities}>
              <div className="text-input">
                <p className="label">I want to export</p>
                <div className="flag-country">
                  {/* <img src={flagUrl} alt="" /> */}
                  <p>{commodity || "Select a commodity"}</p>
                </div>
              </div>
              <ArrowDown customClass="arrow" color="#161616" />
            </div>
            <div className="select-country" onClick={this.toggleList}>
              <div className="text-input">
                <p className="label">I want to export from</p>
                <div className="flag-country">
                  <img src={flagUrl} alt="" />
                  <p>{country_name}</p>
                </div>
              </div>
              <ArrowDown customClass="arrow" color={"#161616"} />
            </div>
            <Link to={`/countries?${qs.join("&")}`}>
              <button>Discover Opportunities</button>
            </Link>
          </div>
        )}
        <CountryOptions
          showList={showList}
          close={this.toggleList}
          setCountry={this.setCountry}
        />
        <CommodityOptions
          commodities={commodities}
          showList={showCommodities}
          close={this.toggleCommodities}
          setCommodity={this.setCommodity}
          commodity={commodity}
          isCommodityAvailable={this.isCommodityAvailable}
          country={country_name}
          isLoading={isLoading}
        />
      </React.Fragment>
    );
  }
}
