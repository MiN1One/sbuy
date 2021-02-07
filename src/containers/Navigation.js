import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Language from '../components/Language';
import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Dropdown from '../components/Dropdown';
import Categories from '../components/Categories';
import Backdrop from '../UI/Backdrop';
import * as actions from '../store/actions';
import axios from 'axios';

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
        const signClass = ['nav__item nav__item--hoverable'];
        if (this.state.inputFocused) signClass.push('nav__item--keep');

        const pathname = this.props.location.pathname;
        const isNotHome = pathname !== '/' && pathname !== '/post-new';
        const isNotPost = !pathname.includes('/post-new');

        let userDrop = (
            <Dropdown class="dropdown--right-fix">
                <p className="dropdown__title">Profile:</p>
                <ul className="dropdown__list">
                    <li className="dropdown__item">
                        <Link to="/user/profile" className="dropdown__link message-badge">
                            My profile
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/ads" className="dropdown__link message-badge">
                            My Ads
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/messages" className="dropdown__link message-badge">
                            Messages
                            <span className="message-badge__counter">3</span>
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/settings" className="dropdown__link message-badge">
                            Settings
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/payments" className="dropdown__link message-badge">
                            Payments
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/favorites" className="dropdown__link message-badge">
                            Favorites
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                    <li className="dropdown__item">
                        <Link to="/user/promotions" className="dropdown__link message-badge">
                            Promotions
                            {/* <span className="message-badge__counter"></span> */}
                        </Link>
                    </li>
                </ul>
                <button className="dropdown__btn dropdown__btn--grey" onClick={() => this.props.onLogOut()}>Log out</button>
            </Dropdown>
        );
        if (!this.props.token) {
            userDrop = (
                <Dropdown class="dropdown--w-auto">
                    <div className="dropdown__link dropdown__link--col">
                        <p className="nav__info nav__info--bold">Sign in</p>
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
                            <button className="btn btn__primary dropdown__btn--sign" onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} >Sign in</button>
                            <p className="nav__info">Do not have an account? <Link to="/signup" className="nav__info--high">Sign up</Link></p>
                        </form>
                    </div>
                </Dropdown>
            );
        }

        return (
            <React.Fragment>
                {this.state.showCat &&
                    <div className="cat__container">
                        <Backdrop z={96} click={this.onCloseCategories} />
                        <Categories class="cat--fix" clickItem={this.onCloseCategories} />
                    </div>
                }
                <header className="nav">
                    <div className="container">
                        <nav role="navigation" className="nav__wrapper">
                            <div className="nav__list">
                                <Logo classOver="nav__item" classImg="logo__figure--nav" />
                                <Language dropClass="dropdown--close dropdown--left-fix" />
                            </div>
                            <div className="nav__list">
                                <div className="nav__item">
                                    <Link to="/user/favorites" className="nav__link">
                                        <span className="nav__title nav__title--user">Favorites</span>
                                        <div className="d-flex ac jc">
                                            <utils.use styleClass="nav__icon m-0" svg="folder" />
                                            {this.props.favorites.length > 0 && <div className="ml-5">{this.props.favorites.length}</div>}
                                        </div>
                                    </Link>
                                </div>
                                <div className={signClass.join(' ')}>
                                    <Link to={this.props.token ? '/user/profile' : '/signin'} className="nav__link">
                                        <utils.use styleClass="nav__icon nav__icon--arrow" svg="chevron-down" />
                                        <span className="nav__title nav__title--user">{this.props.token ? 'My profile' : 'Sign in'}</span>
                                        <div className="nav__iconbox">
                                            <utils.use styleClass="nav__icon nav__icon--abs nav__icon--white" svg="user" />
                                            {this.props.token && <span className="message-badge__empty"></span>}
                                        </div>
                                    </Link>
                                    {userDrop}
                                </div>
                                
                                {isNotPost && 
                                    <Link to="/post-new" className="btn btn__primary nav__btn">
                                        <span className="nav__title nav__title--white">Advert</span>
                                        <utils.use styleClass="nav__icon nav__icon--white" svg="plus" />
                                    </Link>
                                }
                                {isNotHome && 
                                    <button className="btn btn__secondary nav__btn" onClick={() => this.onOpenCategories()}>
                                        <span className="nav__title nav__title--white">Categories</span>
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

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    favorites: state.user.favorites,
    token: state.user.token
});

const mapDispatchToProps = (dispatch) => ({
    onLogOut: () => dispatch(actions.logOut()),
    onLogin: (token) => dispatch(actions.logIn(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Navigation)));