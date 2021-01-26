import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as utils from '../../../utilities/utilities';
import Tooltip from '../../../UI/Tooltip';

export const AdsCard = (props) => {

    const clickToDeact = (id) => {

    };
    
    const clickToRemove = (id) => {

    };

    const clickToActivate = (id) => {

    };

    let btnView;
    switch (props.view) {
        case 'active': 
            btnView = <button className="profile__btn profile__btn--red profile__btn--control" onClick={() => clickToDeact(props.el.id)}>Deactivate </button>;
            break;
        case 'remove': 
            btnView = <button className="profile__btn profile__btn--red profile__btn--control" onClick={() => clickToRemove(props.el.id)}>Remove</button>;
            break;
        default:
            btnView = <button className="profile__btn profile__btn--activate profile__btn--control" onClick={() => clickToActivate(props.el.id)}>Activate</button>;
    }

    return (
        <div className="profile__ad" tabIndex="0" key={props.el.id}>
            <figure className="profile__ad-figure">
                <LazyLoadImage 
                    className="profile__ad-img" 
                    src={props.el.img[0]} 
                    alt={props.el.title} 
                    width="100%" 
                    height="100%" />
            </figure>
            <div className="profile__ad-left">
                <span className="profile__ad-title d-flex sb ac" data-premium={props.el.premium}>
                    {props.el.title}
                    <span className="badge w-max profile__ad-badge">Promoted</span>
                </span>
                <span className="profile__ad-title--price-tag w-max">{props.el.price}</span>
                <div className="profile__ad-group profile__ad-group--details">
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="clock" />
                        {props.el.date}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="map-pin" />
                        {props.el.location}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="eye" />
                        167
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="phone" />
                        45
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="heart" />
                        32
                    </span>
                </div>
                <div className="profile__ad-group sb">
                    <div className="d-flex">
                        <button className="profile__btn profile__btn--control">
                            <utils.use styleClass="profile__icon profile__icon--small mr-1" svg="edit-2" />
                            Edit
                        </button>
                        <Link to="/" className="profile__btn profile__btn--control">
                            <utils.use styleClass="profile__icon profile__icon--small mr-1" svg="eye" />
                            View
                        </Link>
                    </div>
                    {btnView}
                </div>
            </div>
        </div>
    );
}

export const AdFull = (props) => {

    const onRemoveFromFavorites = (id) => {
        
    };

    return (
        <div className="profile__ad" tabIndex="0" key={props.el.id}>
            <figure className="profile__ad-figure">
                <LazyLoadImage 
                    className="profile__ad-img" 
                    src={props.el.img[0]} 
                    alt={props.el.title} 
                    width="100%" 
                    height="100%" />
            </figure>
            <div className="profile__ad-left">
                <span className="profile__ad-title d-flex sb ac" data-premium={props.el.premium}>
                    {props.el.title}
                    <span className="badge w-max profile__ad-badge">Promoted</span>
                </span>
                <div className="profile__ad-group">
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="clock" />
                        {props.el.date}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="map-pin" />
                        {props.el.location}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="eye" />
                        167
                    </span>
                </div>
                <div>
                    <div className="d-flex">
                        <span className="tag__types profile__fav-tag">Category</span>
                        <span className="tag__types profile__fav-tag">Subcategory</span>
                        <span className="tag__types profile__fav-tag">Addition</span>
                    </div>
                    <div className="mt-5 d-flex sb ac">
                        <span className="price-tag mt-5 w-max">{props.el.price}</span>
                        <button className="profile__btn profile__btn--rounded DTool DTool--right-top pos-rel" data-favorite={props.el.favorite} onClick={() => props.click()}>
                            <utils.use styleClass="profile__icon profile__icon--det profile__icon--small icon" svg="heart" />
                            <Tooltip>Remove from favourites</Tooltip>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};