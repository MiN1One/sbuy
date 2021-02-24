import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, withRouter } from 'react-router-dom';
import $ from 'jquery';

import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Language from './Language';

const MobileNav = (props) => {
    const [sideNav, setSideNav] = useState(false);
    const [scroll, setScroll] = useState(0);
    const location = useLocation();
    const params = useParams();

    const trackScroll = () => setScroll(document.documentElement.scrollTop);
    function slideItems() {
        const slideLink = Array.from(this.querySelectorAll('.modal__item--slide'));
        if ($(slideLink).is(':hidden')) $(slideLink).slideDown({ duration: 250 });
        else $(slideLink).slideUp({ duration: 250 });
    };

    useEffect(() => {
        Array.from(document.querySelectorAll('.modal__item--drop')).forEach(el => {
            el.addEventListener('click', slideItems);
        });

        document.addEventListener('scroll', trackScroll);
        return () => {
            document.removeEventListener('scroll', trackScroll);
            Array.from(document.querySelectorAll('.modal__item--drop')).forEach(el => {
                el.removeEventListener('click', slideItems);
            })
        } 
    }, []);

    const prevScroll = useRef();
    useEffect(() => prevScroll.current = scroll);

    useEffect(() => {
        setSideNav(false);
        if (utils.getQueryParamValue('cat')) prevScroll.current = -1; 
    }, [location.pathname]);

    useEffect(() => {
        Array.from(document.querySelectorAll('.modal__item--slide')).forEach(el => {
            if ($(el).is(':visible')) $(el).slideUp();
        });
    }, [sideNav]);

    const burgerClass = ['m-nav__burger'];
    if (sideNav) {
        burgerClass.push('m-nav__burger--open');
        document.documentElement.style.overflow = 'hidden';
    } else document.documentElement.style.overflow = 'auto';

    const navBottomClass = ['m-nav__bottom'];
    if (prevScroll.current < scroll) navBottomClass.push('m-nav__bottom--hide');

    return (
        <nav role="navigation" className="m-nav">
            <div className={burgerClass.join(' ')}>
                <div className="container h-100">
                    <div className="m-nav__head">
                        <Logo />
                        <button onClick={() => setSideNav(false)}>
                            <utils.use styleClass="icon icon--dark" svg="x" />
                        </button>
                    </div>
                    <div className="modal__body">
                        <ul className="modal__list modal__list--wfoot">
                            <li className="modal__item">
                                <Link to="/all" className="m-nav__link">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="icon--7 icon--dark mr-1" svg="menu" />
                                        Categories
                                    </div>
                                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                </Link>
                            </li>
                            {props.token && 
                                <>
                                    <li className="modal__item modal__item--drop">
                                        <div className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="user" />
                                                My profile
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-down" />
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/profile" className="m-nav__link">
                                                Main
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/company" className="m-nav__link">
                                                Company
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="modal__item modal__item--drop">
                                        <div className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="layout" />
                                                My ads
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-down" />
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/ads" className="m-nav__link">
                                                Active
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/ads/inactive" className="m-nav__link">
                                                Inactive
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/ads/promoted" className="m-nav__link">
                                                Promoted
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="modal__item modal__item--drop">
                                        <div className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="mail" />
                                                Messages
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-down" />
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/messages" className="m-nav__link">
                                                Inbox
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/messages/sentbox" className="m-nav__link">
                                                Sentbox
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/messages/spam" className="m-nav__link">
                                                Spam
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/favorites" className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="heart" />
                                                Favorites
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/settings" className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="settings" />
                                                Settings
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/payments" className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="credit-card" />
                                                Payments
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </Link>
                                    </li>
                                    <li className="modal__item modal__item--last">
                                        <button className="m-nav__link" onClick={() => props.onLogOut()}>
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="log-out" />
                                                Log out
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </button>
                                    </li>
                                </>
                            }
                            <Language />
                            <li className="modal__item">
                                <Link to="/about#sitemap" className="m-nav__link">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="icon--7 icon--dark mr-1" svg="map" />
                                        Sitemap
                                    </div>
                                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                </Link>
                            </li>
                            <li className="modal__item">
                                <Link to="/about" className="m-nav__link">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="icon--7 icon--dark mr-1" svg="book" />
                                        About
                                    </div>
                                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="modal__footer">
                        <div className="container h-100">
                            <div className="d-flex ac jc h-100">
                                {!props.token 
                                    ? <Link to="/signin" className="modal__btn">Sign in</Link> 
                                    : <Link to="/post-new" className="modal__btn">Advert</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-nav__top">
                <div className="container h-100">
                    <div className="m-nav__wrapper">
                        <button className="m-nav__btn" onClick={() => setSideNav(true)}>
                            <utils.use styleClass="icon icon--dark" svg="menu" />
                        </button>
                        <Logo classImg="logo__figure--nav" />
                    </div>
                </div>
            </div>
            {!location.pathname.includes('post-new') &&
                <div className={navBottomClass.join(' ')}>
                    <div className="container h-100">
                        <div className="m-nav__wrapper">
                            {props.token 
                                ? <Link to="/user/profile" className="m-nav__link">
                                    <utils.use styleClass="icon icon--dark" svg="user" />
                                    My profile
                                </Link>
                                : <Link to="/signin" className="m-nav__link">
                                    <utils.use styleClass="icon icon--dark" svg="log-in" />
                                    Sign in
                                </Link>
                            }
                            <button className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="search" />
                                Search
                            </button>
                            <Link to="/post-new" className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="plus" />
                                Advert
                            </Link>
                            <Link to="/user/messages" className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="mail" />
                                Messages
                            </Link>
                            <Link to="/user/favorites" className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="folder" />
                                Favorites
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </nav>
    );
};

export default React.memo(MobileNav);