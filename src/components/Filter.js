import React, { PureComponent, Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';
import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import axios from 'axios';
import Searchbar from './Searchbar';
import LoadingSub from '../UI/LoadingSub';

class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            filterConfig: {},

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

    importFilter =  () => {
        this.setState({ loading: true })
        import(`../store/Filters/${this.props.lang.val}/${this.props.match.params.category}`)
            .then(filter => {
                this.setState({ filterConfig: filter.default, loading: false });
            })
            .catch(er => {
                this.setState({ filterConfig: {}, loading: false });
                console.log(er);
            });
    }

    componentDidMount() {
        this.importFilter();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.match.params !== prevProps.match.params) || (this.props.lang.val !== prevProps.lang.val)) this.importFilter();
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
        
        const category = this.props.match.params.category;
        const subcategory = this.props.match.params.subcategory;
        
        const sortTitle = this.state.sort.find(el => el.val === this.props.sort).title; 
        let catTitle = null;
        let subCatTitle = null;

        let subCatItems = null;
        let counters = null;
        let sortItems = null;

        const filter = this.state.filterConfig[category];
        
        if (filter) {

            subCatItems = filter.items[this.props.match.params.subcategory].sub.map((obj, index) => {

                const innerItems = obj.items.map((el, i) => {
                    return (
                        <div className="f__dropitem" key={i} onClick={() => this.onFilterByOptions(obj.val, el.val)}>{el.title}</div>
                    );
                });

                const defaultTitle = obj.items.find(el => el.val === this.props[obj.val]).title;

                return (
                    <li className="f__item" key={index}>
                        <p className="f__title">{obj.title}</p>
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
        
            counters = filter.items[this.props.match.params.subcategory].counters.map((el, i) => {
                return (
                    <li className="f__item" key={i}>
                        <p className="f__title">{el.title}</p>
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

            sortItems = this.state.sort.map((el, i) => <div className="f__dropitem" key={i} onClick={() => this.onFilterByOptions('sort', el.val)}>{el.title}</div>);
            
        } else if (this.state.loading)
            return (
                <div className="loading-center w-100 f__loading">
                    <LoadingSub />
                </div>
            );
        console.log(this.props.history);
        console.log(this.props.match);
        console.log(this.props.location);

        return (
            <React.Fragment>
                <div className="f">
                    <div className="container">
                        <div className="f__wrapper">
                            <div className="f__list f__list--headline">
                                <h3 className="heading heading__3 f__heading">Filters</h3>
                                <div className="f__group">
                                    <button className="f__btn f__btn--close" onClick={() => this.onClearFilters()}>
                                        Clear
                                        <utils.use styleClass="f__icon ml-5" svg="x" />
                                    </button>
                                </div>
                            </div>
                            <ul className="f__list f__list--midline">
                                {counters}
                                {subCatItems}
                                <li className="f__item">
                                    <p className="f__title">Sort by</p>
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
                            <div className="f__group h-100">
                                <Link to="/" className="f__link f__link--route">Home</Link>
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

const mapStateToProps = state => {
    return {
        lang: state.localization.lang,
        condition: state.data.filters.condition,
        size: state.data.filters.size,
        price: state.data.filters.price,
        type: state.data.filters.type,
        sort: state.data.filters.sort
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFilterByCountersDispatch: (name, index, val) => dispatch(actions.filterByCounters(name, index, val)),
        onFilterByOptionsDispatch: (name, val) => dispatch(actions.filterByOptions(name, val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter));