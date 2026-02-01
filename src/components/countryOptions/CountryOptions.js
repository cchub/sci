import React, { Component } from "react";
import { getAfricanCountries, getFlag } from "../../utils/utils";
import { TimesIcon, SearchIcon } from "../Icons";

import "./CountryOptions.scss";

export default class CountryOptions extends Component {
  state = {
    searchKey: "",
    alphabets: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    linkedAlphabets: [],
    countries: [],
  };

  componentDidMount() {
    const countries = getAfricanCountries();
    this.setState({
      countries,
      linkedAlphabets: this.setLinkAlphabets(countries),
    });
  }

  applyRef = (letter, ref) => {
    this[`country${letter}`] = ref;
  };

  scrollTo = (ref) => {
    if (ref) {
      this[ref].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  handleSearch = (e) => {
    this.setState({
      searchKey: e.target.value,
      countries: this.search(getAfricanCountries(), e.target.value),
    });
  };

  setLinkAlphabets = (countries) => {
    let alphabets = [];
    countries.forEach((country) => {
      if (!alphabets.includes(country.Country_Name[0]))
        alphabets = [...alphabets, country.Country_Name[0]];
    });
    return alphabets;
  };

  search = (arr, searchKey) => {
    return arr.filter((country) =>
      country.Country_Name.includes(
        searchKey.charAt(0).toUpperCase() + searchKey.slice(1)
      )
    );
  };

  render() {
    const { searchKey, alphabets, linkedAlphabets, countries } = this.state;
    const { showList, close, setCountry } = this.props;
    return (
      <div className={`countries-list ${showList ? "show" : "hide"}`}>
        <div className="max-container">
          <div className="top-close">
            <div className="close" onClick={close}>
              <TimesIcon />
              <p>close</p>
            </div>
          </div>
          <div className="search-div">
            <input
              type="text"
              placeholder="Search for Exporting Country"
              value={searchKey}
              onChange={this.handleSearch}
              autoFocus
            />
            <SearchIcon />
          </div>
          <h4>
            {searchKey
              ? `Top Search Matches (${countries.length})`
              : `All Countries (${countries.length})`}
          </h4>
          <div className="list-div">
            <div>
              {!searchKey && (
                <div className="alphabets">
                  {linkedAlphabets &&
                    alphabets.map((alphabet) => {
                      if (linkedAlphabets.includes(alphabet))
                        return (
                          <p
                            onClick={() => this.scrollTo(`country${alphabet}`)}
                            key={alphabet}
                            className="cursor"
                          >
                            {alphabet}
                          </p>
                        );
                      else return <p key={alphabet}>{alphabet}</p>;
                    })}
                </div>
              )}
            </div>
            <div className="list">
              {countries.map((country, index) => {
                const { Country_Name, Country_Code: code } = country;
                const flagUrl = getFlag(code.toLowerCase());
                return (
                  <div
                    key={index}
                    className="flag-name"
                    onClick={() => setCountry(code)}
                    ref={
                      countries[index - 1]?.Country_Name[0] !== Country_Name[0]
                        ? this.applyRef.bind(this, Country_Name[0])
                        : null
                    }
                  >
                    <img src={flagUrl} alt={Country_Name} />
                    <p>{Country_Name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
