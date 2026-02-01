import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon, MenuCloseIcon } from "../Icons";
import logo_light from "../../assets/sci-logo-light.svg";
import logo_dark from "../../assets/sci-logo-dark.svg";
import cchub_logo_white from "../../assets/cchub_logo_white.png";
import background_image from "../../assets/hero-bg.svg";
import CartContainer from "../cart/CartContainer";

import "./Header.scss";

const backgroundStyle = {
  backgroundImage: `url(${background_image})`,
};

class Header extends Component {
  state = {
    showMobileMenu: false,
    cartIsOpen: false,
  };
  toggleMobileNav = () => {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu,
    });
  };
  setCartIsOpen = (open) => {
    this.setState({
      cartIsOpen: open,
    });
  };
  render() {
    const { showMobileMenu, cartIsOpen } = this.state;
    const { theme, scrollTo, active, logoAction } = this.props;
    let headerClass = theme !== "light" && showMobileMenu ? "blue" : "";
    let headerTheme = theme;
    if (cartIsOpen) headerTheme = "light";
    return (
      <div
        className={`header ${headerTheme} ${headerClass} ${
          showMobileMenu ? "show" : "hide"
        }`}
        style={showMobileMenu ? backgroundStyle : {}}
      >
        <div className="navbar">
          <div className="logo" onClick={logoAction}>
            {headerTheme === "light" && !showMobileMenu ? (
              <img src={logo_dark} alt="" />
            ) : (
              <img src={logo_light} alt="" />
            )}
          </div>
          <div className="nav-items">
            <div
              className={`nav-item${active === "why-use" ? " active" : ""}`}
              onClick={() => scrollTo("why")}
            >
              Why Use Our Index?
            </div>
            <div
              className={`nav-item${active === "how" ? " active" : ""}`}
              onClick={() => scrollTo("how")}
            >
              How It Works
            </div>
            <div
              className={`nav-item${active === "copi" ? " active" : ""}`}
              onClick={() => scrollTo("copi")}
            >
              COPI Ranking
            </div>
            <div className={`nav-item${active === "reports" ? " active" : ""}`}>
              <Link to="/reports">Reports</Link>
            </div>
            <div
              className={`nav-item${active === "faq" ? " active" : ""}`}
              onClick={() => scrollTo("faq")}
            >
              FAQs
            </div>
            <div
              className={`nav-item${active === "contact" ? " active" : ""}`}
              onClick={() => scrollTo("contact")}
            >
              Contact Us
            </div>
          </div>
          <CartContainer setCartIsOpen={this.setCartIsOpen} />
          {!showMobileMenu && !cartIsOpen && (
            <HamburgerIcon
              customClass="hamburger-icon"
              clickAction={this.toggleMobileNav}
              theme={headerTheme}
            />
          )}
        </div>
        <div className={`mobile-nav-items ${showMobileMenu ? "show" : "hide"}`}>
          <div
            className={`nav-item${active === "why-use" ? " active" : ""}`}
            onClick={() => {
              scrollTo("why");
              this.toggleMobileNav();
            }}
          >
            Why Use Our Index?
          </div>
          <div
            className={`nav-item${active === "how" ? " active" : ""}`}
            onClick={() => {
              scrollTo("how");
              this.toggleMobileNav();
            }}
          >
            How It Works
          </div>
          <div
            className={`nav-item${active === "copi" ? " active" : ""}`}
            onClick={() => {
              scrollTo("copi");
              this.toggleMobileNav();
            }}
          >
            COPI Ranking
          </div>
          <div className={`nav-item${active === "reports" ? " active" : ""}`}>
            <Link to="/reports">Reports</Link>
          </div>
          <div
            className={`nav-item${active === "faq" ? " active" : ""}`}
            onClick={() => {
              scrollTo("faq");
              this.toggleMobileNav();
            }}
          >
            FAQs
          </div>
          <div
            className={`nav-item${active === "contact" ? " active" : ""}`}
            onClick={() => {
              scrollTo("contact");
              this.toggleMobileNav();
            }}
          >
            Contact Us
          </div>
        </div>
        <div
          className={`mobile-nav-bottom ${showMobileMenu ? "show" : "hide"}`}
        >
          <div className="powered-by">
            <p>Powered by</p>
            <img src={cchub_logo_white} alt="Co-creation Hub logo" />
          </div>
          <div className="close-div">
            <MenuCloseIcon clickAction={this.toggleMobileNav} />
            <p onClick={this.toggleMobileNav}>Close menu</p>
          </div>
        </div>
      </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Header;
