import React from "react";
import { TradeIcon, CommoditiesIcon, ValueIcon } from "../../components/Icons";

import "./WhyUse.scss";

const WhyUse = React.forwardRef((props, ref) => {
  return (
    <section className="why-use" ref={ref}>
      <div className="max-container">
        <div className="section-top">
          <h5>BENEFITS</h5>
          <h3>Why Use Our Index?</h3>
        </div>
        <div className="content">
          <div className="reason">
            <TradeIcon />
            <h5>Trade Improvement</h5>
            <p>
              We use SCI and trade data to generate a model that reveals and
              explores trade opportunities amongst Africa countries.
            </p>
          </div>
          <div className="reason">
            <CommoditiesIcon />
            <h5>Commodities Intersection</h5>
            <p>
              Our index reveals latent possibilities of goods and services a
              country can export and import to/from connected countries, as well
              as the estimated value of the commodities.
            </p>
          </div>
          <div className="reason">
            <ValueIcon />
            <h5>Trade Value Between Countries</h5>
            <p>
              Using social connectedness &amp; trade flow data from across
              Africa, our model allows policymakers, development agencies and
              entrepreneurs to view the value of trade between countries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhyUse;
