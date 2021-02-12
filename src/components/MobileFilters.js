import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';

const MobileFilters = (props) => {
    const [modal, setModal] = useState(false);

    const onFilterByCounter = (param, subParam, val) => {
        if (utils.isNum(parseInt(val)) || val === '') {
            props.onFilterByCountersDispatch(param, subParam, val);
        }
    };

    const onFilterByOptions = (param, val) => {
        if (props[param] !== val) props.onFilterByOptionsDispatch(param, val);
        console.log(props[param]);
    };

    let options = null, 
        counters = null,
        subCatTitle = null,
        catTitle = null;
    const category = props.match.params.category;
    const subcategory = props.match.params.subcategory;
    const filter = props.filtersList[category];
    
    if (filter) {
        options = filter.items[subcategory].sub.map((obj, index) => {
    
            const innerItems = obj.items.map((el, i) => {
                return (
                    <div className="f__dropitem" key={i} onClick={() => onFilterByOptions(obj.val, el.val)}>{el.title}</div>
                );
            });

            const defaultTitle = obj.items.find(el => el.val === props[obj.val]).title;

            return (
                <div className="f__item" key={index}>
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
                </div>
            );

        });

        catTitle = filter.title;
        subCatTitle = filter.items[subcategory].title;
    }

    return (
        <React.Fragment>
            <div className="mob-filters">
                <div className="container">
                    <div className="mob-filters__wrapper">
                        <div className="d-flex h-100">
                            <Link to={'/' + category} className="mob-filters__link">{catTitle}</Link>
                            <span className="mob-filters__link">&bull;</span>
                            <span className="mob-filters__link">{subCatTitle}</span>
                        </div>
                        <button className="mob-filters__btn" onClick={() => setModal(true)}>
                            <utils.use styleClass="mob-filters__icon mr-5" svg="filter" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>
            <Modal 
                show={modal} 
                click={() => setModal(false)}
                title="Filters">
                    {options}
            </Modal>
        </React.Fragment>
    );
};

export default withRouter(MobileFilters);