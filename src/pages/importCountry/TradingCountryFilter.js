import React, { useState } from "react";
import DetectOutsideClick from "../../components/detectOutsideClick/DetectOutsideClick";
import ModalBottom from "../../components/modal/ModalBottom";
import {
  ArrowDown,
  FilterIcon,
  EditIcon,
  BackArrow,
} from "../../components/Icons";
// import { debounce } from "../../utils/utils";

// import './TopSection.scss';

const TradingCountry = ({
  filter,
  filters,
  handleFilter,
  country,
  importCountry,
  commodity,
  category,
  categories,
  handleCategory,
  handleSort,
  handleOrder,
  order,
  sortBy,
  handleFilters,
  type,
  sortValues,
  handleSearch,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  // const [showSort, setShowSort] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const [showMobileSort, setShowMobileSort] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // const debouncedSearch = useCallback(
  //   debounce((value) => handleSearch(value), 500),
  //   []
  // );

  const selectFilter = (item) => {
    // await handleCategory(item);
    // handleFilters();
    handleFilter(item);
    setShowFilter(false);
  };

  // const selectSort = async (value) => {
  //   await handleSort(value);
  //   handleFilters();
  //   setShowSort(false);
  // };

  // const selectOrder = async (value) => {
  //   await handleOrder(value);
  //   handleFilters();
  //   setShowSort(false);
  // };

  // const openMobileSort = () => {
  //   setShowMobileSort(true);
  //   setShowMobileMenu(false);
  // };

  const openMobileFilter = () => {
    setShowMobileFilter(true);
    setShowMobileMenu(false);
  };

  const saveChanges = () => {
    // handleFilters()
    // setShowMobileSort(false);
    setShowMobileFilter(false);
  };

  const filterText = {
    'selling to': `${country} is currently selling ${commodity} to`,
    'buying from': `${importCountry} is currently buying ${commodity} from`
  }

  return (
    <div className="filter-search">
      <div className="filters">
        <div className="filter">
          <div className="label">Showing top countries</div>
          <div
            className="value"
            onClick={() => (!showFilter ? setShowFilter(true) : null)}
          >
            {filterText[filter]}
            <ArrowDown color="#2A2A2A" />
          </div>
          {showFilter && (
            <div className="menu">
              <DetectOutsideClick action={() => setShowFilter(false)}>
                <div className="filter-menu">
                  <div className="menu-list">
                    <div className="filter-list">
                      {filters.map((item) => {
                        return (
                          <div
                            className={`option ${
                              item === filter ? "active" : ""
                            }`}
                            key={item}
                            onClick={() => selectFilter(item)}
                          >
                            <div className="check"></div>
                            <h4>{filterText[item]}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </DetectOutsideClick>
            </div>
          )}
        </div>
      </div>
      {/* <div className="filters">
        <div className="filter">
          <div className="label">Sort by</div>
          <div className="value" onClick={() => setShowSort(true)}>
            {sortBy}
            <ArrowDown color="#2A2A2A" />
          </div>
          {showSort && (
            <div className="menu">
              <DetectOutsideClick action={() => setShowSort(false)}>
                <div className="sort-menu">
                  <div className="section">
                    <div className="item title">
                      <div className="dot"></div>
                      <p>Sort Table By</p>
                    </div>
                    {sortValues.map((item) => (
                      <div
                        className={`item ${sortBy === item ? "active" : ""}`}
                        onClick={() => selectSort(item)}
                        key={item}
                      >
                        <div className="dot"></div>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </DetectOutsideClick>
            </div>
          )}
        </div>
      </div> */}
      <div className="mobile-filters" onClick={() => setShowMobileMenu(true)}>
        <FilterIcon />
      </div>
      <ModalBottom
        show={showMobileMenu}
        handleClose={() => setShowMobileMenu(false)}
      >
        <div className="mobile-filter-menu">
          <div className="menu-top">
            <FilterIcon color="#595959" />
            <h4>Filter</h4>
          </div>
          <div className="menu-main">
            <div className="menu-row">
              <div>
                <p>Showing</p>
                <h5>importing country is {filter}</h5>
              </div>
              <div onClick={() => openMobileFilter()}>
                <EditIcon />
                <p>Edit</p>
              </div>
            </div>
            {/* <div className="menu-row">
                            <div>
                                <p>Sort By</p>
                                <h5>{sortBy}</h5>
                            </div>
                            <div onClick={() => openMobileSort()}>
                                <EditIcon />
                                <p>Edit</p>
                            </div>
                        </div> */}
          </div>
        </div>
      </ModalBottom>
      {/* {
                showMobileSort &&
                <div className="mobile-menu-content">
                    <div className="back" onClick={() => setShowMobileSort(false)}>
                        <BackArrow /> <p>Back to table</p>
                    </div>
                    <div className="sort-by">
                        Sort Table By
                    </div>
                    <div className="sort-by-items">
                        {
                            sortValues.map(item => (
                                <div className={`item ${sortBy===item?'active':''}`} onClick={() => handleSort(item)} key={item}>
                                    <h4>{item}</h4>
                                    <div className="check"></div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="sort-by">
                        Order
                    </div>
                    <div className="sort-by-items">
                        <div className={`item ${order==='asc'?'active':''}`} onClick={() => handleOrder('asc')}>
                            <h4>Ascending</h4>
                            <div className="check"></div>
                        </div>
                        <div className={`item ${order==='desc'?'active':''}`} onClick={() => handleOrder('desc')}>
                            <h4>Descending</h4>
                            <div className="check"></div>
                        </div>
                    </div>
                    <div className="button-div">
                        <button onClick={() => saveChanges()}>Save Changes</button>
                    </div>
                </div>
            } */}
      {showMobileFilter && (
        <div className="mobile-menu-content">
          <div className="back" onClick={() => setShowMobileFilter(false)}>
            <BackArrow /> <p>Back to table</p>
          </div>
          <div className="sort-by">Select</div>
          <div className="sort-by-items">
            {filters.map((item) => {
              return (
                <div
                  className={`item ${item === filter ? "active" : ""}`}
                  key={item}
                  onClick={() => handleFilter(item)}
                >
                  <h4>importing country is {item}</h4>
                  <div className="check"></div>
                </div>
              );
            })}
          </div>
          <div className="button-div">
            <button onClick={() => saveChanges()}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingCountry;
