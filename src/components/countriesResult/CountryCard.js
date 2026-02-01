import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { getFlag } from '../../utils/utils';

import './CountryCard.scss';

export const CountryCard = ({country, noLink}) => {
    const { 
        iso2_import, 
        iso2_export,
        Importing_country,
        Exporting_country,
        Commodities_count,
        commodity_tradeValue,
        Opportunity_Index
    } = country;
    return (
        <div className="country-card">
            <div className="card-top">
                <img src={getFlag(iso2_import.toLowerCase())} alt="" className="flag"/>
                <h4>{Importing_country}</h4>
                {
                    !noLink && 
                    <Link to={`/country?focus=${iso2_export}&import=${iso2_import}`}>
                        <div className="link">
                        <p>View</p>
                        </div>
                    </Link>
                }
            </div>
            <div className="value-div">
                <p>Opportunity Index</p>
                <h3>{Opportunity_Index}%</h3>
            </div>
            <div className="top-imports">
                <p>Top Imports from {Exporting_country}</p>
                <div className="imports">
                    {
                        commodity_tradeValue && <>
                        {
                            commodity_tradeValue?.map(item => {
                                const commodity = item && item.commodity;
                                return(
                                    <div className="import" key={commodity}>
                                        <p>{commodity}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="import">
                            <p>+{Commodities_count - commodity_tradeValue?.length} more</p>
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export const CommodityCountryCard = ({country, noLink, commodity}) => {
    const { 
        iso2_import,
        iso2_export,
        Importing_country,
        commodity_index_rank,
        opi,
        country: country_name,
        commodity_value,
        country_code
    } = country;

    const popi = commodity_index_rank?.commodity_index || opi;
    const code = iso2_import || country_code;

    const checkValue = (value) => {
        if(value) return `${value}%`
        return 'Not Availble'
    }

    return (
        <div className="country-card">
            <div className="card-top">
                <img src={getFlag(code.toLowerCase())} alt="" className="flag"/>
                <h4>{Importing_country || country_name}</h4>
                {
                    !noLink && 
                    <Link to={`/country?focus=${iso2_export}&import=${iso2_import}&commodity=${commodity}`}>
                        <div className="link">
                        <p>View</p>
                        </div>
                    </Link>
                }
            </div>
            <div className="value-div">
                <p>Product Opportunity Index</p>
                <h3 className={popi ? '' : 'regular'} >{checkValue(popi)}</h3>
            </div>
            {
                commodity_value &&
                <div className="value-div">
                    <p>Trade Value</p>
                    <h3 className="regular">{numeral(commodity_value).format('$0.0a')}</h3>
                </div>
            }
        </div>
    )
}

