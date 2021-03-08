import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '../UI/Dropdown';
import * as utils from '../utilities/utilities';
import Modal from './Modal';

const RegionsDropdown = (props) => {

    let locations = null;
    const itemClass = props.mobile ? 'modal__item' : 'dropdown__item dropdown__item--grid';

    if (props.regions) {
        const regionsArr = !props.multi ? props.regions.filter(el => el.val !== 'all') : props.regions;
        locations = regionsArr.map((el, i) => {

            const active = props.searchLocation.findIndex(item => el.val === item) !== -1;
            const onlyOne = props.searchLocation.length === 1;

            if (el.val === 'all') return (
                <li 
                    className={`${itemClass} ${(active && props.mobile) && 'modal__item--active'}`} 
                    onClick={() => props.click(el.val)} 
                    key={i}>
                    <span className="w-100">{el.title}</span>
                </li>
            );

            return (
                <li className={itemClass} key={i}>
                    <div className="d-flex ac w-100">
                        {props.multi && 
                            <button className={`btn__check ${active && 'btn__check--active'} mr-1`} onClick={() => props.multi(el.val)}>
                                {onlyOne
                                    ? <utils.use svg={active ? 'check' : 'plus'} />
                                    : <utils.use svg={active ? 'minus' : 'plus'} />    
                                }
                            </button>
                        }
                        <span className="w-100" onClick={() => props.click(el.val)}>{el.title}</span>
                    </div>
                </li>
            );
        });
    }

    const mobileList = props.show 
        &&  <Modal 
                click={props.close}
                title={props.base.search_region}
                icon="map-pin">
                    <div className="modal__body">
                        <ul className="modal__list">
                            {locations}
                        </ul>
                    </div>
            </Modal>;

    return (
        <>
            {!props.mobile 
                ? <Dropdown class={props.class}>
                    <ul className="dropdown__wrap">
                        {locations}
                    </ul>
                </Dropdown>
                : mobileList
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    searchLocation: state.data.filters.searchLocation,
    regions: state.localization.translations.regionsList,
    mobile: state.data.mediaSmall,

    // translations
    base: state.localization.translations.base
});

export default connect(mapStateToProps)(React.memo(RegionsDropdown));