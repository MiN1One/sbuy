import React, { PureComponent, Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';
import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import axios from 'axios';
import Searchbar from './Searchbar';

class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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
        import(`../store/Filters/${this.props.lang.val}/${this.props.match.params.category}`)
            .then(filter => {
                this.setState({ filterConfig: filter.default }, () => console.log(this.state.filterConfig));

                console.log(filter.default[this.props.match.params.category].items[this.props.match.params.subcategory]);
                console.log(this.props.match.params.category, this.props.match.params.subcategory);
            })
            .catch(er => {
                this.setState({ filterConfig: {} });
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
        if (utils.isNum(parseInt(val)) || val === '') this.props.onFilterByCountersDispatch(param, subParam, val)
    }

    onClearFilters = () => {
        
    }

    onFilterByOptions = (param, val) => {
        if (this.props[param] !== val) this.props.onFilterByOptionsDispatch(param, val);
        console.log(this.props[param])
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
                        <div className="filter__dropitem" key={i} onClick={() => this.onFilterByOptions(obj.val, el.val)}>{el.title}</div>
                    );
                });

                const defaultTitle = obj.items.find(el => el.val === this.props[obj.val]).title;

                return (
                    <li className="filter__item" key={index}>
                        <p className="filter__title">{obj.title}</p>
                        <div>
                            <div className="filter__input filter__input--d input" tabIndex="0">
                                {defaultTitle}
                                <svg className="filter__icon filter__icon--arrow" dangerouslySetInnerHTML={{__html: utils.use('chevron-down')}} />
                            </div>
                            <Dropdown class="dropdown--full dropdown--close dropdown--sm-s filter__dropdown">
                                {innerItems}
                            </Dropdown>
                        </div>
                    </li>
                );
            });
        
            counters = filter.items[this.props.match.params.subcategory].counters.map((el, i) => {
                return (
                    <li className="filter__item" key={i}>
                        <p className="filter__title">{el.title}</p>
                        <div className="filter__group">
                            <label className="filter__label">
                                <input 
                                    type="text" 
                                    className="filter__input filter__input--small input" 
                                    placeholder="from" 
                                    onChange={(e) => this.onFilterByCounter(el.val, el.start, e.target.value)} 
                                    value={this.props[el.val][el.start]} />
                                <button className="filter__btn filter__btn--abs" onClick={() => this.onFilterByCounter(el.val, el.start, '')}>
                                    <svg className="filter__icon filter__icon--arrow" dangerouslySetInnerHTML={{__html: utils.use('x')}} />
                                </button>
                            </label>
                            <label className="filter__label">
                                <input 
                                    type="text" 
                                    className="filter__input filter__input--small filter__input--border input" 
                                    placeholder="to" 
                                    onChange={(e) => this.onFilterByCounter(el.val, el.end, e.target.value)} 
                                    value={this.props[el.val][el.end]} />
                                <button className="filter__btn filter__btn--abs" onClick={() => this.onFilterByCounter(el.val, el.end, '')}>
                                    <svg className="filter__icon filter__icon--arrow" dangerouslySetInnerHTML={{__html: utils.use('x')}} />
                                </button>
                            </label>
                        </div>
                    </li>
                )
            });
        
            catTitle = filter.title;
            subCatTitle = filter.items[subcategory].title;

            sortItems = this.state.sort.map((el, i) => <div className="filter__dropitem" key={i} onClick={() => this.onFilterByOptions('sort', el.val)}>{el.title}</div>);
            
        } else return <h1>404 Not found!</h1>;
        console.log(this.props.history);
        console.log(this.props.match);
        console.log(this.props.location)

        return (
            <React.Fragment>
                <div className="filter">
                    <div className="container">
                        <div className="filter__wrapper">
                            <div className="filter__list filter__list--headline">
                                <h3 className="heading heading__3 filter__heading">Filters</h3>
                                <div className="filter__group">
                                    <button className="filter__btn filter__btn--close" onClick={() => this.onClearFilters()}>
                                        Clear
                                        <svg className="filter__icon ml-5" dangerouslySetInnerHTML={{__html: utils.use('x')}} />
                                    </button>
                                </div>
                            </div>
                            <ul className="filter__list filter__list--midline">
                                {counters}
                                {subCatItems}
                                <li className="filter__item">
                                    <p className="filter__title">Sort by</p>
                                    <div>
                                        <div className="filter__input filter__input--d input" tabIndex="0">
                                            {sortTitle}
                                            <svg className="filter__icon filter__icon--arrow" dangerouslySetInnerHTML={{__html: utils.use('chevron-down')}} />
                                        </div>
                                        <Dropdown class="dropdown--full dropdown--sm-s dropdown--close filter__dropdown">
                                            {sortItems}
                                        </Dropdown>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="filter__topline">
                    <div className="container">
                        <div className="filter__list filter__list--headline filter__list--stickline">
                            <ul className="filter__group">
                                <li className="tag tag__types filter__item--tags mr-15">
                                    <a href="#" className="filter__link filter__link--tags">Lalaku</a>
                                </li>
                                <li className="tag tag__types filter__item--tags mr-15">
                                    <a href="#" className="filter__link filter__link--tags">Baby jackets</a>
                                </li>
                                <li className="tag tag__types filter__item--tags filter__item--active mr-15">
                                    <a href="#" className="filter__link filter__link--tags">Baby Jeans</a>
                                </li>
                                <li className="tag tag__types filter__item--tags mr-15">
                                    <a href="#" className="filter__link filter__link--tags">Carriages</a>
                                </li>
                                <li className="tag tag__types filter__item--tags">
                                    <a href="#" className="filter__link filter__link--tags">Toys</a>
                                </li>
                            </ul>
                            <div className="filter__group h-100">
                                <Link to="/" className="filter__link filter__link--route">Home</Link>
                                <span className="filter__link filter__link--route">&bull;</span>
                                <Link to={'/' + category} className="filter__link filter__link--route">{catTitle}</Link>
                                <span className="filter__link filter__link--route">&bull;</span>
                                <span className="filter__link filter__link--route">{subCatTitle}</span>
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