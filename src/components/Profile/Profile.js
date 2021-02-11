import React, { PureComponent } from 'react';
import { withRouter, Link, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FcMediumPriority } from 'react-icons/fc';
import $ from 'jquery';

import { User, Company } from './Main';
import * as utils from '../../utilities/utilities';
import { ActiveAds, InactiveAds, PromotedAds } from './Ads/Ads';
import Favorites from './Favourites';
import Settings from './Settings';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Payments from './Payments';
import { Inbox, Sentbox, Spam } from './Messages';
import * as actions from '../../store/actions';
import LoadingScreen from '../../UI/LoadingScreen';
import Error from '../Error';

const AsyncAdview = asyncComponent(() => import('../../components/Adview'));
const AsyncPost = asyncComponent(() => import('../../containers/Post'));

class Profile extends PureComponent {
    constructor(props) {
        super(props);

        this.subAdsList = React.createRef();
        this.subMessagesList = React.createRef();
        this.subProfileList = React.createRef();

        this.slideSubLists = this.slideSubLists.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);

        if (!this.props.token && (this.props.match.params.section !== 'favorites')) 
            this.props.history.push('/signin');
    }
    
    componentDidMount() {
        this.slideSubLists();
    }

    componentDidUpdate(prevProps) {
        this.slideSubLists();
        if (!this.props.token && (this.props.match.params.section !== 'favorites')) 
            this.props.history.push('/signin');
        if (this.props.match !== prevProps.match) this.scrollToTop();
    }

    scrollToTop() { document.documentElement.scrollTop = 0; }

    slideSubLists() {
        if (this.props.match.params.section === 'ads') $(this.subAdsList.current).slideDown({ duration: 300 });
        else $(this.subAdsList.current).slideUp({ duration: 300 });
        
        if (this.props.match.params.section === 'profile') $(this.subProfileList.current).slideDown({ duration: 300 });
        else $(this.subProfileList.current).slideUp({ duration: 300 });

        if (this.props.match.params.section === 'messages') $(this.subMessagesList.current).slideDown({ duration: 300 });
        else $(this.subMessagesList.current).slideUp({ duration: 300 });
    }
    
    render() {
        const notFound = (
            <div className="profile__empty profile__empty--err">
                <div>
                    <FcMediumPriority className="profile__icon--large mb-1" />
                    Requested page is not found
                    <div className="e__bottom mt-2">
                        <Link className="btn btn__white mr-15" to="/user/profile">
                            <utils.use styleClass="icon icon--dark mr-5" svg="user" />
                            My profile
                        </Link>
                        <Link className="btn btn__white" onClick={() => this.props.history.goBack()}>
                            <utils.use styleClass="e__i e__i--sm" svg="corner-up-left" />
                            Go back
                        </Link>
                    </div>
                </div>
            </div>
        );

        const activeAdsCount = this.props.data.length;
        const promotedAdsCount = this.props.data.filter(el => el.premium === true).length;
        const inactiveAdsCount = this.props.data.length;

        return (
            <div className="profile">
                <div className="container">
                    <div className="profile__wrapper">
                        <div className="profile__head">
                            <h2 className="heading heading__2">Profile</h2>
                            <div className="profile__nav">
                                Profile nav
                            </div>
                        </div>
                        <div className="profile__main">
                            {this.props.token &&
                                <div className="profile__group profile__panel">
                                    <h5 className="profile__link profile__link--heading">{this.props.match.params.section}</h5>
                                    <ul className="profile__list">
                                        <li className="profile__item">
                                            <NavLink to="/user/profile" className="profile__link" activeClassName="profile__link--active-cursored">
                                                <utils.use styleClass="profile__icon" svg="user" />
                                                Profile
                                            </NavLink>
                                            <div className="profile__item profile__item--sub" ref={this.subProfileList}>
                                                <NavLink to="/user/profile" activeClassName="profile__link--sub-active" className="profile__link message-badge" exact>
                                                    <utils.use styleClass="profile__icon" svg="file-text" />
                                                    Main
                                                </NavLink>
                                                <NavLink to="/user/profile/company" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                    <utils.use styleClass="profile__icon" svg="briefcase" />
                                                    Company
                                                </NavLink>
                                            </div>
                                        </li>
                                        <li className="profile__item">
                                            <NavLink to="/user/ads" activeClassName="profile__link--active-cursored" className="profile__link">
                                                <utils.use styleClass="profile__icon" svg="layout" />
                                                My Ads
                                            </NavLink>
                                            <div className="profile__item profile__item--sub" ref={this.subAdsList}>
                                                <NavLink to="/user/ads" exact activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                    <utils.use styleClass="profile__icon" svg="message-square" />
                                                    Active
                                                    {activeAdsCount > 0 && <span className="message-badge__counter profile__mes-badge">{activeAdsCount}</span>}
                                                </NavLink>
                                                <NavLink to="/user/ads/inactive" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                    <utils.use styleClass="profile__icon" svg="archive" />
                                                    Inactive
                                                    {inactiveAdsCount > 0 && <span className="message-badge__counter profile__mes-badge">{inactiveAdsCount}</span>}
                                                </NavLink>
                                                <NavLink to="/user/ads/promoted" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                    <utils.use styleClass="profile__icon" svg="trending-up" />
                                                    Promoted
                                                    {promotedAdsCount > 0 && <span className="message-badge__counter profile__mes-badge">{promotedAdsCount}</span>}
                                                </NavLink>
                                            </div>
                                        </li>
                                        <li className="profile__item">
                                            <NavLink to="/user/messages" activeClassName="profile__link--active-cursored" className="profile__link">
                                                <utils.use styleClass="profile__icon" svg="mail" />
                                                Messages
                                            </NavLink>
                                            <div className="profile__item profile__item--sub" ref={this.subMessagesList}>
                                                <NavLink to="/user/messages" exact activeClassName="profile__link--sub-active" className="profile__link">
                                                    <utils.use styleClass="profile__icon" svg="inbox" />
                                                    Inbox
                                                </NavLink>
                                                <NavLink to="/user/messages/sentbox" activeClassName="profile__link--sub-active" className="profile__link">
                                                    <utils.use styleClass="profile__icon" svg="check-circle" />
                                                    Sentbox
                                                </NavLink>
                                                <NavLink to="/user/messages/spam" activeClassName="profile__link--sub-active" className="profile__link">
                                                    <utils.use styleClass="profile__icon" svg="trash" />
                                                    Spam
                                                </NavLink>
                                            </div>
                                        </li>
                                        <li className="profile__item">
                                            <NavLink to="/user/favorites" activeClassName="profile__link--active-cursored" className="profile__link">
                                                <utils.use styleClass="profile__icon" svg="heart" />
                                                Favorites
                                            </NavLink>
                                        </li>
                                        <li className="profile__item">
                                            <NavLink to="/user/settings" activeClassName="profile__link--active" className="profile__link">
                                                <utils.use styleClass="profile__icon" svg="settings" />
                                                Settings
                                            </NavLink>
                                        </li>
                                        <li className="profile__item">
                                            <NavLink to="/user/payments" activeClassName="profile__link--active" className="profile__link">
                                                <utils.use styleClass="profile__icon" svg="credit-card" />
                                                Payments
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            }
                            <div className="profile__group profile__header">
                                <Switch>
                                    <Route path="/user/profile" exact>
                                        <User {...this.props} />
                                    </Route>
                                    <Route path="/user/profile/company" exact>
                                        <Company {...this.props} />
                                    </Route>
                                    <Route path="/user/ads" exact>
                                        <ActiveAds {...this.props} />
                                    </Route>
                                    <Route path="/user/ads/inactive" exact>
                                        <InactiveAds {...this.props} />
                                    </Route>
                                    <Route path="/user/ads/promoted" exact>
                                        <PromotedAds {...this.props} />
                                    </Route>
                                    <Route path="/user/messages">
                                        <Inbox {...this.props} />
                                    </Route>
                                    <Route path="/user/conversation" exact>
                                        <Inbox {...this.props} />
                                    </Route>
                                    <Route path="/user/messages/sentbox" exact>
                                        <Sentbox {...this.props} />
                                    </Route>
                                    <Route path="/user/messages/spam" exact>
                                        <Spam {...this.props} />
                                    </Route>
                                    <Route path="/user/favorites" exact>
                                        <Favorites {...this.props} />
                                    </Route>
                                    <Route path="/user/ads/view/:id" exact>
                                        <AsyncAdview />
                                    </Route>
                                    <Route path="/user/ads/edit/:id" exact>
                                        <div className="profile__titlebar">
                                            <h2 className="heading heading__2 profile__heading">Edit your ad</h2>
                                        </div>
                                        <AsyncPost class="post--edit" />
                                    </Route>
                                    <Route path="/user/settings" exact>
                                        <Settings {...this.props} />
                                    </Route>
                                    <Route path="/user/payments" exact>
                                        <Payments {...this.props} />
                                    </Route>
                                    <Route path="*">
                                        {notFound}
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data.data,
    searchLocation: state.localization.searchLocation,
    favorites: state.data.favoriteAds,
    token: state.user.token,
    regions: state.localization.translations.regionsList
});

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(actions.logOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));