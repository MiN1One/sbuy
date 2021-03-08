import React, { useEffect } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './AllCatsPage.scss';
import * as utils from '../../utilities/utilities';
import { useTranslation } from 'react-i18next';

const AllCategories = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (!props.mobile) {
            const slideLinks = Array.from(document.querySelectorAll('.allcats__link--main'))
            slideLinks.forEach((el, i) => onSelectCat(i));
        }
    }, []);

    const onSelectCat = (index) => {

        const itemList = Array.from(document.querySelectorAll('.allcats__list--slide'))[index];
        const arrow = Array.from(document.querySelectorAll('.allcats__icon--arrow'))[index];
        const itemLink = Array.from(document.querySelectorAll('.allcats__link--main'))[index];

        if ($(itemList).is(':hidden')) {

            $(itemList).slideDown({
                duration: 400,
                start: function() {
                    $(this).css({ display: 'flex' })
                }
            });
            $(arrow).css('transform', 'rotate(180deg)');
            $(itemList).css('border-top', '1px solid rgba(0,0,0, .07)');
            $(itemLink).addClass('allcats__link--active');
            
        } else {
            $(itemList).slideUp({ duration: 400 });
            $(arrow).css('transform', 'rotate(0)');
            $(itemList).css('border', 'none');
            $(itemLink).removeClass('allcats__link--active');
        }
    };

    let catItems = null;
    if (props.categories) {
        const catItemsArr = [];
        for (let key in props.categories) {
            catItemsArr.push({
                title: props.categories[key].title,
                val: props.categories[key].val,
                subItems: props.categories[key].subCategories,
                icon: props.categories[key].icon
            });
        }
    
        catItems = catItemsArr.map((obj, i) => {
            const subCategories = obj.subItems.map((el, i) => (
                <li className="allcats__item allcats__item--sub" key={i}>
                    <Link to={`/categories/${obj.val}/${el.val}?page=1`} className="allcats__link allcats__link--sub">
                        {el.title}
                    </Link>
                </li>
            ));
    
            return (
                <li className="allcats__item" key={i}>
                    <div className="allcats__link allcats__link--main" onClick={() => onSelectCat(i)}>
                        <div className="allcats__group">
                            <utils.useCat styleClass="allcats__icon" svg={obj.icon} />
                            {obj.title}
                        </div>
                        <utils.use styleClass="allcats__icon allcats__icon--arrow" svg="chevron-down" />
                    </div>
                    <ul className="allcats__list allcats__list--slide">
                        {subCategories}
                    </ul>
                </li>
            );
        }); 
    }

    return (
        <div className="allcats">
            <div className="container">
                <div className="allcats__wrapper">
                    <div className="allcats__breadcrumbs">
                        <Link to="/" className="mr-5">{t('main.home')}</Link>
                        <span className="mr-5">&bull;</span>
                        <span>{t('main.all cats')}</span>
                    </div>
                    <ul className="allcats__list">{catItems}</ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.localization.translations.categoriesList,
    mobile: state.data.mediaSmall   
});

export default connect(mapStateToProps)(AllCategories);