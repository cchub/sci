import React from "react";
import { ArrowDown } from "../../components/Icons";

import "./DesktopTabs.scss";

const DesktopTabs = ({ activeTab, tabs, toggleMobileTabs, handleTabs }) => {
  return (
    <div className="nav">
      <div className="desktop-nav">
        {tabs.map((tab) => (
          <div
            key={`${tab.name}-tab`}
            className={`nav-item ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => handleTabs(tab.name)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="mobile-nav">
        <div className="white-bg" onClick={toggleMobileTabs}>
          <p>{activeTab}</p>
          <ArrowDown customClass="arrow" color="#0D1669" />
        </div>
      </div>
    </div>
  );
};

export default DesktopTabs;
