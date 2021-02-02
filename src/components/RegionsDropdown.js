import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Dropdown from './Dropdown';

const RegionsDropdown = (props) => {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        import(`../store/Regions/regions_${props.lang}`)
            .then(data => {
                setRegions(data.default);
            })
            .catch(er => {
                console.error(er);
            });
        }, [props.lang]);

    const title = regions.find(el => el.val === props.searchLocation).title;

    useEffect(() => {
        if (this.props.click) 
            props.click(props.searchLocation, title);
    }, []);


    const locations = regions.map((el, i) => {
        return (
            <li className="dropdown__item dropdown__item--grid" key={i} onClick={() => props.click(el.val, title)}>{el.title}</li>
        );
    });
    return (
        <Dropdown class={props.class}>
            <ul className="dropdown__wrap">
                {locations}
            </ul>
        </Dropdown>
    )
};

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    searchLocation: state.localization.searchLocation
});

const mapDispatchToProps = dispatch => ({
    onChangeSearchLocation: (loc, title) => dispatch(actions.changeSearchLoc(loc, title)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionsDropdown);