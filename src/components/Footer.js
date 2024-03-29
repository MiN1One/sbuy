import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Logo from '../components/Logo';
import Language from '../components/Language';

import * as utils from '../utilities/utilities';

const Footer = props => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    const navs = ['Help', 'Enterprise Adverts', 'Terms of use', 'Privacy Policy', 'SBUY Guide', 'Security measures', 'Site map', 'Map of regions', 'Career', 'Feedback'];

    const navItems = navs.map((el, i) => {
        return (
            <li className="footer__item" key={i}>
                <Link to={`/about#${utils.slug(el)}`} className="footer__link">{el}</Link>
            </li>
        );
    });

    return (
        <footer className="footer">
            <div className="footer__head">
                <div className="container">
                    <div className="footer__headwrap">
                        <div className="d-flex ac">
                            <utils.use styleClass="footer__icon" svg="home" />
                            <h5 className="footer__heading">{t('main.home')}</h5>
                        </div>
                        <Language dropClass="dropdown--close dropdown--right-fix" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__body">
                        <div div className="footer__group">
                            <Logo classOver="footer__logo" />
                            <ul className="footer__list mb-1">
                                <li className="footer__item">
                                    <Link to="about#help" className="footer__link">{t('footer.help')}</Link>
                                </li>
                                <li className="footer__item">
                                    <Link to="about#terms" className="footer__link">{t('footer.terms of use')}</Link>
                                </li>
                                <li className="footer__item">
                                    <Link to="about#eads" className="footer__link">{t('footer.enterprise ads')}</Link>
                                </li>
                                <li className="footer__item">
                                    <Link to="about#feedback" className="footer__link">{t('footer.feedback')}</Link>
                                </li>
                                <li className="footer__item">
                                    <Link to="about#regions" className="footer__link">{t('footer.map of regions')}</Link>
                                </li>
                                <li className="footer__item">
                                    <Link to="about#privacy" className="footer__link">{t('footer.privacy')}</Link>
                                </li>
                                <li className="footer__item">
                                    <Link to="about#vacancy" className="footer__link">{t('footer.career')}</Link>
                                </li>
                            </ul>
                            <p className="footer__info">
                                {t('footer.contact text')}
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