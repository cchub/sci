import React, { Component } from "react";
import { Skeleton } from '@chakra-ui/react' 
import { TimesIcon, SearchIcon } from "../Icons";

import "./CommodityOptions.scss";

export default class CommodityOptions extends Component {
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
    commodities: [],
    searchResults: [],
  };

  componentDidMount() {
    // const { commodities } = this.props;
    // this.setState({
    //   commodities,
    //   linkedAlphabets: this.setLinkAlphabets(commodities),
    // });
  }

  componentDidUpdate(prevProps) {
    if (this.props.commodities !== prevProps.commodities) {
      const { commodities } = this.props;
      this.setState({
        commodities,
        linkedAlphabets: this.setLinkAlphabets(commodities),
      });
      if(commodities.length !== 0){
        this.checkCommodity();
      }
    }
  }

  applyRef = (letter, ref) => {
    this[`commidities${letter}`] = ref;
  };

  scrollTo = (ref) => {
    if (ref) {
      this[ref].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  handleSearch = (e) => {
    this.setState({
      searchKey: e.target.value,
      searchResults: this.search(this.state.commodities, e.target.value),
    });
  };

  setLinkAlphabets = (commodities) => {
    let alphabets = [];
    commodities.forEach((commodity) => {
      if (!alphabets.includes(commodity.commodity[0].toUpperCase()))
        alphabets = [...alphabets, commodity.commodity[0].toUpperCase()];
    });
    return alphabets;
  };

  search = (arr, searchKey) => {
    return arr.filter(
      (commodity) =>
        commodity.commodity.toLowerCase().includes(searchKey.toLowerCase())
    );
  };

  checkCommodity = () => {
    const { commodity, isCommodityAvailable, commodities } = this.props;
    if (commodity && isCommodityAvailable) {
      const result = this.search(commodities, commodity);
      isCommodityAvailable(result);
    }
  };

  render() {
    const {
      searchKey,
      searchResults,
      alphabets,
      linkedAlphabets,
      commodities,
    } = this.state;
    const { showList, close, setCommodity, country, isLoading } = this.props;
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
              placeholder="Search for commodity"
              value={searchKey}
              onChange={this.handleSearch}
              autoFocus
            />
            <SearchIcon />
          </div>
          <h4>
            {searchKey
              ? `Top Search Matches (${searchResults.length})`
              : `All Commodities exported from ${country} (${commodities.length})`}
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
                            onClick={() =>
                              this.scrollTo(`commidities${alphabet}`)
                            }
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
              {!searchKey &&
                commodities.map((item, index) => {
                  const { commodity, category } = item;
                  return (
                    <div
                      key={index}
                      className="commodities"
                      onClick={() => setCommodity(commodity)}
                      ref={
                        commodities[index - 1]?.commodity[0] !== commodity[0]
                          ? this.applyRef.bind(this, commodity[0].toUpperCase())
                          : null
                      }
                    >
                      <h4>{commodity}</h4>
                      <p>{category}</p>
                    </div>
                  );
                })}
              {searchKey &&
                searchResults.map((item, index) => {
                  const { commodity, category } = item;
                  return (
                    <div
                      key={index}
                      className="commodities"
                      onClick={() => setCommodity(commodity)}
                      ref={
                        commodities[index - 1]?.commodity[0] !== commodity[0]
                          ? this.applyRef.bind(this, commodity[0].toUpperCase())
                          : null
                      }
                    >
                      <h4>{commodity}</h4>
                      <p>{category}</p>
                    </div>
                  );
                })}
                {
                  isLoading && [1,2,3,4,5, 6].map(item => {
                    return(
                      <div
                        key={item}
                        className="commodities"
                      >
                        <Skeleton
                          h="32px"
                          w="240px"
                          speed={1}
                          opacity={0.4}
                          mb="10px"
                        />
                        <Skeleton
                          h="16px"
                          w="120px"
                          speed={1}
                          opacity={0.4}
                          mb="15px"
                        />
                      </div>
                    )
                  })
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
