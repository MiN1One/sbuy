import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Dropdown from './Dropdown';
import * as utils from '../utilities/utilities';
import Modal from './Modal';

const RegionsDropdown = (props) => {
    const [mobile, setMobile] = useState(false);
    const media = window.matchMedia('(max-width: 46.9375em)');
    const watch = () => {
        if (media.matches) setMobile(true);
        else setMobile(false);
    };

    useEffect(() => {
        watch();
        media.onchange = watch;
    }, []);

    let locations = null;
    const itemClass = mobile ? 'modal__item' : 'dropdown__item dropdown__item--grid';

    if (props.regions) {
        const regionsArr = props.forSets ? props.regions.filter(el => el.val !== 'all') : props.regions;
        locations = regionsArr.map((el, i) => {
            if (el.val === 'all') return (
                <li 
                    className={itemClass} 
                    onClick={() => props.click(el.val)} 
                    key={i}>
                    <span>{el.title}</span>
                </li>
            );

            const active = props.searchLocation.findIndex(item => el.val === item) !== -1;

            return (
                <li className={itemClass} key={i}>
                    {props.multi && 
                        <button className={`btn__check ${active && 'btn__check--active'} mr-1`} onClick={() => props.multi(el.val)}>
                            <utils.use svg={active ? 'minus' : 'plus'} />
                        </button>
                    }
                    <span onClick={() => props.click(el.val)}>{el.title}</span>
                </li>
            );
        });
    }

    const mobileList = props.show 
        &&  <Modal 
                click={props.close}
                title="Search Region"
                icon="map-pin">
                    <div class="modal__body">
                        <ul className="modal__list">
                            {locations}
                        </ul>
                    </div>
            </Modal>;

    return (
        <>
            {!mobile 
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
    searchLocation: state.localization.searchLocation,
    regions: state.localization.translations.regionsList
});

export default connect(mapStateToProps)(React.memo(RegionsDropdown));