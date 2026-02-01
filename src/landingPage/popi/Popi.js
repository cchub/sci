import React from "react";
import popi_illustration from "../../assets/popi-illustration.svg";

import "./Popi.scss";

const Copi = React.forwardRef((props, ref) => {
  return (
    <section className="popi" ref={ref}>
      <div className="max-container">
        <div className="main-content">
          <div className="illustration">
            <img src={popi_illustration} alt="" />
          </div>
          <div className="text-content">
            <h6>A KEY METRIC</h6>
            <h3>Product OPI</h3>
            <p>
              The % likelihood that a commodity can be traded between countries.
              It is based on the demand of the commodity in the importing
              country and supply of the commodity from the exporting country
              among other indicators. It ranges from 0% (lowest) to 100%
              (highest).
            </p>
              <button onClick={() => props.scrollTo('', true, 'auto')}>Search by commodity</button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Copi;
