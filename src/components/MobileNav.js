import React, { useEffect, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Language from './Language';

const MobileNav = (props) => {
    const [sideNav, setSideNav] = useState(false);
    const [scroll, setScroll] = useState(0);

    const trackScroll = () => setScroll(document.documentElement.scrollTop);

    useEffect(() => {
        document.addEventListener('scroll', trackScroll);
        
        return () => document.removeEventListener('scroll', trackScroll);
    }, []);

    const prevScroll = useRef();
    useEffect(() => prevScroll.current = scroll);

    useEffect(() => {
        setSideNav(false);
    }, [props.location]);

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
                        <ul className="modal__list" style={{ height: 'calc(100% - 10rem - 6rem)' }}>
                            <li className="modal__item">
                                <Link to="/all" className="m-nav__link">
                                    Categories
                                </Link>
                            </li>
                            {props.token && 
                                <>
                                    <li className="modal__item">
                                        <Link to="/user/profile" className="m-nav__link">
                                            My profile
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/ads" className="m-nav__link">
                                            My ads
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/messages" className="m-nav__link">
                                            Messages
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/favorites" className="m-nav__link">
                                            Favorites
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/settings" className="m-nav__link">
                                            Settings
                                        </Link>
                                    </li>
                                    <li className="modal__item">
                                        <Link to="/user/payments" className="m-nav__link">
                                            Payments
                                        </Link>
                                    </li>
                                </>
                            }
                            <Language />
                            <li className="modal__item">
                                <Link to="/info#sitemap" className="m-nav__link">
                                    Sitemap
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
        </nav>
    );
};

export default React.memo(withRouter(MobileNav));