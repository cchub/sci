import React from "react";
import { useHistory } from "react-router-dom";
import { TwitterIcon, WhatsAppIcon, MailIcon } from "../Icons";
import logo_light from "../../assets/sci-logo-dark.svg";

import "./Footer.scss";

const Footer = ({ scrollTo = null }) => {
  const date = new Date();
  const year = date.getFullYear();
  const history = useHistory();

  const navigate = (section) => {
    if (scrollTo) {
      scrollTo(section);
    } else {
      history.push("/", { section });
    }
  };

  return (
    <React.Fragment>
      <div className="footer">
        <div className="logo">
          <img src={logo_light} alt="" />
        </div>
        <div className="links-section">
          <div className="links">
            <p className="link" onClick={() => navigate("why")}>
              Why Use Our Index?
            </p>
            <p className="link" onClick={() => navigate("how")}>
              How It Works
            </p>
            <p className="link" onClick={() => navigate("faq")}>
              FAQs
            </p>
          </div>
          <div className="links">
            <p className="link">Privacy Policy</p>
            <p className="link">Terms of Service</p>
            <a
              href="https://github.com/cchub/sci"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://api.scitrade.africa/api/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Docs
            </a>
          </div>
        </div>
        <div className="socials">
          <h4>Contact Us</h4>
          <div className="social">
            <TwitterIcon />
            <p>@SCI_TradeIndex</p>
          </div>
          <div className="social">
            <WhatsAppIcon />
            <p>+234 (01) 2950555</p>
          </div>
          <div className="social">
            <MailIcon />
            <p>research@cchub.africa</p>
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; 2020 SciTrade. Licensed under{" "}
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          GNU GPLv3
        </a>
      </div>
    </React.Fragment>
  );
};

export default Footer;
