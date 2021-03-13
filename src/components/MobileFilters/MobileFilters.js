import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';

import * as utils from '../../utilities/utilities';
import Modal from '../Modal';
import './MobileFilters.scss';

const MobileFilters = (props) => {
    // ---------- TRANSLATIONS VIA PROPS ---------
    const { t } = useTranslation();

    const [modal, setModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [tempFilterMain, setTempFilterMain] = useState({});
    const [tempFilter, setTempFilter] = useState({});
    const [fromPlaceholder, setFromPlaceholder] = useState(false);

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
        if (fromPlaceholder) {
            setTempFilterMain(tempFilter);
            onApplyOverallChanges();
            setFromPlaceholder(false);
            setActiveFilter(null);
        } else {
            setTempFilterMain(tempFilter);
            setActiveFilter(null);
        }
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
                <li className="modal__item fdc afs" key={index} onClick={() => setActiveFilter(obj.val)}>
                    <p className="heading__sm">{obj.title}</p>
                    <div className="w-100">
                        <div className="mob-filters__input input" tabIndex="0">
                            {defaultTitle}
                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                        </div>
                    </div>
                </li>
            );

        });

        if (props.regions) {
            if (props.searchLocation.length > 1) 
                regionTitle = props.regions.find(el => el.val === props.searchLocation[0]).title;
            else {
                regionTitle = [];
                props.searchLocation.forEach(item => {
                    const itemTitle = props.regions.find(el => el.val === item).title;
                    regionTitle = [...regionTitle, itemTitle];
                });
                regionTitle = regionTitle.filter(el => {
                    return el && el;
                }).join(', ');
            }
        } 

        counters = filter.items[subcategory].counters.map((el, i) => {
            return (
                <li className="modal__item fdc afs" key={i}>
                    <p className="heading__sm">{el.title}</p>
                    <div className="d-flex">
                        <label className="mob-filters__label">
                            <input 
                                type="text" 
                                className="mob-filters__input mob-filters__input--sm input" 
                                placeholder="from" 
                                onChange={(e) => onSetTempCounter(el.val, el.start, e.target.value)} 
                                value={tempFilterMain[el.val] && tempFilterMain[el.val][el.start]} />
                            <button className="mob-filters__btn--abs" onClick={() => onSetTempCounter(el.val, el.start, '')}>
                                <utils.use styleClass="icon--7 icon--dark" svg="x" />
                            </button>
                        </label>
                        <label className="mob-filters__label">
                            <input 
                                type="text" 
                                className="mob-filters__input mob-filters__input--sm input" 
                                placeholder="to" 
                                onChange={(e) => onSetTempCounter(el.val, el.end, e.target.value)} 
                                value={tempFilterMain[el.val] && tempFilterMain[el.val][el.end]} />
                            <button className="mob-filters__btn--abs" onClick={() => onSetTempCounter(el.val, el.end, '')}>
                                <utils.use styleClass="icon--7 icon--dark" svg="x" />
                            </button>
                        </label>
                    </div>
                </li>
            )
        });

        if (activeFilter) {
            const selectedFilterIndex = filter.items[subcategory].sub.findIndex(el => el.val === activeFilter);
            selectedFilter = filter.items[subcategory].sub[selectedFilterIndex];

            optionsList = selectedFilter.items.map((el, i) => {
                return (
                    <li 
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
                    </li>
                );
            });
        }

        filterPlaceholders = filter.items[subcategory].sub.map((obj, i) => {
            const titleVal = tempFilterMain[obj.val] && obj.items.find(el => tempFilterMain[obj.val] === el.val).title;
            return (
                <div className="d-flex fdc mob-filters__group afs" key={i}>
                    <span className="mob-filters__title">{obj.title}:</span>
                    <button className="mob-filters__placeholder" onClick={() => {setActiveFilter(obj.val); setFromPlaceholder(true)}}>{titleVal}</button>
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
                                <span className="mob-filters__title">{t('main.region')}:</span>
                                <div className="mob-filters__placeholder">
                                    <utils.use styleClass="mob-filters__i--sm mr-5" svg="map-pin" />
                                    {regionTitle}
                                </div>
                            </div>
                            {filterPlaceholders}
                        </div>
                        <button className="mob-filters__btn" onClick={() => setModal(true)}>
                            <utils.use styleClass="mob-filters__i--lg mr-5" svg="filter" />
                            {t('main.filters')}
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
                    title={t('main.filters')} 
                    click={onDiscardOverallChanges} 
                    icon="filter">
                        <div className="modal__body">
                            <ul className="modal__list modal__list--wfoot">
                                {counters}
                                {options}
                            </ul>
                        </div>
                        <div className="modal__footer">
                            <div className="container">
                                <div className="d-flex jc ac">
                                    <button className="modal__btn" onClick={() => onApplyOverallChanges()}>
                                        {t('main.show results')}
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
                            <ul className="modal__list modal__list--wfoot">
                                {optionsList}
                            </ul>
                        </div>
                        <div className="modal__footer">
                            <div className="container">
                                <div className="d-flex ac jc">
                                    <button className="modal__btn" onClick={() => onApplyFilterChange()}>
                                        {t('main.apply')}
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