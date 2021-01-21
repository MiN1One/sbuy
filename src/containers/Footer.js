import React from 'react';

import Logo from '../components/Logo';
import Language from '../components/Language';

import * as utils from '../utilities/utilities';

const Footer = props => {

    const year = new Date().getFullYear();

    const navs = ['Help', 'Enterprise Adverts', 'Terms of use', 'Privacy Policy', 'SBUY Guide', 'Security measures', 'Site map', 'Map of regions', 'Career', 'Feedback'];

    const navItems = navs.map((el, i) => {
        return (
            <li className="footer__item" key={i}>
                <a href="#" className="footer__link">{el}</a>
            </li>
        );
    });

    return (
        <footer className="footer">
            <div className="footer__head">
                <div className="container">
                    <div className="footer__headwrap">
                        <div className="navigation__item">
                            <svg className="footer__icon" dangerouslySetInnerHTML={{__html: utils.use('home')}} />
                            <h5 className="footer__heading">Home</h5>
                        </div>
                        <Language class="navigation__item navigation__item--drop" dropClass="dropdown--right-fix" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__body">
                        <div div className="footer__group">
                            <Logo class="footer__logo" />
                            <ul className="footer__list">
                                {navItems}
                            </ul>
                            <p className="footer__info">
                                For all questions, you can contact us<br/> at any convenient time by phone or email<br/>
                                +998 (71) 240-60-50 <br/>
                                sbuy@retail.uz
                            </p>
                        </div>
                        <p className="footer__info">{year} SBUY&copy;</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);