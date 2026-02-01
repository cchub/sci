import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { saveAs } from "file-saver";
import { format } from "light-date";
import Characteristics from "../../components/characteristics/Characteristics";
import ModalBottom from "../../components/modal/ModalBottom";
import Commodities from "../../components/commodities/Commodities";
import { getAfricanCountries } from "../../utils/utils";
import { baseUrl } from "../../utils/url";
import { fetchData } from "../../utils/api";
import { generateCommoditiesUrl, formatCategories } from "../../utils/utils";
import numeral from "numeral";
import queryString from "query-string";
import Header from "../../components/header/Header";
import MobileTabs from "./MobileTabs";
import TopSection from "./TopSection";
import { InterconnectedCountries, TradingCountries } from "./Countries";
import OpportunityIndex from "./OpportunityIndex";
import MobileBottomNavigation from "./MobileBottomNavigation";
import Footer from "../../components/footer/Footer";

import "./ImportCountry.scss";

const OPPORTUNITY_INDEX = "Opportunity Index & Statement";
const COMMODITIES = "Potential Commodities";
const COUNTRIES = "Interconnected Countries";

const TRADING_COUNTRIES = "Current Trading Countries";
const OTHER_COMMODITIES = "Other Potential Commodities";

class ImportCountry extends Component {
  state = {
    import_country: "",
    export_country: "",
    activeTab: OPPORTUNITY_INDEX,
    mobileMenu: false,
    commodities: [],
    category: "",
    categories: [],
    interconnected: [],
    sortBy: "Current Trade Value",
    order: "desc",
    min: 0,
    max: 0,
    commoditiesLoading: true,
    interconnectedLoading: true,
    tradingCountriesFilter: "buying from",
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const { focus, import: import_code, commodity } = values;
    this.setState(
      {
        import_country: this.getCountry(import_code),
        export_country: this.getCountry(focus),
        export_code: focus.toLowerCase(),
        import_code: import_code.toLowerCase(),
        commodity,
      },
      async () => {
        await this.fetchPairData("opportunityData");
        await this.fetchPairData("categories");
        await this.fetchPairData("interconnected");
        await this.fetchCommodities();
      }
    );
    window.scroll(0, 0);
  }

  fetchPairData = async (type) => {
    this.setState({ [type + "Loading"]: true });
    const { export_code, import_code, commodity } = this.state;
    const endpoints = {
      opportunityData: `trade/${commodity ? "byCommodity/" : ""}view`,
      categories: "categories",
      interconnected: "trade/interconnected/countries",
    };

    // /api/trade/byCommodity/view?export_code=?&&import_code=?&&commodity=?

    const url = `${baseUrl}/${
      endpoints[type]
    }?export_code=${export_code}&import_code=${import_code}${
      commodity ? `&commodity=${encodeURIComponent(commodity)}` : ""
    }`;

    await fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        // console.log({ type, url, response: resJson });
        this.setState({
          [type]: type === "categories" ? formatCategories(resJson) : resJson,
          [type + "Loading"]: false,
        });
        if (type === "opportunityData")
          this.setState({
            max: resJson.top_commodity?.export_value,
            maxValue: resJson.top_commodity?.export_value,
          });
      });
  };

  fetchCommodities = async () => {
    this.setState({ commoditiesLoading: true, commodities: [] });
    const url = generateCommoditiesUrl({ ...this.state });
    const response = await fetchData(url);
    this.setState({
      commodities: response ? this.commoditiesResponse(response) : [],
      commoditiesLoading: response ? false : true,
    });
  };

  search = async (search_value) => {
    if (search_value.trim()) {
      this.setState({ commoditiesLoading: true, commodities: [] });
      const { export_code, import_code } = this.state;
      const url = `${baseUrl}/trade/search?export_code=${export_code}&import_code=${import_code}&search=${search_value}`;
      const response = await fetchData(url);
      this.setState({
        commodities: response ? this.commoditiesResponse(response) : [],
        commoditiesLoading: response ? false : true,
      });
    } else {
      this.fetchCommodities();
    }
  };

  downloadPdf = () => {
    const {
      export_code,
      import_code,
      import_country,
      export_country,
    } = this.state;
    const { Country_Name: import_country_name } = import_country;
    const { Country_Name: export_country_name } = export_country;

    const date = new Date();
    const formatDate = format(date, "{yyyy}-{MM}-{dd}");

    const fileName = `${export_country_name}_${import_country_name}_${formatDate}`;

    const url = `${baseUrl}/pdf?import_code=${import_code}&export_code=${export_code}`;

    this.setState({ downloadingPdf: true });

    fetch(url, {
      method: "POST",
    })
      .then((res) => {
        this.setState({ downloadingPdf: false });
        return res.blob();
      })
      .then((blob) => saveAs(blob, fileName));
  };

  commoditiesResponse = (commodities) => {
    const { commodity } = this.state;
    if (commodity) {
      const list = commodities.filter((val) => val.commodity !== commodity);
      return list;
    } else {
      return commodities;
    }
  };

  handleCategory = (value) => {
    this.setState({
      category: value === "All Commodities" ? "" : value,
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

  handleFilters = () => {
    this.fetchCommodities();
  };

  setMinMax = (value) => {
    this.setState(
      {
        min: value[0],
        max: value[1],
      },
      () => this.fetchCommodities()
    );
  };

  getCountry = (code) => {
    return getAfricanCountries().find(
      (item) => item.Country_Code === code.toUpperCase()
    );
  };

  handleTabs = (activeTab) => {
    this.setState({
      activeTab,
      mobileMenu: false,
    });
    window.scroll(0, 280);
  };

  toggleMobileTabs = () => {
    this.setState({
      mobileMenu: !this.state.mobileMenu,
    });
  };

  gotoHome = () => {
    this.props.history.push("/");
    window.scroll(0, 0);
  };

  backToResults = () => {
    this.props.history.goBack();
  };

  scrollTo = (section) => {
    this.props.history.push({
      pathname: "/",
      state: {
        section,
      },
    });
  };

  filterTradingCountries = (value) => {
    this.setState({
      tradingCountriesFilter: value,
    });
  };

  sortTradingCountries = (value) => {
    this.setState({
      tradingCountriesSort: value,
    });
  };

  render() {
    const {
      activeTab,
      mobileMenu,
      import_country,
      export_country,
      opportunityData,
      commodities,
      categories,
      category,
      interconnected,
      order,
      sortBy,
      maxValue,
      commoditiesLoading,
      interconnectedLoading,
      downloadingPdf,
      commodity,
      tradingCountriesFilter,
    } = this.state;

    let tabs = [
      {
        name: OPPORTUNITY_INDEX,
      },
      {
        name: COMMODITIES,
      },
      {
        name: COUNTRIES,
      },
    ];

    if (commodity) {
      tabs = [
        {
          name: OPPORTUNITY_INDEX,
        },
        {
          name: TRADING_COUNTRIES,
        },
        {
          name: OTHER_COMMODITIES,
        },
      ];
    }

    const import_country_name = import_country?.Country_Name;
    const import_code = import_country?.Country_Code?.toLowerCase();
    const export_country_name = export_country?.Country_Name;
    const export_code = export_country?.Country_Code?.toLowerCase();
    const Opportunity_Index = opportunityData?.Opportunity_Index;
    // const total_export_value = opportunityData?.total_export_value;
    // const commodity_tradeValue = opportunityData?.commodity_tradeValue;

    const export_value = commodity
      ? opportunityData?.commodity_tradeValue?.export_value
      : opportunityData?.total_export_value;
    const trading_countries =
      tradingCountriesFilter === "buying from"
        ? opportunityData?.commodity_tradeValue?.top_exporters
        : opportunityData?.commodity_tradeValue?.top_importers;

    return (
      <main className="import-country">
        <Header
          theme="light"
          scrollTo={this.scrollTo}
          logoAction={this.gotoHome}
        />
        {!opportunityData && (
          <div className="pre-load">
            <div className="top">
              <div className="spacer" />
            </div>
            <div className="main-content">
              <div className="max-container">
                <div className="index-statement">
                  <div className="oi"></div>
                  <div className="o-index">
                    <div />
                    <div />
                  </div>
                  <div className="statement">
                    <div className="flex-item">
                      <div className="map-container empty"></div>
                    </div>
                    <div className="o-statement">
                      <div className="title"></div>
                      <div className="text"></div>
                      <div className="text"></div>
                      <div className="text"></div>
                      <div className="text"></div>
                      <Characteristics data={opportunityData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {opportunityData && (
          <React.Fragment>
            <TopSection
              activeTab={activeTab}
              tabs={tabs}
              toggleMobileTabs={this.toggleMobileTabs}
              handleTabs={this.handleTabs}
              year={opportunityData?.year}
              export_code={export_code}
              import_code={import_code}
              export_country_name={export_country_name}
              import_country_name={import_country_name}
              export_value={
                export_value === 0
                  ? "Not Available"
                  : numeral(export_value).format("$0.0a")
              }
              total_export_value={export_value}
              back={this.backToResults}
              commodity={commodity}
            />
            <div className="main-content">
              <div className="max-container">
                {activeTab === OPPORTUNITY_INDEX && (
                  <OpportunityIndex
                    Opportunity_Index={Opportunity_Index}
                    import_code={import_code}
                    export_code={export_code}
                    downloadingPdf={downloadingPdf}
                    downloadPdf={this.downloadPdf}
                    export_country_name={export_country_name}
                    import_country_name={import_country_name}
                    opportunityData={opportunityData}
                    commodity={commodity}
                  />
                )}
                {(activeTab === COMMODITIES || activeTab === OTHER_COMMODITIES) && (
                  <Commodities
                    data={commodities}
                    categories={categories}
                    category={category}
                    handleCategory={this.handleCategory}
                    handleOrder={this.handleOrder}
                    handleSort={this.handleSort}
                    order={order}
                    sortBy={sortBy}
                    setMinMax={this.setMinMax}
                    maxValue={maxValue}
                    handleFilters={this.handleFilters}
                    handleSearch={this.search}
                    isLoading={commoditiesLoading}
                    commodity={commodity}
                    import_code={import_code}
                    export_code={export_code}
                  />
                )}
                {activeTab === COUNTRIES && (
                  <InterconnectedCountries
                    interconnectedLoading={interconnectedLoading}
                    interconnected={interconnected}
                  />
                )}
                {activeTab === TRADING_COUNTRIES && (
                  <TradingCountries
                    tradingCountries={trading_countries}
                    commodity={commodity}
                    tradingCountriesFilter={tradingCountriesFilter}
                    filters={["selling to", "buying from"]}
                    filterTradingCountries={this.filterTradingCountries}
                    importCountry={import_country_name}
                    country={export_country_name}
                    // sortValues={["",""]}
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
        <MobileBottomNavigation
          tabs={tabs}
          activeTab={activeTab}
          import_country_name={import_country_name}
          export_country_name={export_country_name}
          import_code={import_code}
          export_code={export_code}
          handleTabs={this.handleTabs}
        />
        <footer className="footer-container">
          <div className="max-container">
            <Footer />
          </div>
        </footer>
        <ModalBottom show={mobileMenu} handleClose={this.toggleMobileTabs}>
          <MobileTabs
            handleTabs={this.handleTabs}
            activeTab={activeTab}
            tabs={tabs}
          />
        </ModalBottom>
      </main>
    );
  }
}

export default withRouter(ImportCountry);
