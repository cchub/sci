import React, { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import numeral from "numeral";
import DetectOutsideClick from "../detectOutsideClick/DetectOutsideClick";
import TopSection from "./TopSection";
import { ArrowDown, CommodityLinkIcon } from "../Icons";
import loader from "../../assets/table-loader.svg";
import { debounce } from "../../utils/utils";

import { RangeSlider } from "rsuite";
import "./Commodities.scss";
import "../../rs-slider.scss";

const Commodities = ({
  data,
  commodity,
  categories,
  category,
  handleCategory,
  handleSort,
  handleOrder,
  order,
  sortBy,
  setMinMax,
  maxValue = 0,
  handleFilters,
  handleSearch,
  isLoading,
  import_code,
  export_code,
}) => {

  const [range, setRange] = useState([0, maxValue]);
  // const [commodities, setCommodities] = useState([]);
  const [showRange, setShowRange] = useState(false);

  // useEffect(() => {
  //   if (commodity) {
  //     const list = data.filter(
  //       (val) => val.commodity !== commodity
  //     );
  //     setCommodities(list);
  //   } else {
  //     setCommodities(data);
  //   }
  // }, [commodity, data]);

  const debouncedCall = useCallback(
    debounce((value) => setMinMax(value), 500),
    []
  );

  const handleRange = (value) => {
    setRange(value);
    debouncedCall(value);
  };

  const replaceNotation = (a) => {
    switch (a) {
      case "b":
        return " Billion";
      case "m":
        return " Million";
      case "k":
        return ",000";
      default:
        return a;
    }
  };

  const formatValue = (value) => {
    if (value === 0) return "Not Available";
    const formattedValue = numeral(value).format("$0a");
    const notation = replaceNotation(formattedValue.slice(-1));
    return formattedValue.slice(0, -1) + notation;
  };

  return (
    <section className="commodities-section">
      <TopSection
        categories={categories}
        category={category}
        handleCategory={handleCategory}
        handleSort={handleSort}
        handleOrder={handleOrder}
        order={order}
        sortBy={sortBy}
        sortValues={["Commodities", "Current Trade Value"]}
        handleFilters={handleFilters}
        type="commodity"
        handleSearch={handleSearch}
      />
      <div className="list">
        <div className="desktop-list">
          <div className={`list-top${commodity? " commodity-item" : ""}`}>
            <div>S/N</div>
            <div>Commodity</div>
            <div>
              <div className="value-range" onClick={() => setShowRange(true)}>
                Current Trade Value
                <ArrowDown color="#6A6A6A" />
                {showRange && (
                  <div className="menu">
                    <DetectOutsideClick action={() => setShowRange(false)}>
                      <div className="range-div">
                        <RangeSlider
                          progress
                          style={{ marginTop: 16 }}
                          value={range}
                          max={maxValue}
                          onChange={(value) => {
                            handleRange(value);
                          }}
                        />
                        <div className="min-max">
                          <p>Minimum</p>
                          <p>Maximum</p>
                        </div>
                        <div className="range-values">
                          <p>$0</p>
                          <p>{numeral(maxValue).format("$0.0a")}</p>
                        </div>
                      </div>
                    </DetectOutsideClick>
                  </div>
                )}
              </div>
            </div>
          </div>
          {data.map((item, index) => {
            const { commodity: name, export_value } = item;
            const number = index + 1;
            return (
              <div
                className={`list-item${commodity? " commodity-item" : ""}`}
                key={index}
              >
                <div>{number}</div>
                <div>{name}</div>
                <div>
                  {formatValue(export_value)}
                  {commodity && 
                    <Link 
                      to={`/country?focus=${export_code.toUpperCase()}&import=${import_code.toUpperCase()}&commodity=${encodeURIComponent(name)}`}
                      target="_blank"
                    >
                    <CommodityLinkIcon />
                    </Link>
                  }
                </div>
              </div>
            );
          })}
          {isLoading && data.length === 0 && (
            <div className="loader-div">
              <img src={loader} alt="" />
            </div>
          )}
        </div>
        <div className="mobile-list">
          {data.map((item, index) => {
            const { commodity, export_value } = item;
            const number = index + 1;
            return (
              <div className="list-item" key={index}>
                <div className="item-top">{number}</div>
                <div className="item-content">
                  <div className="key-value">
                    <p>Commodity</p>
                    <p>{commodity}</p>
                  </div>
                  <div className="key-value">
                    <p>Current Trade Value</p>
                    <p>{formatValue(export_value)}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && data.length === 0 && (
            <div className="loader-div">
              <img src={loader} alt="" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Commodities;
