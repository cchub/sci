import React from 'react';
import {
  CircleArrow,
  BackArrow,
} from "../../components/Icons";

import DesktopTabs from "./DesktopTabs";
import background_image from "../../assets/country-bg.svg";
import info_icon_white from "../../assets/info-icon-white.svg";
import { getFlag } from '../../utils/utils';

const backgroundStyle = {
  backgroundImage: `url(${background_image})`,
};

const TopSection = ({
    activeTab,
    tabs,
    toggleMobileTabs,
    handleTabs,
    export_code,
    import_code,
    export_country_name,
    import_country_name,
    year,
    total_export_value,
    export_value,
    back,
    commodity
}) => {
    return (
        <div className="top" style={backgroundStyle}>
          <div className="max-container">
            <div className="back-section">
              <div className="click-div" onClick={back}>
                <BackArrow color="#FFFFFF" />
                <span>Back to Search Results</span>
              </div>
            </div>
            <div className="info">
              <h5>Direct Connections {commodity && <>- <b>{commodity}</b></>}</h5>
              <div className="country-value">
                <div className="flags-countries">
                  <img
                    src={getFlag(export_code)}
                    alt=""
                    className="flag"
                  />
                  <p>{export_country_name}</p>
                  <div className="mobile-spacer"></div>
                  <CircleArrow />
                  <div className="mobile-spacer"></div>
                  <img
                    src={getFlag(import_code)}
                    alt=""
                    className="flag"
                  />
                  <p>{import_country_name}</p>
                </div>
                <div className="value">
                  <div className="trade-value">
                    <span className="info-icon">
                      <img src={info_icon_white} alt="" />
                      <div className="description">
                        {
                          commodity ? `The price of ${commodity} traded between the two countries in the year ${year}`:
                          <>
                          The total value of goods traded between the two
                          countries in the year {year} (source:{" "}
                          <a
                            href="https://oec.world/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            https://oec.world/
                          </a>
                          )
                          </>
                        }
                      </div>
                    </span>
                    <h6>Current Trade Value({year})</h6>
                  </div>
                  <h3
                    className={
                      total_export_value === 0 ? "smaller-font" : ""
                    }
                  >
                    {export_value}
                    <div className="description">
                      The total value of goods traded between the two
                      countries in the year 2018 is not available. (source:{" "}
                      <a
                        href="https://oec.world/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://oec.world/
                      </a>
                      )
                    </div>
                  </h3>
                </div>
              </div>
              <DesktopTabs activeTab={activeTab} tabs={tabs} toggleMobileTabs={toggleMobileTabs} handleTabs={handleTabs}/>
            </div>
          </div>
        </div>
    )
}

export default TopSection
