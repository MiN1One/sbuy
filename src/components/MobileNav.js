import React, { useEffect, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Language from './Language';

const MobileNav = (props) => {
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
    const prevUrl = useRef();
    useEffect(() => {
        prevScroll.current = scroll;
        prevUrl.current = props.location.pathname;
    });

    const { pathname } = props.location;
    
    useEffect(() => {
        if (prevUrl.current !== props.location.pathname) setSideNav(false);
        console.log(pathname)
    }, [pathname]);

    const burgerClass = ['m-nav__burger'];
    if (sideNav) {
        burgerClass.push('m-nav__burger--open');
        document.documentElement.style.overflow = 'hidden';
    } else document.documentElement.style.overflow = 'auto';

    const navBottomClass = ['m-nav__bottom'];
    if (prevScroll.current < scroll) navBottomClass.push('m-nav__bottom--hide');
    
    let view = (
        <React.Fragment>
            <Link to="/signin" className="m-nav__link">Sign in</Link>
        </React.Fragment>
    );
    if (props.token) {

    }

    return (
        <nav role="navigation" className="m-nav">
            <div className={burgerClass.join(' ')}>
                <div className="container">
                    <div className="m-nav__head">
                        <button className="m-nav__btn" onClick={() => setSideNav(false)}>
                            <utils.use styleClass="icon icon--dark" svg="x" />
                        </button>
                        <Logo />
                    </div>
                    <div className="m-nav__body">
                        
                    </div>
                    <div className="m-nav__footer">
                        <div className="container">
                            <div className="d-flex ac jc">
                                {!props.token 
                                    ? <button className="modal__btn">Sign in</button> 
                                    : <button className="modal__btn">Advert</button>
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
                                <utils.use styleClass="icon icon--dark" svg="user" />
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
                        <Link to="/user/favorites" className="m-nav__link">
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