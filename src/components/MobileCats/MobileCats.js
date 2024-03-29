import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import * as utils from '../../utilities/utilities';
import Modal from '../Modal';
import './MobileCats.scss';

const MobileCats = (props) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const history = useHistory();

    const { t } = useTranslation();

    useEffect(() => {
        if (props.fixed) {
            document.documentElement.style.overflow = 'hidden';
            return () => document.documentElement.style.overflow = 'auto';
        }
    }, [props.fixed]);

    const onClickMainCat = (id) => {
        setActiveCategory(id);
        if (props.clickMain) props.clickMain(id);
    };

    const onClickSubCat = (sub) => {
        if (props.clickSub) props.clickSub(sub);
        else history.push(`/categories/${props.categories[activeCategory].val}/${sub}?page=1`);
        setActiveCategory(null);
    };

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
                    onClick={() => onClickMainCat(el.id)}
                    tabIndex="0">
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
                    <li className="modal__item" key={i} tabIndex="0">
                        <div className="m-cats__link m-cats__link--sub" onClick={() => onClickSubCat(el.val)}>
                            {el.title}
                            <utils.use styleClass="m-cats__i" svg="chevron-right" />
                        </div>
                    </li>
                );
            });

            title = props.categories[activeCategory].title;
        }
    }

    return (
        <div className={`m-cats ${props.fixed ? 'm-cats--fixed' : ''}`}>
            <div className="container">
                <div className="m-cats__wrapper">
                    {!props.fixed  
                        ? <Link to="/all" className="m-cats__btn" onClick={() => {}}>
                            <utils.use styleClass="m-cats__i icon icon--dark mr-5" svg="grid" />
                            {t('main.all cats')}
                        </Link>
                        : <div className="m-cats__head">
                            <button onClick={() => props.close()}>
                                <utils.use styleClass="icon icon--dark" svg="x" />
                            </button>
                        </div>
                    }
                    <ul className="m-cats__list">{catItems}</ul>
                    {activeCategory && 
                        <Modal 
                            click={() => setActiveCategory(null)}
                            title={title}
                            icon={props.categories[activeCategory].icon}
                            cat>
                                <div className="modal__body">
                                    <ul className="modal__list">{subItems}</ul>
                                </div>
                        </Modal>
                    }
                </div>
            </div>
        </div>
    );
};

export default React.memo(MobileCats);