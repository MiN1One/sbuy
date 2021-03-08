import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import * as actions from '../store/actions';
import Logo from '../components/Logo';
import * as utils from '../utilities/utilities';
import RegionsDropdown from './RegionsDropdown';
import Backdrop from '../UI/Backdrop';
import { useTranslation } from 'react-i18next';

const Searchbar = (props) => {
    // Translations
    const { t } = useTranslation();

    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    const { onFilterByOptions } = props;

    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        const searchParam = utils.getQueryParamValue('key');
        if (searchParam) {
            setSearch(searchParam);
            onFilterByOptions('search', searchParam);
        }
    }, [onFilterByOptions, location.search]);

    const onPerformSearch = (e) => {
        if (e) e.preventDefault();
        
        // ------------------------
        if (search !== '') {
            const category = params.category ? `&category=${params.category}` : '';
            const categoryPrev = utils.getQueryParamValue('category') ? `&category=${utils.getQueryParamValue('category')}` : '';
            props.onFilterByOptions('search', search);
            history.push(`/search?key=${search}${category || categoryPrev}`);
        }
        // ..........
        setDropdown(false);
    };

    const changeSearchLocation = (location) => {
        props.onChangeSearchLocation(location);
        onPerformSearch();
        if (modal) setModal(false);
    };

    let regionTitle = [];
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
    }

    return (
        <React.Fragment>
            <div className="s">
                <div className="container">
                    <div className="s__wrapper">
                        <Logo classOver="s__logo" />
                        <div className="s__form-wrap">
                            <form 
                                className={`s__form ${dropdown ? 's__form--focused' : ''}`} 
                                onSubmit={(e) => onPerformSearch(e)}>
                                <label className="s__label" htmlFor="search">
                                    <input 
                                        className="s__input"
                                        type="text"
                                        placeholder={t('main.search') + '...'}
                                        id="search"
                                        onChange={(ev) => setSearch(ev.target.value)}
                                        value={search} />
                                    <button 
                                        className="s__btn--clear" 
                                        type="button" 
                                        onClick={() => {
                                            setSearch('');
                                            props.onFilterByOptions('search', '');
                                            }}>
                                        <utils.use styleClass="s__icon s__icon--map s__icon--clear" svg="x" />
                                    </button>
                                </label>
                                <div className="s__btn s__btn--map" onClick={() => setDropdown(true)}>
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
                            {!props.mobile && <RegionsDropdown 
                                class={`dropdown--full dropdown--close s__dropdown ${dropdown ? 's__dropdown--show' : ''}`}
                                click={(loc) => {
                                    changeSearchLocation(loc);
                                    setDropdown(false);
                                }} 
                                multi={props.onAddSearchLocation} />}
                        </div>
                        {dropdown && <Backdrop z={1} click={() => setDropdown(false)} />}
                    </div>
                </div>
            </div>
            {props.mobile && <RegionsDropdown 
                click={changeSearchLocation} 
                multi={props.onAddSearchLocation}
                close={() => setModal(false)}
                show={modal} />}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    searchLocation: state.data.filters.searchLocation,
    search: state.data.search,
    regions: state.localization.translations.regionsList,
    mobile: state.data.mediaSmall,

    // translations
    base: state.localization.translations.base
});

const mapDispatchToProps = (dispatch) => ({
    onChangeSearchLocation: (loc) => dispatch(actions.changeSearchLoc(loc)),
    onChangeSearchInput: (search) => dispatch(actions.changeSearchInput(search)),
    onFilterByOptions: (param, val) => dispatch(actions.filterByOptions(param, val)),
    onAddSearchLocation: (loc) => dispatch(actions.addSearchLocation(loc))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Searchbar));