import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, withRouter } from 'react-router-dom';
import $ from 'jquery';

import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Language from './Language';

const MobileNav = (props) => {
    // ---------- TRANSLATIONS VIA PROPS ---------
    const t = props.base;

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
                                        {t.categories}
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
                                                {t.my_profile}
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-down" />
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/my_profile" className="m-nav__link">
                                                {t.main}
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/company" className="m-nav__link">
                                                {t.company}
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="modal__item modal__item--drop">
                                        <div className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="layout" />
                                                {t.my_ads}
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-down" />
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/my_ads" className="m-nav__link">
                                                {t.active}
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/my_ads/inactive" className="m-nav__link">
                                                {t.inactive}
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/my_ads/promoted" className="m-nav__link">
                                                {t.promoted}
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="modal__item modal__item--drop">
                                        <div className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="mail" />
                                                {t.messages}
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-down" />
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/messages" className="m-nav__link">
                                                {t.inbox}
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/messages/sentbox" className="m-nav__link">
                                                {t.sentbox}
                                            </Link>
                                        </div>
                                        <div className="modal__item modal__item--slide">
                                            <Link to="/user/messages/spam" className="m-nav__link">
                                                {t.spam}
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/favorites" className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="heart" />
                                                {t.favorites}
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/settings" className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="settings" />
                                                {t.settings}
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/payments" className="m-nav__link">
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="credit-card" />
                                                {t.payments}
                                            </div>
                                            <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                        </Link>
                                    </li>
                                    <li className="modal__item modal__item--last">
                                        <button className="m-nav__link" onClick={() => props.onLogOut()}>
                                            <div className="d-flex ac">
                                                <utils.use styleClass="icon--7 icon--dark mr-1" svg="log-out" />
                                                {t.logout}
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
                                        {t.sitemap}
                                    </div>
                                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                </Link>
                            </li>
                            <li className="modal__item">
                                <Link to="/about" className="m-nav__link">
                                    <div className="d-flex ac">
                                        <utils.use styleClass="icon--7 icon--dark mr-1" svg="book" />
                                        {t.about}
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
                                    ? <Link to="/signin" className="modal__btn">{t.sign}</Link> 
                                    : <Link to="/post-new" className="modal__btn">{t.advert}</Link>
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
                                ? <Link to="/user/my_profile" className="m-nav__link">
                                    <utils.use styleClass="icon icon--dark" svg="user" />
                                    {t.my_profile}
                                </Link>
                                : <Link to="/signin" className="m-nav__link">
                                    <utils.use styleClass="icon icon--dark" svg="log-in" />
                                    {t.sign}
                                </Link>
                            }
                            <button className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="search" />
                                {t.search}
                            </button>
                            <Link to="/post-new" className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="plus" />
                                {t.advert}
                            </Link>
                            <Link to="/user/messages" className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="mail" />
                                {t.messages}
                            </Link>
                            <Link to="/user/favorites" className="m-nav__link">
                                <utils.use styleClass="icon icon--dark" svg="folder" />
                                {t.favorites}
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </nav>
    );
};

export default React.memo(MobileNav);