import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import { connect } from 'react-redux';

const Card = ({ data, onSetFavorites, favorites }) => {
    const location = useLocation();
    const { t } = useTranslation();

    const pathname = location.pathname === '/' ? '/premium/' : `${location.pathname}/`;

    let title = utils.limitStrAny(data.title, 15, false);
    if (data.premium) title = utils.limitStrAny(data.title, 12, true);

    const isFavorite = favorites.findIndex(el => el === data.id) > -1;

    return (
        <div className="card" tabIndex={0}>
            <Link to={`${pathname}${data.id}`} className="card__wrapper">
                <figure className="card__figure">
                    <LazyLoadImage 
                        src={data.img[0]} 
                        effect="opacity" 
                        alt={data.title} 
                        className="card__img" 
                        height="100%" 
                        width="100%" />
                    <span className="card__heading-full">{data.title}</span>
                </figure>
                <div className="card__list">
                    <div className="card__item card__item--group">
                        <span className="card__heading">{title}</span>
                        {data.premium && <span className="badge card__badge">{t('main.top badge')}</span>}
                    </div>
                    <span className="card__item card__item--sub">{data.date}</span>
                    <p className="card__item card__item--sub">{utils.limitStrAny(data.location, 20, false)}</p>
                    <span className="price-tag">{utils.formatPrice(data.price)}</span>
                </div>
            </Link>
            <button 
                className="card__btn" 
                data-favorite={isFavorite ? true : false} 
                onClick={() => onSetFavorites(data.id)}>
                    {isFavorite ? <FaHeart className="card__icon icon" /> : <FaRegHeart className="card__icon icon" />}
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    favorites: state.user.favorites
});

const mapDispatchToProps = (dispatch) => ({
    onSetFavorites: (ad) => dispatch(actions.setFavorites(ad))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Card));