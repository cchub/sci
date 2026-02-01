import React from "react";
import numeral from "numeral";
import Characteristics from "../../components/characteristics/Characteristics";

import info_icon from "../../assets/info-icon.svg";
import download_icon from "../../assets/download-icon.svg";
import loader from "../../assets/table-loader.svg";
import AfricaMap from "../../components/AfricaMap";

const OpportunityIndex = ({
  Opportunity_Index,
  import_code,
  export_code,
  downloadingPdf,
  downloadPdf,
  export_country_name,
  import_country_name,
  opportunityData,
  commodity,
}) => {
  const commodity_index =
    opportunityData?.commodity_tradeValue?.commodity_index;
  return (
    <div className="index-statement">
      <h5>
        {commodity ? "Product Opportunity Index" : "Opportunity Index"}
        <span>
          <img src={info_icon} alt="" />
          <div className="description">
            {commodity
              ? "The Product Opportunity Index is the % likelihood that a commodity can be traded between countries. It is based on the demand of the commodity in the importing country and supply of the commodity from the exporting country among other indicators. It ranges from 0% (lowest) to 100% (highest)"
              : "Opportunity Index is the likelihood of potential trade between the exporting country and other countries"}
          </div>
        </span>
      </h5>
      <p className="o-index">
        <span>{commodity ? "POPI" : "OPI"}</span>
        {numeral(commodity ? commodity_index : Opportunity_Index).format(
          "0.00"
        )}
        %
      </p>
      <div className="statement">
        <div className="flex-item">
          <div className="map-container">
            <AfricaMap countries={[export_code, import_code]} />
          </div>
          {!commodity && (
            <button className="download-button" onClick={downloadPdf}>
              Download PDF Report
              <img src={downloadingPdf ? loader : download_icon} alt="" />
            </button>
          )}
        </div>
        <div className="o-statement">
          <h5>Opportunity Statement</h5>
          {commodity ? (
            <p className="o-statement-text">
              There is a{" "}
              <span>{numeral(commodity_index).format("0.00")}%</span> chance
              for potential for trade of{" "}
              <span className="commodity">{commodity}</span> between exporting
              country {export_country_name} and importing country{" "}
              {import_country_name}. In addition to this, the following
              information can significantly influence the potential trade
              volumes:
            </p>
          ) : (
            <p className="o-statement-text">
              There is a{" "}
              <span>{numeral(Opportunity_Index).format("0.00")}%</span> chance
              for potential for trade between exporting country{" "}
              {export_country_name} and importing country {import_country_name}.
              In addition to this, the two countries have the following
              characteristics that significantly influence the predicted trade
              volumes:
            </p>
          )}
          <Characteristics data={opportunityData} commodity={commodity} />
        </div>
      </div>
    </div>
  );
};

export default OpportunityIndex;
