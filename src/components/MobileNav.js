import React, { useEffect, useRef, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';

const MobileNav = () => {
    const [sideNav, setSideNav] = useState(false);
    const [scroll, setScroll] = useState(0);

    const trackScroll = () => {
        setTimeout(() => {
            setScroll(document.documentElement.scrollTop);
        }, 250);
    };

    useEffect(() => {
        document.addEventListener('scroll', trackScroll);
        
        return () => document.removeEventListener('scroll', trackScroll);
    }, []);

    const prevScroll = useRef();
    useEffect(() => {
        prevScroll.current = scroll;
    });

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
                <div className="container">
                    <div className="m-nav__head">
                        <button className="m-nav__btn" onClick={() => setSideNav(false)}>
                            <utils.use styleClass="icon icon--dark" svg="x" />
                        </button>
                    </div>
                </div>
                <div className="m-nav__body">

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
                        <Link to="/user/profile" className="m-nav__link">
                            <utils.use styleClass="icon icon--dark" svg="user" />
                            My profile
                        </Link>
                        <button className="m-nav__link">
                            <utils.use styleClass="icon icon--dark" svg="search" />
                            Search
                        </button>
                        <Link to="/post-new" className="m-nav__link">
                            <utils.use styleClass="icon icon--dark" svg="plus" />
                            Advert
                        </Link>
                        <Link to="/user/favorites" className="m-nav__link">
                            <utils.use styleClass="icon icon--dark" svg="mail" />
                            {/* <FaRegHeart className="icon icon--dark" /> */}
                            Messages
                        </Link>
                        <Link to="/user/favorites" className="m-nav__link">
                            <utils.use styleClass="icon icon--dark" svg="folder" />
                            {/* <FaRegHeart className="icon icon--dark" /> */}
                            Favorites
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(MobileNav);