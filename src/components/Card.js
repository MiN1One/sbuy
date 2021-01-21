import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, withRouter } from 'react-router-dom';

import * as utils from '../utilities/utilities';

const Card = (props) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favouritesSBUY'));

    const [fovorites, setFavorites] = useState(savedFavorites);

    const onLikeAd = (id) => {

    };
    // const isFavorite = props.data.find(el => el.favorite)
    const pathname = props.match.url === '/' ? '/' : `${props.match.url}/`;

    return (
        <div className="card" tabIndex={0}>
            <Link to={`${pathname}${props.data.id}`} className="card__wrapper">
                <figure className="card__figure">
                    <LazyLoadImage 
                        src={props.data.img[0]} 
                        effect="opacity" 
                        alt={props.data.title} 
                        className="card__img" 
                        height="100%"
                        width="100%" />
                    <span className="card__heading card__heading--hidden">{props.data.title}</span>
                </figure>
                <div className="card__list">
                    <div className="card__item card__item--group" data-premium={props.data.premium}>
                        <span className="card__heading">
                            {utils.limitStrAny(props.data.title, 15)}
                        </span>
                        <span className="badge">TOP</span>
                    </div>
                    <span className="card__item">{props.data.date}</span>
                    <p className="card__item card__item--location">{props.data.location}</p>
                    <div className="card__item card__item--space">
                        <span className="price-tag">{props.data.price}</span>
                    </div>
                </div>
            </Link>
            <button className="card__btn" data-favorite={props.data.favorite} onClick={() => onLikeAd(props.data.id)}>
                <svg className="card__icon icon" dangerouslySetInnerHTML={{__html: utils.use('heart')}} />
            </button>
        </div>
    );
}

export default React.memo(withRouter(Card));