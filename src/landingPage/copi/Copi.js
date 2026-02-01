import React from "react";
import { Link } from "react-router-dom";
import opi_illustration from "../../assets/opi-illustration.svg";

import "./Copi.scss";

const Copi = React.forwardRef((props, ref) => {
  return (
    <section className="copi" ref={ref}>
      <div className="max-container">
        <div className="main-content">
          <div className="text-content">
            <h6>A KEY METRIC</h6>
            <h3>Country OPI Ranking</h3>
            <p>
              The ranking of a country’s opportunities amongst other African
              countries. This can be used to rank and compare the country’s
              trading potential with others.  It ranges from 0 (lowest) to 100
              (highest).
            </p>
            <Link to="/copi-ranking">
              <button>View Ranking</button>
            </Link>
          </div>
          <div className="illustration">
            <img src={opi_illustration} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Copi;
