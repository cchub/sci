import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Text,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { getAfricanCountries, getFlag } from "../../utils/utils";
import { baseUrl } from "../../utils/url";
import { ArrowDown } from "../../components/Icons";
import queryString from "query-string";
import Header from "../../components/header/Header";
import CountriesResult from "../../components/countriesResult/CountriesResult";
import CountryOptions from "../../components/countryOptions/CountryOptions";
import CommodityOptions from "../../components/commodityOptions/CommodityOptions";
import Skeleton from "../../components/skeleton/Skeleton";
import Footer from "../../components/footer/Footer";
import info_icon from "../../assets/info-icon.svg";
import no_commodity from "../../assets/commodity-na.svg";

import "./ImportCountries.scss";

class ImportCountries extends Component {
  state = {
    code: "",
    country: "",
    showList: false,
    showCommodities: false,
    countries: [],
    commodity: "",
    commodities: [],
    isLoading: false,
    commoditiesLoading: false,
    isOpen: true,
    commodityAvailable: true,
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const { focus, commodity } = values;
    this.setState({
      code: focus,
      commodity: commodity || "",
    });
    this.getCountry(focus);
    this.fetchImportCountries(focus, commodity);
    this.getCountryCommodities(focus);
    window.scroll(0, 0);
  }

  open = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  close = () => {
    this.setState({
      isOpen: false,
    });
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

  fetchImportCountries = (code, commodity) => {
    this.setState({ countries: [], isLoading: true });
    let url;

    if (commodity)
      url = `${baseUrl}/trade/byCommodity?export_code=${code.toLowerCase()}&commodity=${encodeURIComponent(
        commodity
      )}`;
    else url = `${baseUrl}/trade?code=${code.toLowerCase()}`;

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        const { data } = resJson;
        if (!resJson.hasOwnProperty("message")) {
          this.setState({
            countries: data || resJson || [],
            isLoading: false,
          });
        } else {
          this.setState({
            commodityAvailable: false,
            isLoading: false,
          });
        }
      });
  };

  getCountryCommodities = (code) => {
    this.setState({ commoditiesLoading: true, commodities: [] });
    fetch(`${baseUrl}/country/commodities?export_code=${code}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({ commoditiesLoading: false });
        this.setState({
          commodities: responseJSON,
        });
      });
  };

  toggleList = () => {
    this.setState({
      showList: !this.state.showList,
    });
  };

  getCountry = (code) => {
    this.setState({
      country: getAfricanCountries().find(
        (item) => item.Country_Code === code.toUpperCase()
      ),
      code,
    });
  };

  setCountry = (code) => {
    const { commodity, commodityAvailable } = this.state;
    let qs = [];
    qs[qs.length] = `focus=${code.toLowerCase()}`;
    if (commodity) qs[qs.length] = `commodity=${encodeURIComponent(commodity)}`;
    this.props.history.push(`/countries?${qs.join("&")}`);
    this.getCountry(code);
    this.fetchImportCountries(code, commodity);
    this.getCountryCommodities(code);
    this.toggleList();
    if (!commodityAvailable) this.setState({ commodityAvailable: true });
  };

  setCommodity = (commodity) => {
    const { code, commodityAvailable } = this.state;
    this.fetchImportCountries(code, commodity);
    this.props.history.push(
      `/countries?focus=${code.toLowerCase()}&commodity=${encodeURIComponent(
        commodity
      )}`
    );
    this.setState({ commodity });
    if (!commodityAvailable) this.setState({ commodityAvailable: true });
    this.toggleCommodities();
  };

  toggleCommodities = () => {
    this.setState({
      showCommodities: !this.state.showCommodities,
    });
  };

  render() {
    const {
      showList,
      showCommodities,
      country,
      countries,
      commodity,
      commodities,
      isLoading,
      isOpen,
      commoditiesLoading,
      commodityAvailable,
    } = this.state;

    const country_name = country && country.Country_Name;
    const code = country && country.Country_Code.toLowerCase();
    return (
      <main className="import-countries">
        <Header
          theme="light"
          scrollTo={this.scrollTo}
          logoAction={this.gotoHome}
        />
        <div className="top">
          <h4>
            {commodity
              ? "Showing all direct trade connections importing"
              : "Showing all direct trade connections of"}
          </h4>
          <div className="focus-country" onClick={this.toggleCommodities}>
            <p>
              {!commodityAvailable
                ? "Select Commodity"
                : commodity || "Any commodity"}
            </p>
            <ArrowDown customClass="arrow" color="#565656" />
          </div>
          <h4 className="from">from</h4>
          <div className="focus-country" onClick={this.toggleList}>
            <img
              src={getFlag(code.toLowerCase())}
              alt=""
              className="flag"
            />
            <p>{country_name}</p>
            <ArrowDown customClass="arrow" color="#565656" />
          </div>
        </div>
        <div className="main-content">
          <div className="list-title">
            <Flex>
              <h4>
                {commodity
                  ? "Countries ranked by Product Opportunity Index"
                  : "Countries ranked by Opportunity Index"}
              </h4>
              <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={this.close}
                placement="auto-end"
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <img
                    src={info_icon}
                    alt=""
                    className="info-icon"
                    onClick={this.open}
                  />
                </PopoverTrigger>
                <PopoverContent
                  borderRadius={0}
                  boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                  maxWidth="296px"
                >
                  <PopoverArrow />
                  <PopoverBody
                    padding="16px"
                    fontSize={12}
                    fontWeight={400}
                    fontFamily="Gilroy"
                  >
                    {commodity
                      ? "The Product Opportunity Index is the % likelihood that a commodity can be traded between countries. It is based on the demand of the commodity in the importing country and supply of the commodity from the exporting country among other indicators. It ranges from 0% (lowest) to 100% (highest)"
                      : "Opportunity Index is the likelihood of potential trade between the exporting country and other countries"}
                  </PopoverBody>
                  <PopoverFooter
                    d="flex"
                    justifyContent="flex-end"
                    padding="8px 16px"
                  >
                    <Flex
                      alignItems="center"
                      cursor="pointer"
                      onClick={this.close}
                    >
                      <CloseIcon h="8px" w="auto" color="#004AD9" mr="4px" />
                      <Text
                        color="#004AD9"
                        fontSize={12}
                        fontWeight={600}
                        fontFamily="Gilroy"
                      >
                        CLOSE
                      </Text>
                    </Flex>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Flex>
            <span>
              {countries.length === 1
                ? `${countries.length} Country`
                : `${countries.length} Countries`}
            </span>
          </div>
          {countries.length > 0 && (
            <CountriesResult countries={countries} commodity={commodity} />
          )}
          {isLoading && <Skeleton len={20} />}
          {!commodityAvailable && (
            <Flex
              flexDirection="column"
              alignItems="center"
              padding="80px 30px"
            >
              <Image src={no_commodity} boxSize="170px" mb="25px" />
              <Text
                color="#2C2C2C"
                fontSize={16}
                maxWidth="384px"
                textAlign="center"
                fontWeight={600}
              >
                Currently, we don’t have data about exporting {commodity} from{" "}
                {country_name}. However, we are updating our database.
              </Text>
              <Button
                _focus=""
                _hover=""
                color="#ffffff"
                background="#004AD9"
                width="230px"
                height="54px"
                marginTop="44px"
                fontFamily="Gilroy, sans-serif"
                fontSize={16}
                fontWeight={700}
                borderRadius={0}
                onClick={this.toggleCommodities}
              >
                Select Commodity
              </Button>
            </Flex>
          )}
        </div>
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
          country={country_name}
          commodity={commodity}
          // isCommodityAvailable={this.isCommodityAvailable}
          isLoading={commoditiesLoading}
        />
        <footer className="footer-container">
          <Footer />
        </footer>
      </main>
    );
  }
}

export default withRouter(ImportCountries);
