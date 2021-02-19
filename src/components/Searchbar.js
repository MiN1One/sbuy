import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Logo from '../components/Logo';
import * as utils from '../utilities/utilities';
import RegionsDropdown from './RegionsDropdown';

const Searchbar = (props) => {
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');

    const onPerformSearch = (e) => {
        if (e) e.preventDefault();
        
        // ------------------------
        if (search !== '') props.onFilterByOptions('search', search);
        // ..........
    };

    const changeSearchLocation = (location) => {
        props.onChangeSearchLocation(location);
        onPerformSearch();
        if (modal) setModal(false);
    };


    let regions = null, regionTitle = [];
    if (props.regions) {

        if (props.searchLocation.length === 1) 
            regionTitle = props.regions.find(el => el.val === props.searchLocation[0]).title;
        else {
            props.searchLocation.forEach(item => {
                const elTitle = props.regions.find(el => item === el.val).title;

                regionTitle = [...regionTitle, elTitle];
            });
            regionTitle = regionTitle.filter(el => {
                return el && el;
            }).join(', ');

            regionTitle = utils.limitStrLength(regionTitle, 20);
        }
        
        regions = props.regions.map((el, i) => {
            if (el.title === regionTitle) {
                return <li 
                    className="modal__item modal__item--active"
                    onClick={() => changeSearchLocation(el.val)}
                    key={i}>
                        <div className="d-flex ac">
                            <utils.use styleClass="s__icon--clear s__icon--active mr-1" svg="check" />
                            {el.title}
                        </div>
                    </li>
            }

            return (
                <li 
                    className="modal__item"
                    onClick={() => changeSearchLocation(el.val)}
                    key={i}>
                        <div className="d-flex ac">
                            <utils.use styleClass="s__icon--clear mr-1" svg="plus" />
                            {el.title}
                        </div>
                </li>
            );
        });
    }

    return (
        <React.Fragment>
            <div className="s">
                <div className="container">
                    <div className="s__wrapper">
                        <Logo classOver="s__logo" />
                        <div className="s__form-wrap">
                            <form className="s__form" onSubmit={(e) => onPerformSearch(e)} tabIndex="0">
                                <label className="s__label" htmlFor="search">
                                    <input 
                                        className="s__input"
                                        type="text"
                                        placeholder="Search..."
                                        id="search"
                                        onChange={(ev) => setSearch(ev.target.value)}
                                        value={search} />
                                    <button 
                                        className="s__btn s__btn--map s__btn--clear" 
                                        type="button" 
                                        onClick={() => {
                                            setSearch('');
                                            props.onFilterByOptions('search', '');
                                            }}>
                                        <utils.use styleClass="s__icon s__icon--map s__icon--clear" svg="x" />
                                    </button>
                                </label>
                                <div className="s__btn s__btn--map">
                                    <utils.use styleClass="s__icon s__icon--map" svg="map-pin" />
                                    <span className="s__title">{regionTitle}</span>
                                </div>
                                <button 
                                    className="s__btn s__btn--map-mob"
                                    type="button"
                                    onClick={() => setModal(true)}>
                                    <utils.use styleClass="s__icon s__icon--map" svg="map-pin" />
                                </button>
                                
                                <button className="s__btn" type="submit">
                                    <utils.use styleClass="s__icon" svg="search" />
                                </button>
                            </form>
                            <RegionsDropdown 
                                class="dropdown--full dropdown--close s__dropdown" 
                                click={changeSearchLocation} 
                                multi={props.onAddSearchLocation}
                                close={() => setModal(false)}
                                show={modal} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    searchLocation: state.localization.searchLocation,
    search: state.data.search,
    regions: state.localization.translations.regionsList
});

const mapDispatchToProps = (dispatch) => ({
    onChangeSearchLocation: (loc) => dispatch(actions.changeSearchLoc(loc)),
    onChangeSearchInput: (search) => dispatch(actions.changeSearchInput(search)),
    onFilterByOptions: (param, val) => dispatch(actions.filterByOptions(param, val)),
    onAddSearchLocation: (loc) => dispatch(actions.addSearchLocation(loc))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Searchbar));