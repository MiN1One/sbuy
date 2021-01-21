import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as utils from '../../../utilities/utilities';
import Tooltip from '../../../UI/Tooltip';

export const AdsCard = (props) => {    
    let btnView;
    switch (props.view) {
        case 'active': 
            btnView = (
                <button className="profile__btn profile__btn--red profile__btn--control" onClick={() => props.clickToDeact()}>
                    <svg className="profile__icon profile__icon--small mr-1" dangerouslySetInnerHTML={{__html: utils.use('archive')}} />
                    Deactivate
                </button>
            );
            break;
        case 'remove': 
            btnView = (
                <button className="profile__btn profile__btn--red profile__btn--control">
                    <svg className="profile__icon profile__icon--small mr-1" dangerouslySetInnerHTML={{__html: utils.use('trash-2')}} />
                    Remove
                </button>
            );
            break;
        default:
            btnView = <button className="profile__btn profile__btn--activate profile__btn--control">Activate</button>;
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
                <div className="d-flex fdc profile__ad-main" data-premium={props.el.premium}>
                    <span className="profile__ad-title d-flex sb ac">
                        {props.el.title}
                        <span className="badge w-max profile__ad-badge">Promoted</span>
                    </span>
                    <span className="profile__ad-title--price-tag mt-1 mb-5 w-max">{props.el.price}</span>
                </div>
                <div className="profile__ad-group">
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('clock')}} />
                        {props.el.date}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('map-pin')}} />
                        {props.el.location}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('eye')}} />
                        167
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('phone')}} />
                        45
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('heart')}} />
                        32
                    </span>
                </div>
                <div className="profile__ad-group mt-1 sb">
                    <div className="d-flex">
                        <button className="profile__btn profile__btn--control">
                            <svg className="profile__icon profile__icon--small mr-1" dangerouslySetInnerHTML={{__html: utils.use('edit-2')}} />
                            Edit
                        </button>
                        <Link to="/" className="profile__btn profile__btn--control">
                            <svg className="profile__icon profile__icon--small mr-1" dangerouslySetInnerHTML={{__html: utils.use('eye')}} />
                            View
                        </Link>
                        {/* <button className="profile__btn profile__btn--red profile__btn--control">
                            <svg className="profile__icon profile__icon--small mr-1" dangerouslySetInnerHTML={{__html: utils.use('archive')}} />
                            Deactivate
                        </button> */}
                    
                    </div>
                    {btnView}
                </div>
            </div>
        </div>
    );
}

export const AdFull = (props) => {


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
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('clock')}} />
                        {props.el.date}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('map-pin')}} />
                        {props.el.location}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-details">
                        <svg className="profile__icon profile__icon--det profile__icon--small mr-5" dangerouslySetInnerHTML={{__html: utils.use('eye')}} />
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
                            <svg className="profile__icon profile__icon--det profile__icon--small icon" dangerouslySetInnerHTML={{__html: utils.use('heart')}} />
                            <Tooltip>Remove from favourites</Tooltip>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};