import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Language from '../components/Language';
import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';
import Dropdown from '../components/Dropdown';
import Categories from '../components/Categories';
import Backdrop from '../UI/Backdrop';

class Navigation extends PureComponent {
    state = {
        toggleLogo: false,
        signedIn: true,
        inputFocused: false,
        showCat: false
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.url !== this.props.match.url) this.setState({ showCat: false });
    }

    onFocus = () => this.setState({ inputFocused: true });
    onBlur = () => this.setState({ inputFocused: false });

    onOpenCategories = () => this.setState({ showCat: true });
    onCloseCategories = () => this.setState({ showCat: false });

    render() {
        const signClass = ['navigation__item navigation__item--hoverable'];
        if (this.state.inputFocused) signClass.push('navigation__item--keep');

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
                <button className="dropdown__btn dropdown__btn--grey">Log out</button>
            </Dropdown>
        );
        if (!this.state.signedIn) {
            userDrop = (
                <Dropdown class="dropdown--w-auto">
                    <div className="dropdown__link dropdown__link--col">
                        <p className="navigation__info navigation__info--bold">Sign in</p>
                        <form className="navigation__form">
                            <input className="navigation__input input" type="text" placeholder="Phone or email" onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} />
                            <input className="navigation__input input" type="password" placeholder="Password" onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} />
                            <button className="btn btn__primary dropdown__btn--sign" onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} >Sign in</button>
                            <p className="navigation__info">Do not have an account? <Link to="/signup" className="navigation__info--high">Sign up</Link></p>
                        </form>
                    </div>
                </Dropdown>
            );
        }

        return (
            <React.Fragment>
                {this.state.showCat &&
                    <div className="categories__container">
                        <Backdrop z={96} click={this.onCloseCategories} />
                        <Categories class="categories--fix" clickItem={this.onCloseCategories} />
                    </div>
                }
                <header className="navigation">
                    <div className="container">
                        <nav role="navigation" className="navigation__wrapper">
                            <div className="navigation__list">
                                <Logo classOver="navigation__item" classImg="logo__figure--nav" />
                                <Language dropClass="dropdown--close dropdown--left-fix" />
                            </div>
                            <div className="navigation__list">
                                <div className="navigation__item">
                                    <Link to="/user/favorites" className="navigation__link">
                                        <span className="navigation__title navigation__title--user">Favorites</span>
                                        <div className="d-flex ac jc">
                                            <svg className="navigation__icon m-0" dangerouslySetInnerHTML={{__html: utils.use('folder')}} />
                                            {this.props.favorites.length > 0 && <div className="ml-1">{this.props.favorites.length}</div>}
                                        </div>
                                    </Link>
                                </div>
                                <div className={signClass.join(' ')}>
                                    <Link to={this.state.signedIn ? '/user/profile' : '/signin'} className="navigation__link">
                                        <svg className="navigation__icon navigation__icon--arrow" dangerouslySetInnerHTML={{__html: utils.use('chevron-down')}} />
                                        <span className="navigation__title navigation__title--user">{this.state.signedIn ? 'My profile' : 'Sign in'}</span>
                                        <div className="navigation__iconbox">
                                            <svg className="navigation__icon navigation__icon--abs navigation__icon--white" dangerouslySetInnerHTML={{__html: utils.use('user')}} />
                                            {this.state.signedIn && <span className="message-badge__empty"></span>}
                                        </div>
                                    </Link>
                                    {userDrop}
                                </div>
                                
                                {isNotPost && 
                                    <Link to="/post-new" className="btn btn__primary navigation__btn">
                                        <span className="navigation__title navigation__title--white">Advert</span>
                                        <svg className="navigation__icon navigation__icon--white" dangerouslySetInnerHTML={{__html: utils.use('plus')}} />
                                    </Link>
                                }
                                {isNotHome && 
                                    <button className="btn btn__secondary navigation__btn" onClick={() => this.onOpenCategories()}>
                                        <span className="navigation__title navigation__title--white">Categories</span>
                                        <svg className="navigation__icon navigation__icon--white" dangerouslySetInnerHTML={{__html: utils.use('menu')}} />
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
    favorites: state.data.favoriteAds
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Navigation)));