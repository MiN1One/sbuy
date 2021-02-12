import React, { PureComponent } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingSub from '../UI/LoadingSub';
import * as utils from '../utilities/utilities';

const AllCategories = (props) => {

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
            $(itemList).css({
                'border-bottom': '1px solid rgba(0,0,0, .07)',
                'border-top': '1px solid rgba(0,0,0, .07)',
            });
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
                        <Link to="/" className="f__link f__link--route">Home</Link>
                        <span className="f__link f__link--route">&bull;</span>
                        <span className="f__link f__link--route">All categories</span>
                    </div>
                    <ul className="allcats__list">{catItems}</ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.localization.translations.categoriesList   
});

export default connect(mapStateToProps)(AllCategories);