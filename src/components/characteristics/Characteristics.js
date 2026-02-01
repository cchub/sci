import React from "react";
import numeral from "numeral";
import info_icon_grey from "../../assets/info-icon-grey.svg";
import increase_icon from "../../assets/increase-icon.svg";
import decrease_icon from "../../assets/decrease-icon.svg";

import "./Characteristics.scss";

const blocUrl = {
  AMU: "http://www.maghrebarabe.org/en/",
  ECOWAS: "http://www.comm.ecowas.int/",
  EAC: "http://www.eac.int/",
  IGAD: "http://www.igad.org/",
  SADC: "http://www.sadc.int/",
  COMESA: "http://www.comesa.int/",
  ECCAS: "http://www.ceeac-eccas.org/index.php/en/",
  CENSAD:
    "https://en.wikipedia.org/wiki/Community_of_Sahel%E2%80%93Saharan_States",
};

const Characteristics = ({ data = {}, commodity }) => {
  const {
    scaled_sci,
    dist,
    Exporting_GDP,
    Importing_GDP,
    Exporting_region,
    Importing_region,
    Exporting_exchange_rate,
    Importing_exchange_rate,
    Yesterday_Exporting_exchange_rate,
    Yesterday_Importing_exchange_rate,
    comlang_off,
    contig,
    Exporting_RECs,
    Importing_RECs,
    Country_Index,
    Importing_Country_Index,
    commodity_tradeValue,
    ranked_SCI,
    RECs,
    Importing_country,
    Exporting_country,
  } = data;

  const strReplace = (str) => {
    let arr = [];
    let splitParameter = "; ";
    if (str.includes(",")) splitParameter = ", ";
    str &&
      str.split(splitParameter).forEach((item, index, { length }) => {
        const obj = {
          bloc: item,
          url: blocUrl[item],
        };
        arr = [...arr, obj];
      });
    return arr;
  };

  const yesOrNo = (value) => (value ? "Yes" : "No");

  const distance = dist && `${Number(dist).toFixed(1)}Km`;

  const checkRateChange = (oldRate, newRate) => {
    return parseFloat(newRate) > parseFloat(oldRate);
  };

  const checkCurrencyValue = (value) => {
    if (value) return numeral(value).format("$0.0a");
    return "Not Available";
  };

  const checkValue = (value) => {
    if (value) return value;
    return "Not Available";
  };

  return (
    <div className="characteristics">
      {Object.keys(data).length === 0 && data.constructor === Object ? (
        Array.from(Array(14).keys()).map((item) => (
          <div className="characteristic empty" key={item}>
            <div></div>
            <div></div>
          </div>
        ))
      ) : (
        <React.Fragment>
          {Boolean(commodity) ? (
            <>
              <div className="characteristic">
                <p>Ranked social connectedness index</p>
                <h4>{ranked_SCI}</h4>
                <span className="tooltip">
                  <img src={info_icon_grey} alt="" />
                  <div className="description">
                    The ranked social connectedness index ranks countries
                    according to their strength of connectedness with{" "}
                    {Exporting_country} as represented by Facebook friendship
                    ties. These connections can reveal important insights about
                    economic opportunities, social mobility, trade and more.
                  </div>
                </span>
              </div>
              <div className="characteristic">
                <p>Distance between the two countries</p>
                <h4>{distance}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Total demand</p>
                <h4>{checkCurrencyValue(commodity_tradeValue?.demand)}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Total supply</p>
                <h4>{checkCurrencyValue(commodity_tradeValue?.supply)}</h4>
              </div>
              <div className="characteristic">
                <p>Exporting country region</p>
                <h4>{Exporting_region}</h4>
              </div>
              <div className="characteristic">
                <p>Importing country region</p>
                <h4>{Importing_region}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Proportion of current trade</p>
                <h4>{checkValue(commodity_tradeValue?.tradeOverDemand)}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Market opportunity</p>
                <h4>{checkValue(commodity_tradeValue?.supplyOverDemand)}</h4>
                <span className="tooltip">
                  <img src={info_icon_grey} alt="" />
                  <div className="description">
                    Total supply of “{Exporting_country}” divided by total
                    demand of “{Importing_country}” for the “
                    {commodity_tradeValue.commodity}”
                  </div>
                </span>
              </div>
              <div className="characteristic">
                <p>Sharing a common official language</p>
                <h4>{yesOrNo(comlang_off)}</h4>
              </div>
              <div className="characteristic">
                <p>Sharing a common border</p>
                <h4>{yesOrNo(contig)}</h4>
              </div>
              <div className="characteristic bloc">
                <p>Sharing common trade bloc(s)</p>
                <div>
                  {RECs
                    ? strReplace(RECs).map((item, index, { length }) => {
                        return (
                          <React.Fragment key={index}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <h4>
                                {item.bloc}
                                {index === length - 1 ? "" : ","}
                              </h4>
                            </a>
                          </React.Fragment>
                        );
                      })
                    : "None"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="characteristic">
                <p>Social connectedness index</p>
                <h4>{scaled_sci}</h4>
                <span className="tooltip">
                  <img src={info_icon_grey} alt="" />
                  <div className="description">
                    The Social Connectedness Index measures the strength of
                    connectedness between two geographic areas as represented by
                    Facebook friendship ties. These connections can reveal
                    important insights about economic opportunities, social
                    mobility, trade and more.
                  </div>
                </span>
              </div>
              <div className="characteristic">
                <p>Distance between the two countries</p>
                <h4>{distance}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Exporting country GDP</p>
                <h4>{numeral(Exporting_GDP).format("$0a")}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Importing country GDP</p>
                <h4>{numeral(Importing_GDP).format("$0a")}</h4>
              </div>
              <div className="characteristic">
                <p>Exporting country region</p>
                <h4>{Exporting_region}</h4>
              </div>
              <div className="characteristic">
                <p>Importing country region</p>
                <h4>{Importing_region}</h4>
              </div>
              <div className="characteristic uppercase">
                <p>Exporting country exchange rate</p>
                <h4>
                  1 USD - {Exporting_exchange_rate}
                  <img
                    src={
                      checkRateChange(
                        Yesterday_Exporting_exchange_rate,
                        Exporting_exchange_rate
                      )
                        ? increase_icon
                        : decrease_icon
                    }
                    alt=""
                  />
                </h4>
              </div>
              <div className="characteristic uppercase">
                <p>Importing country exchange rate</p>
                <h4>
                  1 USD - {Importing_exchange_rate}
                  <img
                    src={
                      checkRateChange(
                        Yesterday_Importing_exchange_rate,
                        Importing_exchange_rate
                      )
                        ? increase_icon
                        : decrease_icon
                    }
                    alt=""
                  />
                </h4>
              </div>
              <div className="characteristic">
                <p>Sharing a common official language</p>
                <h4>{yesOrNo(comlang_off)}</h4>
              </div>
              <div className="characteristic">
                <p>Sharing a common border</p>
                <h4>{yesOrNo(contig)}</h4>
              </div>
              <div className="characteristic bloc">
                <p>Exporting Country Trade Blocs</p>
                <div>
                  {Exporting_RECs &&
                    strReplace(Exporting_RECs).map(
                      (item, index, { length }) => {
                        return (
                          <React.Fragment key={index}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <h4>
                                {item.bloc}
                                {index === length - 1 ? "" : ","}
                              </h4>
                            </a>
                          </React.Fragment>
                        );
                      }
                    )}
                </div>
              </div>
              <div className="characteristic bloc">
                <p>Importing Country Trade Blocs</p>
                <div>
                  {Importing_RECs &&
                    strReplace(Importing_RECs).map(
                      (item, index, { length }) => {
                        return (
                          <React.Fragment key={index}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <h4>
                                {item.bloc}
                                {index === length - 1 ? "" : ","}
                              </h4>
                            </a>
                          </React.Fragment>
                        );
                      }
                    )}
                </div>
                {/* <h4>{strReplace(Importing_RECs)}</h4> */}
              </div>
              <div className="characteristic">
                <p>Exporting country competitiveness:</p>
                <h4>{Country_Index}</h4>
                <span className="tooltip">
                  <img src={info_icon_grey} alt="" />
                  <div className="description">
                    The ranking of a country’s opportunities amongst other
                    African countries. This can be used to rank and compare the
                    country’s trading potential with others. It ranges from 0%
                    (lowest) to 100% (highest).
                  </div>
                </span>
              </div>
              <div className="characteristic">
                <p>Importing country competitiveness:</p>
                <h4>{Importing_Country_Index}</h4>
                <span className="tooltip">
                  <img src={info_icon_grey} alt="" />
                  <div className="description">
                    The ranking of a country’s opportunities amongst other
                    African countries. This can be used to rank and compare the
                    country’s trading potential with others. It ranges from 0%
                    (lowest) to 100% (highest).
                  </div>
                </span>
              </div>
            </>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Characteristics;
