import React from "react";
import { Divider } from "@chakra-ui/react";
import { InterconnectedEmpty } from "../../components/Icons";
import CountriesResult from "../../components/countriesResult/CountriesResult";
import Skeleton from "../../components/skeleton/Skeleton";
import TradingCountriesFilter from './TradingCountryFilter';

export const InterconnectedCountries = ({ interconnectedLoading, interconnected }) => {
  return (
    <React.Fragment>
      {(interconnectedLoading || interconnected.length > 0) && (
        <div className="interconnected-countries">
          <p className="description">
            These are the countries that are in the top 10 socially connected
            countries between the two counties.
            <br />
            If no direct trade route exists, these counties can be used as
            proxies.
          </p>
          <div className="count">
            {interconnected.length} Interconnected Countries
          </div>
          {interconnectedLoading ? (
            <Skeleton len={4} />
          ) : (
            <CountriesResult countries={interconnected} noLink={true} />
          )}
        </div>
      )}
      {!interconnectedLoading && interconnected.length === 0 && (
        <div className="interconnected-empty">
          <InterconnectedEmpty />
          <h4>No Countries Found</h4>
          <p>
            There are no countries that are in the top 10 socially connected
            countries between the two counties.
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export const TradingCountries = ({ tradingLoading, tradingCountries, commodity, tradingCountriesFilter, filters, filterTradingCountries, importCountry, country }) => {
  return (
    <React.Fragment>
      <TradingCountriesFilter filter={tradingCountriesFilter} filters={filters} handleFilter={filterTradingCountries} country={country} importCountry={importCountry} commodity={commodity} />
      <Divider mb="40px"/>
      {(tradingLoading || tradingCountries.length > 0) && (
        <div className="interconnected-countries">
          {/* <p className="description">
            These are the countries that are in the top 10 socially connected
            countries between the two counties.
            <br />
            If no direct trade route exists, these counties can be used as
            proxies.
          </p> */}
          {/* <div className="count">
            {interconnected.length} Interconnected Countries
          </div> */}
          {tradingLoading ? (
            <Skeleton len={4} />
          ) : (
            <CountriesResult countries={tradingCountries} noLink={true} commodity={commodity} />
          )}
        </div>
      )}
      {!tradingLoading && tradingCountries.length === 0 && (
        <div className="interconnected-empty">
          <InterconnectedEmpty />
          <h4>No Countries Found</h4>
          <p>
            There are no countries to display
          </p>
        </div>
      )}
    </React.Fragment>
  );
}
