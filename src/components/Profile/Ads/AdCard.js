import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as utils from '../../../utilities/utilities';
import Tooltip from '../../../UI/Tooltip';
import Modal from '../../Modal';

export const AdsCard = (props) => {
    const [modal, setModal] = useState(null);
    const mediaMid = window.matchMedia('(max-width: 61.25em)');

    const onOpenDetails = (ad) => {
    };

    const onClickDeactivate = (id) => {

    };
    
    const onClickRemove = (id) => {

    };

    const onClickActivate = (id) => {

    };

    let btnView;
    switch (props.view) {
        case 'active': 
            btnView = (
                <div className="d-flex">
                    {!props.el.premium && 
                        <Link 
                            to="/ads/promote" 
                            className="profile__btn profile__btn--activate profile__btn--control" 
                            onClick={() => onClickActivate(props.el.id)}>
                                <utils.use styleClass="profile__icon profile__icon--small" svg="check" />
                                <span className="profile__btn-title">Promote</span>
                        </Link>
                    }
                    <button className="profile__btn profile__btn--red profile__btn--control" onClick={() => onClickDeactivate(props.el.id)}>
                        <utils.use styleClass="profile__icon profile__icon--small" svg="x" />
                        <span className="profile__btn-title">Deactivate</span>
                    </button>
                </div>
            );
            break;
        case 'remove': 
            btnView = (
                <button className="profile__btn profile__btn--red profile__btn--control" onClick={() => onClickRemove(props.el.id)}>
                    <utils.use styleClass="profile__icon profile__icon--small" svg="x" />
                    <span className="profile__btn-title">Remove</span>
                </button>
            );
            break;
        default:
            btnView = (
                <button className="profile__btn profile__btn--activate profile__btn--control" onClick={() => onClickActivate(props.el.id)}>
                    <utils.use styleClass="profile__icon profile__icon--small" svg="check" />
                    <span className="profile__btn-title">Activate</span>
                </button>
            );
    }

    return (
        <>
            {modal && 
                <Modal 
                    title="Details"
                    click={() => setModal(false)}>
                        <div className="modal__body">
                            <ul className="modal__list">
                                <li className="modal__item">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="clock" />
                                        Published
                                    </div>
                                    {props.el.date}
                                </li>
                                <li className="modal__item">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="map-pin" />
                                        Location
                                    </div>
                                    {utils.limitStrAny(props.el.location, 15, false)}
                                </li>
                                <li className="modal__item">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="eye" />
                                        Number of views
                                    </div>
                                    167
                                </li>
                                <li className="modal__item">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="phone" />
                                        Phone views
                                    </div>
                                    45
                                </li>
                                <li className="modal__item">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="heart" />
                                        Number of likes
                                    </div>
                                    32
                                </li>
                            </ul>
                        </div>
                </Modal>
            }
            <div 
                className="profile__ad" 
                tabIndex="0" 
                key={props.el.id} 
                onClick={() => {
                    if (mediaMid.matches) setModal(true);
            }}>
                <figure className="profile__ad-figure">
                    <LazyLoadImage 
                        className="profile__ad-img" 
                        src={props.el.img[0]} 
                        alt={props.el.title} 
                        width="100%" 
                        height="100%" />
                </figure>
                <div className="profile__ad-left">
                    <span className="profile__ad-title d-flex sb ac">
                        {utils.limitStrAny(props.el.title, 25, true)}
                        {props.el.premium && <span className="badge w-max profile__ad-badge">TOP</span>}
                    </span>
                    <span className="profile__ad-title--price-tag w-max">{props.el.price}</span>
                    <div className="profile__ad-group profile__ad-group--details">
                        <span className="profile__ad-detail">
                            <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="clock" />
                            {props.el.date}
                        </span>
                        <span className="profile__ad-separator">&bull;</span>
                        <span className="profile__ad-detail">
                            <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="map-pin" />
                            {utils.limitStrAny(props.el.location, 15, false)}
                        </span>
                        <span className="profile__ad-separator">&bull;</span>
                        <span className="profile__ad-detail">
                            <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="eye" />
                            167
                        </span>
                        <span className="profile__ad-separator">&bull;</span>
                        <span className="profile__ad-detail">
                            <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="phone" />
                            45
                        </span>
                        <span className="profile__ad-separator">&bull;</span>
                        <span className="profile__ad-detail">
                            <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="heart" />
                            32
                        </span>
                    </div>
                    <div className="profile__ad-group sb">
                        <div className="d-flex">
                            <Link to={`/user/my_ads/edit/${props.el.id}`} className="profile__btn profile__btn--control">
                                <utils.use styleClass="profile__icon profile__icon--small" svg="edit-2" />
                                <span className="profile__btn-title">Edit</span>
                            </Link>
                            <Link to={`/user/my_ads/view/${props.el.id}`} className="profile__btn profile__btn--control">
                                <utils.use styleClass="profile__icon profile__icon--small" svg="eye" />
                                <span className="profile__btn-title">View</span>
                            </Link>
                        </div>
                        {btnView}
                    </div>
                </div>
            </div>
        </>
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
                    <span className="profile__ad-detail">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="clock" />
                        {props.el.date}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-detail">
                        <utils.use styleClass="profile__icon profile__icon--det profile__icon--small" svg="map-pin" />
                        {props.el.location}
                    </span>
                    <span className="profile__ad-separator">&bull;</span>
                    <span className="profile__ad-detail">
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