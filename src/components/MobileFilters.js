import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';

const MobileFilters = (props) => {
    const [modal, setModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [tempFilterMain, setTempFilterMain] = useState({});
    const [tempFilter, setTempFilter] = useState({});

    useEffect(() => {
        setTempFilter({ ...props.filters });
        setTempFilterMain({ ...props.filters });
    }, []);

    const onFilterByOptions = (param, val) => {
        if (props[param] !== val) props.onFilterByOptionsDispatch(param, val);
    };

    const onSetTempCounter = (param, subParam, val) => {
        if (utils.isNum(parseInt(val)) || val === '') {
            const newArr = tempFilterMain[param].map((el, i) => {
                if (i === subParam) return el = val;
                else return el;
            });

            setTempFilterMain({
                ...tempFilterMain,
                [param]: newArr
            });
        }
    };

    const onDiscardChanges = () => {
        setTempFilter({ ...tempFilterMain });
        setActiveFilter(null);
    };

    const onApplyFilterChange = () => {
        setTempFilterMain(tempFilter);
        setActiveFilter(null);
    };  
    
    const onApplyOverallChanges = () => {
        for (let key in tempFilterMain) onFilterByOptions(key, tempFilter[key]);
        setModal(false);
    };

    const onDiscardOverallChanges = () => {
        setTempFilterMain({ ...props.filters });
        setTempFilter({ ...props.filters });
        setModal(false);
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
    
            const defaultTitle = tempFilterMain[obj.val] && obj.items.find(el => el.val === tempFilterMain[obj.val]).title;

            return (
                <div className="f__item m-0 mb-2" key={index} onClick={() => setActiveFilter(obj.val)}>
                    <p className="f__title">{obj.title}</p>
                    <div>
                        <div className="f__input f__input--d input" tabIndex="0">
                            {defaultTitle}
                            <utils.use styleClass="f__icon f__icon--arrow" svg="chevron-right" />
                        </div>
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
                                onChange={(e) => onSetTempCounter(el.val, el.start, e.target.value)} 
                                value={tempFilterMain[el.val] && tempFilterMain[el.val][el.start]} />
                            <button className="f__btn f__btn--abs" onClick={() => onSetTempCounter(el.val, el.start, '')}>
                                <utils.use styleClass="f__icon f__icon--arrow" svg="x" />
                            </button>
                        </label>
                        <label className="f__label">
                            <input 
                                type="text" 
                                className="f__input f__input--small f__input--border input" 
                                placeholder="to" 
                                onChange={(e) => onSetTempCounter(el.val, el.end, e.target.value)} 
                                value={tempFilterMain[el.val] && tempFilterMain[el.val][el.end]} />
                            <button className="f__btn f__btn--abs" onClick={() => onSetTempCounter(el.val, el.end, '')}>
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
                        className={`modal__item${tempFilter[activeFilter] === el.val ? ' modal__item--active' : ''}`}
                        key={i} 
                        onClick={() => 
                            setTempFilter({
                                ...tempFilter, 
                                [activeFilter]: el.val
                            })}>
                            <div className="d-flex ac">
                                {tempFilter[activeFilter] === el.val && <utils.use styleClass="icon--7 mr-5" svg="check" />}
                                {el.title}
                            </div>
                    </div>
                );
            });
        }

        filterPlaceholders = filter.items[subcategory].sub.map((obj, i) => {
            const titleVal = tempFilterMain[obj.val] && obj.items.find(el => tempFilterMain[obj.val] === el.val).title;
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
                    click={onDiscardOverallChanges} 
                    icon="filter">
                        <div className="modal__body">
                            {options}
                            {counters}
                        </div>
                        <div className="modal__footer">
                            <div className="container">
                                <div className="d-flex jc ac">
                                    <button className="modal__btn" onClick={() => onApplyOverallChanges()}>
                                        Show results
                                    </button>
                                </div>
                            </div>
                        </div>
                </Modal>
            }
            {activeFilter && 
                <Modal 
                    title={selectedFilter.title} 
                    click={onDiscardChanges}>
                        <div className="modal__body">
                            {optionsList}
                        </div>
                        <div className="modal__footer">
                            <div className="container">
                                <div className="d-flex ac jc">
                                    <button className="modal__btn" onClick={() => onApplyFilterChange()}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                </Modal>
            }
        </React.Fragment>
    );
};

export default withRouter(MobileFilters);