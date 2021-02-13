import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';

const MobileFilters = (props) => {
    const [modal, setModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

    const onFilterByCounter = (param, subParam, val) => {
        if (utils.isNum(parseInt(val)) || val === '') {
            props.onFilterByCountersDispatch(param, subParam, val);
        }
    };

    const onFilterByOptions = (param, val) => {
        if (props[param] !== val) props.onFilterByOptionsDispatch(param, val);
        console.log(props[param]);
    };

    let options = null,
        optionsList = null, 
        counters = null,
        subCatTitle = null,
        catTitle = null,
        selectedFilter = null,
        filterPlaceholders = null,
        regionTitle = null;

    const category = props.match.params.category;
    const subcategory = props.match.params.subcategory;
    const filter = props.filtersList[category];
    
    if (filter) {
        options = filter.items[subcategory].sub.map((obj, index) => {
    
            const defaultTitle = obj.items.find(el => el.val === props[obj.val]).title;

            return (
                <div className="f__item m-0 mb-2" key={index} onClick={() => setActiveFilter(obj.val)}>
                    <p className="f__title">{obj.title}</p>
                    <div>
                        <div className="f__input f__input--d input" tabIndex="0">
                            {defaultTitle}
                            <utils.use styleClass="f__icon f__icon--arrow" svg="chevron-right" />
                        </div>
                        {/* <Dropdown class="dropdown--full dropdown--close dropdown--sm-s f__dropdown">
                            {innerItems}
                        </Dropdown> */}
                        
                    </div>
                </div>
            );

        });

        if (props.regions) regionTitle = props.regions.find(el => el.val === props.searchLocation).title; 

        counters = filter.items[subcategory].counters.map((el, i) => {
            return (
                <div className="f__item m-0 mb-2" key={i}>
                    <p className="f__title">{el.title}</p>
                    <div className="f__group">
                        <label className="f__label">
                            <input 
                                type="text" 
                                className="f__input f__input--small input" 
                                placeholder="from" 
                                onChange={(e) => onFilterByCounter(el.val, el.start, e.target.value)} 
                                value={props[el.val][el.start]} />
                            <button className="f__btn f__btn--abs" onClick={() => onFilterByCounter(el.val, el.start, '')}>
                                <utils.use styleClass="f__icon f__icon--arrow" svg="x" />
                            </button>
                        </label>
                        <label className="f__label">
                            <input 
                                type="text" 
                                className="f__input f__input--small f__input--border input" 
                                placeholder="to" 
                                onChange={(e) => onFilterByCounter(el.val, el.end, e.target.value)} 
                                value={props[el.val][el.end]} />
                            <button className="f__btn f__btn--abs" onClick={() => onFilterByCounter(el.val, el.end, '')}>
                                <utils.use styleClass="f__icon f__icon--arrow" svg="x" />
                            </button>
                        </label>
                    </div>
                </div>
            )
        });

        if (activeFilter) {
            const selectedFilterIndex = filter.items[subcategory].sub.findIndex(el => el.val === activeFilter);
            selectedFilter = filter.items[subcategory].sub[selectedFilterIndex];

            optionsList = selectedFilter.items.map((el, i) => {
                return (
                    <div 
                        className={`modal__item${props.filters[activeFilter] === el.val ? ' modal__item--active' : ''}`}
                        key={i} 
                        onClick={() => onFilterByOptions(activeFilter, el.val)}>
                            {el.title}
                    </div>
                );
            });
        }

        filterPlaceholders = filter.items[subcategory].sub.map((obj, i) => {
            const titleVal = obj.items.find(el => props.filters[obj.val] === el.val).title;
            return (
                <div className="d-flex fdc mob-filters__group" key={i}>
                    <span className="mob-filters__title">{obj.title}:</span>
                    <button className="mob-filters__placeholder" onClick={() => setActiveFilter(obj.val)}>{titleVal}</button>
                </div>
            );
        });

        catTitle = filter.title;
        subCatTitle = filter.items[subcategory].title;
    }

    return (
        <React.Fragment>
            <div className="mob-filters">
                <div className="container">
                    <div className="mob-filters__wrapper">
                        <div className="mob-filters__placeholders">
                            <div className="d-flex fdc mob-filters__group">
                                <span className="mob-filters__title">Search location:</span>
                                <div className="mob-filters__placeholder">
                                    <utils.use styleClass="mob-filters__i--sm mr-5" svg="map-pin" />
                                    {regionTitle}
                                </div>
                            </div>
                            {filterPlaceholders}
                        </div>
                        <button className="mob-filters__btn" onClick={() => setModal(true)}>
                            <utils.use styleClass="mob-filters__i--lg mr-5" svg="filter" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>
            <div className="mob-filters__breadcrumbs">
                <div className="container">
                    <div className="d-flex h-100 tc">
                        <Link to={'/' + category} className="mob-filters__link">{catTitle}</Link>
                        <span className="mob-filters__link">&bull;</span>
                        <span className="mob-filters__link">{subCatTitle}</span>
                    </div>
                </div>
            </div>
            {modal && 
                <Modal 
                    title="Filters" 
                    click={() => setModal(false)} 
                    icon="filter"
                    footer>
                        {options}
                        {counters}
                </Modal>
            }
            {activeFilter && 
                <Modal 
                    title={selectedFilter.title} 
                    click={() => setActiveFilter(null)}
                    footer>
                        {optionsList}
                </Modal>
            }
        </React.Fragment>
    );
};

export default withRouter(MobileFilters);