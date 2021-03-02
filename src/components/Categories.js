import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import * as utils from '../utilities/utilities';

import Backdrop from '../UI/Backdrop';
import LoadingSub from '../UI/LoadingSub';


const Categories = (props) => {
    // Translations
    const t = props.base;

    const [activeCategory, setActiveCategory] = useState(null);

    let catItems = null, subItems = null;
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
                    className="cat__item"
                    key={el.id}
                    onClick={() => setActiveCategory(el.id)}>
                    <div className="cat__link">
                        <div className="cat__group">
                            <utils.useCat styleClass="cat__i cat__i--cat" svg={el.icon} />
                            {el.title}
                        </div>
                        <utils.use styleClass="cat__i cat__i--arrow" svg="chevron-right" />
                    </div>
                </li>
            );
        });
        
        if (activeCategory) {
            subItems = props.categories[activeCategory].subCategories.map((el, i) => {
                return (
                    <li className="cat__subitem" key={i}>
                        <Link to={`/categories/${props.categories[activeCategory].val}/${el.val}?page=1`} className="cat__link cat__link--sub">
                            <utils.use styleClass="cat__i cat__i--sub" svg="chevron-right" />
                            {el.title}
                        </Link>
                    </li>
                );
            });
        }
    }

    if (props.loading) 
        return (
            <div className="cat__l l-center">
                <LoadingSub />
            </div>
        );
    
    return (
        <React.Fragment>
            {activeCategory && <Backdrop z={9} click={() => setActiveCategory(null)} />}
            <div className={`cat ${props.class || ''}`}>
                <div className="cat__head">
                    <h2 className="cat__heading">{t.categories}</h2>
                    <Link to="/all" className="cat__btn btn__sub">{t.see_all}</Link>
                </div>
                <ul className="cat__list">{catItems}</ul>
                {activeCategory && 
                    <div className="cat__panel">
                        <div className="cat__subhead">
                            <h2 className="cat__heading cat__heading--sub">
                                {props.categories[activeCategory].title}
                                <utils.useCat styleClass="cat__i cat__i--large" svg={props.categories[activeCategory].icon} />
                            </h2>
                            <button className="cat__btn cat__btn--sub btn__sub" onClick={() => setActiveCategory(null)}>
                                <utils.use styleClass="cat__i" svg="x" />
                            </button>
                        </div>
                        <ul className="cat__sublist">{subItems}</ul>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

export default React.memo(Categories);