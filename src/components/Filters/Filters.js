import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Dropdown from '../../UI/Dropdown';
import * as actions from '../../store/actions';
import * as utils from '../../utilities/utilities';
import axios from 'axios';
import LoadingSub from '../../UI/LoadingSub';
import './Filters.scss';

class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            sort: [
                { title: 'Most expensive', val: 'exp' },
                { title: 'Cheapest', val: 'cheap' },
                { title: 'Date', val: 'date' }
            ],
            // -------------------------
            condition: 'all',
            size: ['', ''],
            price: ['', ''],
            type: 'all'
        }
    }

    onFilterByCounter = (param, subParam, val) => {
        if (utils.isNum(parseInt(val)) || val === '') {
            this.props.onFilterByCountersDispatch(param, subParam, val);
        }
    }

    onClearFilters = () => {
        
    }

    onFilterByOptions = (param, val) => {
        if (this.props[param] !== val) this.props.onFilterByOptionsDispatch(param, val);
        console.log(this.props[param]);
    }

    render() {
        // ---------- TRANSLATIONS VIA PROPS ---------
        const t = this.props.base;

        const category = this.props.match.params.category;
        const subcategory = this.props.match.params.subcategory;
        
        const sortTitle = this.state.sort.find(el => el.val === this.props.sort).title; 

        let subCatItems = null, 
            counters = null, 
            subCatTitle = null,
            catTitle = null;
        
        const filter = this.props.filtersList[category];
        
        if (filter) {

            subCatItems = filter.items[subcategory].sub.map((obj, index) => {

                const innerItems = obj.items.map((el, i) => {
                    return (
                        <div className="f__dropitem" key={i} onClick={() => this.onFilterByOptions(obj.val, el.val)}>{el.title}</div>
                    );
                });

                const defaultTitle = obj.items.find(el => el.val === this.props[obj.val]).title;

                return (
                    <li className="f__item" key={index}>
                        <p className="heading__sm">{obj.title}</p>
                        <div>
                            <div className="f__input f__input--d input" tabIndex="0">
                                {defaultTitle}
                                <utils.use styleClass="f__icon f__icon--arrow" svg="chevron-down" />
                            </div>
                            <Dropdown class="dropdown--full dropdown--close dropdown--sm-s f__dropdown">
                                {innerItems}
                            </Dropdown>
                        </div>
                    </li>
                );
            });
        
            counters = filter.items[subcategory].counters.map((el, i) => {
                return (
                    <li className="f__item" key={i}>
                        <p className="heading__sm">{el.title}</p>
                        <div className="f__group">
                            <label className="f__label">
                                <input 
                                    type="text" 
                                    className="f__input f__input--small input" 
                                    placeholder="from" 
                                    onChange={(e) => this.onFilterByCounter(el.val, el.start, e.target.value)} 
                                    value={this.props[el.val][el.start]} />
                                <button className="f__btn f__btn--abs" onClick={() => this.onFilterByCounter(el.val, el.start, '')}>
                                    <utils.use styleClass="f__icon f__icon--arrow" svg="x" />
                                </button>
                            </label>
                            <label className="f__label">
                                <input 
                                    type="text" 
                                    className="f__input f__input--small f__input--border input" 
                                    placeholder="to" 
                                    onChange={(e) => this.onFilterByCounter(el.val, el.end, e.target.value)} 
                                    value={this.props[el.val][el.end]} />
                                <button className="f__btn f__btn--abs" onClick={() => this.onFilterByCounter(el.val, el.end, '')}>
                                    <utils.use styleClass="f__icon f__icon--arrow" svg="x" />
                                </button>
                            </label>
                        </div>
                    </li>
                )
            });
        
            catTitle = filter.title;
            subCatTitle = filter.items[subcategory].title;

            
        } else if (this.state.loading) {
            return (
                <div className="loading-center w-100 f__loading">
                    <LoadingSub />
                </div>
            );
        }
        
        const sortItems = this.state.sort.map((el, i) => <div className="f__dropitem" key={i} onClick={() => this.onFilterByOptions('sort', el.val)}>{el.title}</div>);

        return (
            <React.Fragment>
                <div className="f">
                    <div className="container">
                        <div className="f__wrapper">
                            <div className="f__list f__list--headline">
                                <h3 className="heading heading__3 f__heading">{t.filters}</h3>
                                <div className="f__group">
                                    <button className="f__btn f__btn--close btn__sub" onClick={() => this.onClearFilters()}>
                                        {t.clear}
                                        <utils.use styleClass="f__icon ml-5" svg="x" />
                                    </button>
                                </div>
                            </div>
                            <ul className="f__list f__list--midline">
                                {counters}
                                {subCatItems}
                                <li className="f__item">
                                    <p className="heading__sm">{t.sort}</p>
                                    <div>
                                        <div className="f__input f__input--d input" tabIndex="0">
                                            {sortTitle}
                                            <utils.use styleClass="f__icon f__icon--arrow" svg="chevron-down" />
                                        </div>
                                        <Dropdown class="dropdown--full dropdown--sm-s dropdown--close f__dropdown">
                                            {sortItems}
                                        </Dropdown>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="f__topline">
                    <div className="container">
                        <div className="f__list f__list--headline f__list--stickline">
                            <ul className="f__group">
                                <li className="tag tag__types f__item--tags mr-15">
                                    <a href="#" className="f__link f__link--tags">Lalaku</a>
                                </li>
                                <li className="tag tag__types f__item--tags mr-15">
                                    <a href="#" className="f__link f__link--tags">Baby jackets</a>
                                </li>
                                <li className="tag tag__types f__item--tags f__item--active mr-15">
                                    <a href="#" className="f__link f__link--tags">Baby Jeans</a>
                                </li>
                                <li className="tag tag__types f__item--tags mr-15">
                                    <a href="#" className="f__link f__link--tags">Carriages</a>
                                </li>
                                <li className="tag tag__types f__item--tags">
                                    <a href="#" className="f__link f__link--tags">Toys</a>
                                </li>
                            </ul>
                            <div className="f__group f__group--breadc h-100">
                                <Link to="/" className="f__link f__link--route">{t.home}</Link>
                                <span className="f__link f__link--route">&bull;</span>
                                <Link to={'/' + category} className="f__link f__link--route">{catTitle}</Link>
                                <span className="f__link f__link--route">&bull;</span>
                                <span className="f__link f__link--route">{subCatTitle}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

export default withRouter(Filter);