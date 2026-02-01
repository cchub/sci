import React, { Component } from "react";
import Question from "./Question";

import { faqs } from "./faq-data";

import "./Faq.scss";

// const Faq = React.forwardRef((props, ref) => {
//     return (
//     )
// })

class Faq extends Component {
  state = {
    faqOpened: null,
    // faqs: [1, 2, 3, 4, 5]
  };

  openFAQ = (faq) => {
    const { faqOpened } = this.state;
    if (faqOpened === faq) {
      this.setState({
        faqOpened: null,
      });
    } else {
      this.setState({
        faqOpened: faq,
      });
    }
  };

  render() {
    const { faqOpened } = this.state;
    return (
      <section className="faqs" ref={this.props.setRef}>
        <div className="max-container">
          <div className="section-top">
            <h5>ANY QUESTIONS?</h5>
            <h3>FAQs</h3>
          </div>
          <div className="content">
            {faqs.map((item) => (
              <Question
                key={item.question}
                faq={item}
                faqOpened={faqOpened}
                openFAQ={this.openFAQ}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Faq;
