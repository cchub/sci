import React from "react";

import "./MobileTabs.scss";

const MobileTabs = ({ activeTab, tabs, handleTabs }) => {
  return (
    <div className="mobile-tabs">
      <div className="title">Active Tab</div>
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={`${tab.name}-tab`}
            className={`tab ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => handleTabs(tab.name)}
          >
            <div className="check">
              <div className="dot"></div>
            </div>
            <p>{tab.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTabs;
