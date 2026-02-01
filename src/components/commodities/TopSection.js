import React, { useState, useCallback } from 'react';
import DetectOutsideClick from '../detectOutsideClick/DetectOutsideClick';
import ModalBottom from '../modal/ModalBottom';
import { ArrowDown, SearchIcon, FilterIcon, EditIcon, BackArrow } from '../Icons';
import { debounce } from '../../utils/utils'

import './TopSection.scss';

const TopSection = ({ category, categories, handleCategory, handleSort, handleOrder, order, sortBy, handleFilters, type, sortValues, handleSearch }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSort, setShowMobileSort] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    
    const debouncedSearch = useCallback(
        debounce(value => handleSearch(value), 500),
        [],
    );
    
    const selectFilter = async (item) => {
        await handleCategory(item);
        handleFilters();
        setShowFilter(false);
    }

    const selectSort = async (value) => {
        await handleSort(value);
        handleFilters();
        setShowSort(false);
    }

    const selectOrder = async (value) => {
        await handleOrder(value);
        handleFilters();
        setShowSort(false);
    }

    const search = (value) => {
        setSearchValue(value)
        debouncedSearch(value)
    }

    const openMobileSort = () => {
        setShowMobileSort(true);
        setShowMobileMenu(false);
    }

    const openMobileFilter = () => {
        setShowMobileFilter(true);
        setShowMobileMenu(false);
    }

    const saveChanges = () => {
        handleFilters()
        setShowMobileSort(false)
        setShowMobileFilter(false)
    }

    const typeText = {
        commodity: {
            singular: 'Commodity',
            plural: 'Commodities',
        },
        country: {
            singular: 'Country',
            plural: 'Countries',
        }
    }

    return (
        <div className="filter-search">
            <div className="filters">
                <div className="filter">
                    <div className="label">Showing</div>
                    <div className="value" onClick={() => !showFilter ? setShowFilter(true) : null}>
                        {category==='' ? `All ${typeText[type].plural}` : category}
                        <ArrowDown color="#2A2A2A" />
                    </div>
                    {
                        showFilter &&
                        <div className="menu">
                            <DetectOutsideClick action={() => setShowFilter(false)}>
                                <div className="filter-menu">
                                    <div className="menu-top">
                                        <h4>Select Region</h4>
                                        <div className={`option ${''===category? 'active' : ''}`}>
                                            <h4>All</h4>
                                            <div className="check" onClick={() => selectFilter('')}></div>
                                        </div>
                                    </div>
                                    <div className="menu-list">
                                        <div className="filter-list">
                                            {
                                                categories.map((item) => {
                                                    const { name, size } = item; 
                                                    return(
                                                        <div className={`option ${name===category? 'active' : ''}`} key={name}>
                                                            <div className="check" onClick={() => selectFilter(name)}></div>
                                                            <h4>{name}</h4>
                                                            <div className="count">{size}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </DetectOutsideClick>
                        </div>
                    }
                </div>
                <div className="filter">
                    <div className="label">Sort by</div>
                    <div className="value" onClick={() => setShowSort(true)}>
                        {sortBy}
                            <ArrowDown color="#2A2A2A" />
                    </div>
                    {
                        showSort &&
                        <div className="menu">
                            <DetectOutsideClick action={() => setShowSort(false)}>
                                <div className="sort-menu">
                                    <div className="section">
                                        <div className="item title">
                                            <div className="dot"></div>
                                            <p>Sort Table By</p>
                                        </div>
                                        {
                                            sortValues.map(item => (
                                                <div className={`item ${sortBy===item?'active':''}`} onClick={() => selectSort(item)} key={item}>
                                                    <div className="dot"></div>
                                                    <p>{item}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="section">
                                        <div className="item title">
                                            <div className="dot"></div>
                                            <p>Order</p>
                                        </div>
                                        <div className={`item ${order==='asc'?'active':''}`} onClick={() => selectOrder('asc')}>
                                            <div className="dot"></div>
                                            <p>Ascending</p>
                                        </div>
                                        <div className={`item ${order==='desc'?'active':''}`} onClick={() => selectOrder('desc')}>
                                            <div className="dot"></div>
                                            <p>Descending</p>
                                        </div>
                                    </div>
                                </div>
                            </DetectOutsideClick>
                        </div>
                    }
                </div>
            </div>
            <div className="search">
                <SearchIcon color="#A6A8AE" />
                <input
                    type="text"
                    placeholder={`Search for ${typeText[type].singular}`} 
                    value={searchValue}
                    onChange={(e) => search(e.target.value)}
                />
            </div>
            <div className="mobile-filters" onClick={() => setShowMobileMenu(true)}>
                <FilterIcon />
            </div>
            <ModalBottom show={showMobileMenu} handleClose={() => setShowMobileMenu(false)}>
                <div className="mobile-filter-menu">
                    <div className="menu-top">
                        <FilterIcon color="#595959"/>
                        <h4>Filter</h4>
                    </div>
                    <div className="menu-main">
                        <div className="menu-row">
                            <div>
                                <p>Showing</p>
                                <h5>{category? category : `All ${typeText[type].plural}`}</h5>
                            </div>
                            <div onClick={() => openMobileFilter()}>
                                <EditIcon />
                                <p>Edit</p>
                            </div>
                        </div>
                        <div className="menu-row">
                            <div>
                                <p>Sort By</p>
                                <h5>{sortBy}</h5>
                            </div>
                            <div onClick={() => openMobileSort()}>
                                <EditIcon />
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBottom>
            {
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
            }
            {
                showMobileFilter &&
                <div className="mobile-menu-content">
                    <div className="back" onClick={() => setShowMobileFilter(false)}>
                        <BackArrow /> <p>Back to table</p>
                    </div>
                    <div className="sort-by">
                        Select
                    </div>
                    <div className="sort-by-items">
                        <div className={`item all ${''===category? 'active' : ''}`} onClick={() => handleCategory('')}>
                            <h4>All</h4>
                            <div className="check"></div>
                        </div>
                        {
                            categories.map((item) => {
                                const { name } = item;
                                return(
                                    <div className={`item ${name===category? 'active' : ''}`} key={name} onClick={() => handleCategory(name)}>
                                        <h4>{name}</h4>
                                        <div className="check"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="button-div">
                        <button onClick={() => saveChanges()}>Save Changes</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default TopSection
