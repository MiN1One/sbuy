import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Backdrop from '../UI/Backdrop';

const CategoriesFull = (props) => {
    const [activeCat, setActiveCat] = useState(null);
    const history = useHistory();

    // useEffect(() => {
    //     document.documentElement.style.overflow = 'hidden';
    //     return () => document.documentElement.style.overflow = 'auto';
    // }, []);

    const onClickMainCat = (id) => {
        if (props.clickMain) props.clickMain(id);
        setActiveCat(id);
    };

    const onClickSubCat = (sub) => {
        if (props.clickSub) props.clickSub(sub);
        else history.push(`/categories/${props.categories[activeCat].val}/${sub}`);
        props.close();
    };

    let catItems = null,
        subItems = null;
    if (props.categories) {
        const catsArr = [];
        for (let key in props.categories) {
            catsArr.push({
                id: key,
                title: props.categories[key].title,
                icon: props.categories[key].icon
            });
        }

        catItems = catsArr.map((el, i) => {
            return (
                <li 
                    className="cats-full__item" 
                    key={i} 
                    onClick={() => onClickMainCat(el.id)}
                    tabIndex="0">
                        <utils.useCat styleClass="cats-full__i" svg={el.icon} />
                        {el.title}
                </li>
            );
        });

        if (activeCat) {
            subItems = props.categories[activeCat].subCategories.map((el, i) => {
                return (
                    <li 
                        tabIndex="0" 
                        className="cats-full__pop-item" 
                        onClick={() => onClickSubCat(el.val)} 
                        key={i}>
                            <utils.use styleClass="icon icon--dark mr-5" svg="chevron-right" />
                            {el.title}
                    </li>
                );
            });
        }
    }

    return (
        <div className="cats-full">
            <div className="container">
                <Backdrop z={1} click={props.close} class="backdrop--white" />
                <div className="cats-full__wrapper">
                    <ul className="cats-full__list">
                        {catItems}
                    </ul>
                    {activeCat && 
                        <>
                            <Backdrop z={1} click={() => setActiveCat(null)} />
                            <div className="cats-full__pop">
                                <div className="cats-full__pop-head">
                                    <div className="d-flex ac">
                                        <utils.useCat styleClass="cats-full__i--lg mr-15" svg={props.categories[activeCat].icon} />
                                        <span className="heading__sm m-0">{props.categories[activeCat].title}</span>
                                    </div>
                                    <button className="" onClick={() => setActiveCat(null)}>
                                        <utils.use styleClass="icon icon--dark" svg="x" />
                                    </button>
                                </div>
                                <ul className="cats-full__list cats-full__list--pop">
                                    {subItems}
                                </ul>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default React.memo(CategoriesFull);