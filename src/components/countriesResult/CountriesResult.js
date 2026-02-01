import React from "react";
import { CountryCard, CommodityCountryCard } from "./CountryCard";

import "./CountriesResult.scss";

const CountriesResult = ({ countries, noLink, commodity }) => {
  return (
    <div className="countries-result">
      {countries.map((country, index) =>
        commodity ? (
          <CommodityCountryCard
            country={country}
            key={`card-${index}`}
            noLink={noLink}
            commodity={commodity}
          />
        ) : (
          <CountryCard
            country={country}
            key={`card-${index}`}
            noLink={noLink}
          />
        )
      )}
    </div>
  );
};

export default CountriesResult;
