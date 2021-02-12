import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Modal from './Modal';

const MobileCats = (props) => {
    const [activeCategory, setActiveCategory] = useState(null);

    let catItems = null, subItems = null, title = null;
    if (props.categories) {
        const catItemsArr = [];
        for (let key in props.categories) {
            catItemsArr.push({
                id: key,
                val: props.categories[key].val,
                title: props.categories[key].title,
                icon: props.categories[key].icon
            });
        }

        catItems = catItemsArr.map((el) => {
            return (
                <li 
                    className="m-cats__item"
                    key={el.id}
                    onClick={() => setActiveCategory(el.id)}>
                    <div className="m-cats__link">
                        <div className="d-flex ac">
                            <utils.useCat styleClass="m-cats__i m-cats__i--cat" svg={el.icon} />
                            {el.title}
                        </div>
                        <utils.use styleClass="m-cats__i m-cats__i--arrow" svg="chevron-right" />
                    </div>
                </li>
            );
        });

        if (activeCategory) {
            subItems = props.categories[activeCategory].subCategories.map((el, i) => {
                return (
                    <div className="modal__item" key={i}>
                        <Link to={`/categories/${props.categories[activeCategory].val}/${el.val}?page=1`} className="m-cats__link m-cats__link--sub">
                            {el.title}
                            <utils.use styleClass="m-cats__i m-cats__i--sub" svg="chevron-right" />
                        </Link>
                    </div>
                );
            });

            title = props.categories[activeCategory].title;
        }

    }

    return (
        <div className="m-cats">
            <div className="container">
                <div className="m-cats__wrapper">
                    <Link to="/all" className="m-cats__btn" onClick={() => {}}>
                        <utils.use styleClass="m-cats__i icon icon--dark mr-5" svg="grid" />
                        All Categories
                    </Link>
                    <ul className="m-cats__list">{catItems}</ul>
                    <Modal 
                        title={title}
                        click={() => setActiveCategory(null)}
                        show={activeCategory}>
                            <ul className="modal__list">{subItems}</ul>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MobileCats);