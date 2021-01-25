import React, { PureComponent } from 'react';
import { withRouter, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import { User, Company } from './Main';
import * as utils from '../../utilities/utilities';
import { ActiveAds, InactiveAds, PromotedAds } from './Ads/Ads';
import Favorites from './Favourites';
import Settings from './Settings';
import Payments from './Payments';
import Promotions from './Promotions';
import { Inbox, Sentbox, Spam } from './Messages';
import * as actions from '../../store/actions';
import LoadingScreen from '../../UI/LoadingScreen';

class Profile extends PureComponent {
    constructor(props) {
        super(props);

        this.subAdsList = React.createRef();
        this.subMessagesList = React.createRef();
        this.subProfileList = React.createRef();

        this.slideSubLists = this.slideSubLists.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
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

    componentDidMount() {
        this.slideSubLists();
    }
    
    componentDidUpdate(prevProps) {
        this.slideSubLists();
        if (this.props.match !== prevProps.match) this.scrollToTop();
    }

    render() {
        const Profile = (
            <React.Fragment>
                <User {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
                <Company {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
            </React.Fragment>
        );

        const Ads = (
            <React.Fragment>
                <ActiveAds {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
                <InactiveAds {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
                <PromotedAds {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
            </React.Fragment>
        );

        const Messages = (
            <React.Fragment>
                <Inbox {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
                <Sentbox {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
                <Spam {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />
            </React.Fragment>
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
                            <div className="profile__group profile__panel">
                                <h5 className="profile__link profile__link--heading">{this.props.match.params.section}</h5>
                                <ul className="profile__list">
                                    <li className="profile__item">
                                        <NavLink to="/user/profile" className="profile__link" activeClassName="profile__link--active-cursored">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('user')}} />
                                            Profile
                                        </NavLink>
                                        <div className="profile__item profile__item--sub" ref={this.subProfileList}>
                                            <NavLink to="/user/profile/main" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('file-text')}} />
                                                Main
                                            </NavLink>
                                            <NavLink to="/user/profile/company" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('briefcase')}} />
                                                Company
                                            </NavLink>
                                        </div>
                                    </li>
                                    <li className="profile__item">
                                        <NavLink to="/user/ads" activeClassName="profile__link--active-cursored" className="profile__link">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('layout')}} />
                                            My Ads
                                        </NavLink>
                                        <div className="profile__item profile__item--sub" ref={this.subAdsList}>
                                            <NavLink to="/user/ads/active" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('message-square')}} />
                                                Active
                                                {activeAdsCount > 0 && <span className="message-badge__counter profile__mes-badge">{activeAdsCount}</span>}
                                            </NavLink>
                                            <NavLink to="/user/ads/inactive" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('archive')}} />
                                                Inactive
                                                {inactiveAdsCount > 0 && <span className="message-badge__counter profile__mes-badge">{inactiveAdsCount}</span>}
                                            </NavLink>
                                            <NavLink to="/user/ads/promoted" activeClassName="profile__link--sub-active" className="profile__link message-badge">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('corner-right-up')}} />
                                                Promoted
                                                {promotedAdsCount > 0 && <span className="message-badge__counter profile__mes-badge">{promotedAdsCount}</span>}
                                            </NavLink>
                                        </div>
                                    </li>
                                    <li className="profile__item">
                                        <NavLink to="/user/messages" activeClassName="profile__link--active-cursored" className="profile__link">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('mail')}} />
                                            Messages
                                        </NavLink>
                                        <div className="profile__item profile__item--sub" ref={this.subMessagesList}>
                                            <NavLink to="/user/messages/inbox" activeClassName="profile__link--sub-active" className="profile__link">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('inbox')}} />
                                                Inbox
                                            </NavLink>
                                            <NavLink to="/user/messages/sentbox" activeClassName="profile__link--sub-active" className="profile__link">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('check-circle')}} />
                                                Sentbox
                                            </NavLink>
                                            <NavLink to="/user/messages/spam" activeClassName="profile__link--sub-active" className="profile__link">
                                                <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('trash')}} />
                                                Spam
                                            </NavLink>
                                        </div>
                                    </li>
                                    <li className="profile__item">
                                        <NavLink to="/user/favorites" activeClassName="profile__link--active-cursored" className="profile__link">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('heart')}} />
                                            Favorites
                                        </NavLink>
                                    </li>
                                    <li className="profile__item">
                                        <NavLink to="/user/settings" activeClassName="profile__link--active" className="profile__link">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('settings')}} />
                                            Settings
                                        </NavLink>
                                    </li>
                                    <li className="profile__item">
                                        <NavLink to="/user/payments" activeClassName="profile__link--active" className="profile__link">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('credit-card')}} />
                                            Payments
                                        </NavLink>
                                    </li>
                                    <li className="profile__item">
                                        <NavLink to="/user/promotions" activeClassName="profile__link--active" className="profile__link">
                                            <svg className="profile__icon" dangerouslySetInnerHTML={{__html: utils.use('trending-up')}} />
                                            Promotions
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="profile__group profile__header">
                                <Switch>
                                    <Route path="/user/profile" exact render={() => Profile}/>
                                    <Route path="/user/profile/main" exact render={() => <User {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/profile/company" exact render={() => <Company {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/profile" exact render={() => Profile}/>
                                    <Route path="/user/ads" exact render={() => Ads} />
                                    <Route path="/user/ads/active" exact render={() => <ActiveAds {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />} />
                                    <Route path="/user/ads/inactive" exact render={() => <InactiveAds {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />} />
                                    <Route path="/user/ads/promoted" exact render={() => <PromotedAds {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />} />
                                    <Route path="/user/messages" exact render={() => Messages}/>
                                    <Route path="/user/messages/inbox" exact render={() => <Inbox {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/messages/sentbox" exact render={() => <Sentbox {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/messages/spam" exact render={() => <Spam {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/favorites" exact render={() => <Favorites {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/settings" exact render={() => <Settings {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/payments" exact render={() => <Payments {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="/user/promotions" exact render={() => <Promotions {...this.props} setLoading={this.setLoading} setData={this.setData} setError={this.setError} />}/>
                                    <Route path="*" render={() => <h1>404 Not Found</h1>} />
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
    favorites: state.data.favoriteAds
});

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));