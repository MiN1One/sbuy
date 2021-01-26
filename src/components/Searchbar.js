import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Logo from '../components/Logo';
import * as utils from '../utilities/utilities';
import Backdrop from '../UI/Backdrop';
import RegionsDropdown from './RegionsDropdown';

class searchbar extends PureComponent {

    onPerformSearch = (e) => {
        e.preventDefault();
        
        // ------------------------

        // ..........
    }

    onClickOutside = () => this.setState({ showDrop: false });

    changeSearchLocation = (location) => {
        this.props.onChangeSearchLoc(location);
        this.onClickOutside();
    }

    clearInput = (e) => {
        e.preventDefault();
        this.props.onChangeSearchInput('');
    }

    render() {

        return (
            <div className="s">
                <div className="container">
                    <div className="s__wrapper">
                        <Logo class="s__logo" />
                        <div className="s__form-wrap">
                            <form className="s__form" onSubmit={(e) => this.onPerformSearch(e)} tabIndex="0">
                                <label className="s__label" htmlFor="search">
                                    <input 
                                        className="s__input"
                                        type="text"
                                        placeholder="Search..."
                                        id="search"
                                        onChange={(ev) => this.props.onChangeSearchInput(ev.target.value)}
                                        value={this.props.search} />
                                    <button className="s__btn s__btn--map s__btn--clear" onClick={(e) => this.clearInput(e)} >
                                        <utils.use styleClass="s__icon s__icon--map s__icon--clear" svg="x" />
                                    </button>
                                </label>
                                <div className="s__btn s__btn--map">
                                    <utils.use styleClass="s__icon s__icon--map" svg="map-pin" />
                                    <span className="s__title">{this.props.searchLocation}</span>
                                </div>
                                
                                <button className="s__btn">
                                    <utils.use styleClass="s__icon" svg="search" />
                                </button>
                            </form>
                            <RegionsDropdown class="dropdown--full dropdown--close s__dropdown" click={this.changeSearchLocation} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchLocation: state.localization.searchLocation,
        search: state.data.search
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSearchLoc: (loc) => dispatch(actions.changeSearchLoc(loc)),
        onChangeSearchInput: (search) => dispatch(actions.changeSearchInput(search))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(searchbar);