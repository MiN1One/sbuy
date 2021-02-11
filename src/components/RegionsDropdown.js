import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Dropdown from './Dropdown';

const RegionsDropdown = (props) => {
    let locations = null;
    if (props.regions) {
        locations = props.regions.map((el, i) => {
            return (
                <li className="dropdown__item dropdown__item--grid" key={i} onClick={() => props.click(el.val)}>{el.title}</li>
            );
        });
    }

    return (
        <Dropdown class={props.class}>
            <ul className="dropdown__wrap">
                {locations}
            </ul>
        </Dropdown>
    );
};

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    searchLocation: state.localization.searchLocation,
    regions: state.localization.translations.regionsList
});

export default connect(mapStateToProps)(React.memo(RegionsDropdown));