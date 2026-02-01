import React from "react";
import Discover from "../../components/discover/Discover";
import Footer from "../../components/footer/Footer";

import "./ContactUs.scss";

const ContactUs = React.forwardRef((props, ref) => {
  const { scrollTo, setToFalse } = props;
  return (
    <section className="contact-us" ref={ref}>
      <div className="max-container">
        <div className="dicover-section">
          <h3>Looking for new trade opportunities within Africa?</h3>
          <Discover position="bottom" setToFalse={setToFalse} />
        </div>
        <footer>
          <Footer scrollTo={scrollTo}/>
        </footer>
      </div>
    </section>
  );
});

export default ContactUs;
