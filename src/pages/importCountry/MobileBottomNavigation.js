import React from 'react'

import { CircleArrow, ArrowDown } from "../../components/Icons"
import { getFlag } from '../../utils/utils'

const MobileBottomNavigation = ({export_country_name, import_country_name, export_code, import_code, activeTab, tabs, handleTabs}) => {
    return (
        <div className="section-nav-mobile">
          <p className="learn-more">Learn more about export from</p>
          <div className="flags-countries">
            <img
              src={getFlag(export_code)}
              alt=""
              className="flag"
            />
            <p>{export_country_name}</p>
            <CircleArrow color="#161616" />
            <img
              src={getFlag(import_code)}
              alt=""
              className="flag"
            />
            <p>{import_country_name}</p>
          </div>
          <div className="tab-buttons">
          {
              tabs.map(tab => {
                  if(activeTab !== tab.name){
                      return(
                        <div
                        key={`${tab.name}-tab`}
                          className="tab-button"
                          onClick={() => handleTabs(tab.name)}
                        >
                          <p>{tab.name}</p>
                          <ArrowDown customClass="arrow" color="#004AD9" />
                        </div>
                      )
                  }
                  return null;
              })
          }
          </div>
        </div>
    )
}

export default MobileBottomNavigation
