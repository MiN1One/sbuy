import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Language from '../components/Language';
import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

const AsyncCategoriesFull = asyncComponent(() => import('../components/CategoriesFull'));

class Navigation extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            toggleLogo: false,
            inputFocused: false,
            showCat: false,
            error: null
        }

        this.mainInputRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.url !== this.props.match.url) this.setState({ showCat: false });
    }

    onFocus = () => this.setState({ inputFocused: true });
    onBlur = () => this.setState({ inputFocused: false });

    onOpenCategories = () => this.setState({ showCat: true });
    onCloseCategories = () => this.setState({ showCat: false });

    onLogin = (e) => {
        e.preventDefault();
        const mainInput = this.mainInputRef.current;
        const password = this.passwordRef.current;

        if ((password.value && mainInput.value) !== '') {
            const data = {
                phone: mainInput.value,
                password: password.value
            };
            axios.post('http://api.soybaliq.uz/api/auth/login', data)
                .then(res => {
                    const { access_token } = res.data;
                    this.props.onLogin(access_token);
                    this.setState({ error: null });
                    this.setState({ inputFocused: false });
                }).catch(er => {
                    console.log(er);
                    this.setState({ error: er.message });
                });
        }
    }

    render() {
        // ---------- TRANSLATIONS VIA PROPS ---------
        const t = this.props.base;

        const signClass = ['nav__item nav__item--hoverable'];
        if (this.state.inputFocused) signClass.push('nav__item--keep');

        const pathname = this.props.location.pathname;
        const isNotHome = pathname !== '/' && pathname !== '/post-new';
        const isNotPost = !pathname.includes('/post-new');

        let userDrop = (
            <Dropdown class="dropdown--right-fix">
                <p className="dropdown__title">{t.profile}:</p>
                <ul className="dropdown__list">
                    <li className="dropdown__item">
                        <Link to="/user/my_profile" className="dropdown__link message-badge">
                            {t.my_profile}
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/my_ads" className="dropdown__link message-badge">
                            {t.my_ads}
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/messages" className="dropdown__link message-badge">
                            {t.messages}
                            <span className="message-badge__counter">3</span>
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/settings" className="dropdown__link message-badge">
                            {t.settings}
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/payments" className="dropdown__link message-badge">
                            {t.payments}
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/favorites" className="dropdown__link message-badge">
                            {t.favorites}
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/promotions" className="dropdown__link message-badge">
                            {t.promotions}
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                </ul>
                <button 
                    className="dropdown__btn dropdown__btn--grey" 
                    onClick={() => this.props.onLogOut()}>
                        {t.logout}
                </button>
            </Dropdown>
        );
        if (!this.props.token) {
            userDrop = (
                <Dropdown class="dropdown--w-auto">
                    <div className="dropdown__link dropdown__link--col">
                        <p className="nav__info nav__info--bold">{t.sign}</p>
                        <form className="nav__form" onSubmit={(e) => this.onLogin(e)}>
                            <input 
                                className="nav__input input" 
                                type="text" placeholder="Phone or email" 
                                onFocus={() => this.onFocus()} 
                                onBlur={() => this.onBlur()} 
                                ref={this.mainInputRef} />
                            <input 
                                className="nav__input input" 
                                type="password" placeholder="Password" 
                                onFocus={() => this.onFocus()} 
                                onBlur={() => this.onBlur()} 
                                ref={this.passwordRef} />
                            <button className="btn btn__primary dropdown__btn--sign" onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} >{t.sign}</button>
                            <p className="nav__info">Do not have an account? <Link to="/signup" className="nav__info--high">Sign up</Link></p>
                        </form>
                    </div>
                </Dropdown>
            );
        }

        return (
            <React.Fragment>
                {this.state.showCat &&
                    <AsyncCategoriesFull {...this.props} close={this.onCloseCategories} />
                }
                <header className="nav">
                    <div className="container">
                        <nav role="navigation" className="nav__wrapper">
                            <div className="nav__list">
                                <Logo classOver="nav__item" classImg="logo__figure--nav" />
                                <Language class="nav__item--lang" dropClass="dropdown--close dropdown--left-fix" />
                            </div>
                            <div className="nav__list">
                                <div className="nav__item">
                                    <Link to="/user/favorites" className="nav__link">
                                        <span className="nav__title nav__title--user">{t.favorites}</span>
                                        <div className="d-flex ac jc">
                                            <utils.use styleClass="nav__icon m-0" svg="folder" />
                                            {this.props.favorites.length > 0 && <div className="ml-5">{this.props.favorites.length}</div>}
                                        </div>
                                    </Link>
                                </div>
                                <div className={signClass.join(' ')}>
                                    <Link to={this.props.token ? '/user/my_profile' : '/signin'} className="nav__link">
                                        <utils.use styleClass="nav__icon nav__icon--arrow" svg="chevron-down" />
                                        <span className="nav__title nav__title--user">{this.props.token ? t.my_profile : t.sign}</span>
                                        <div className="nav__iconbox">
                                            <utils.use styleClass="nav__icon nav__icon--abs nav__icon--white" svg="user" />
                                            {this.props.token && <span className="message-badge__empty"></span>}
                                        </div>
                                    </Link>
                                    {userDrop}
                                </div>
                                
                                {isNotPost && 
                                    <Link to="/post-new" className="btn btn__primary nav__btn">
                                        <span className="nav__title nav__title--white">{t.advert}</span>
                                        <utils.use styleClass="nav__icon nav__icon--white" svg="plus" />
                                    </Link>
                                }
                                {isNotHome && 
                                    <button className="btn btn__secondary nav__btn" onClick={() => this.onOpenCategories()}>
                                        <span className="nav__title nav__title--white">{t.categories}</span>
                                        <utils.use styleClass="nav__icon nav__icon--white" svg="menu" />
                                    </button>
                                }
                            </div>
                        </nav>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

export default withRouter(React.memo(Navigation));