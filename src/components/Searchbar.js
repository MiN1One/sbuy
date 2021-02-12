import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Logo from '../components/Logo';
import * as utils from '../utilities/utilities';
import RegionsDropdown from './RegionsDropdown';
import Modal from './Modal';

const Searchbar = (props) => {
    const [modal, setModal] = useState(false);

    const onPerformSearch = (e) => {
        if (e) e.preventDefault();
        
        // ------------------------

        // ..........
    };

    const changeSearchLocation = (location) => {
        props.onChangeSearchLoc(location);
        onPerformSearch();
        if (modal) setModal(false);
    };

    let regionTitle = null;
    if (props.regions) {
        regionTitle = props.regions.find(el => el.val === props.searchLocation).title;
    }

    let regions = null;
    if (props.regions) {
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
                            <utils.use styleClass="s__icon--clear mr-1" svg="zoom-in" />
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
                                        onChange={(ev) => props.onChangeSearchInput(ev.target.value)}
                                        value={props.search} />
                                    <button 
                                        className="s__btn s__btn--map s__btn--clear" 
                                        type="button" 
                                        onClick={() => props.onChangeSearchInput('')}>
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
                                click={changeSearchLocation} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={modal}
                click={() => setModal(false)}
                title="Select search region">
                    <ul className="modal__list">{regions}</ul>
            </Modal>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    searchLocation: state.localization.searchLocation,
    search: state.data.search,
    regions: state.localization.translations.regionsList
});

const mapDispatchToProps = (dispatch) => ({
    onChangeSearchLoc: (loc) => dispatch(actions.changeSearchLoc(loc)),
    onChangeSearchInput: (search) => dispatch(actions.changeSearchInput(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Searchbar));