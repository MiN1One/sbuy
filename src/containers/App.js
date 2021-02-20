import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import LoadingScreen from '../UI/LoadingScreen';
import ErrorComponent from '../components/Error';
import Layout from './Layout';
import * as actions from '../store/actions';

const AsyncAuthSignin = asyncComponent(() => import('./Authorization/AuthSignin'));
const AsyncAuthSignup = asyncComponent(() => import('./Authorization/AuthSignup'));
const AsyncResetPass = asyncComponent(() => import('./Authorization/ResetPass'));
const AsyncPost = asyncComponent(() => import('./Post'));
const AsyncProfile = asyncComponent(() => import('../components/Profile/Profile'));
const AsyncAllCategories = asyncComponent(() => import('../components/AllCategories'));
const AsyncPromote = asyncComponent(() => import('../components/Promote'));
const AsyncMain = asyncComponent(() => import('../containers/Main'));

function App(props) {
  const { onImportRequisites, onMatchSmallMedia } = props;

  const mediaSM = window.matchMedia('(max-width: 46.875em)');
  const watch = () => {
    if (mediaSM.matches) onMatchSmallMedia(true);
    else onMatchSmallMedia(false);
  };

  useEffect(() => {
    // --------- MATCH SMALL MEDIA ---------
    watch();
    mediaSM.onchange = watch;
  }, []);

  useEffect(() => {
    // --------- IMPORT REGIONS ---------
    import(`../store/Regions/regions_${props.lang}`)
      .then(data => {
        onImportRequisites('regionsList', data.default);
      })
      .catch(er => {
        console.error(er);
      });
    
    // --------- IMPORT CATEGORIES ----------
    import(`../store/Categories/categories_${props.lang}`)
      .then(data => {
        onImportRequisites('categoriesList', data.default);
      })
      .catch(er => {
        console.error(er);
      });
  }, [props.lang, onImportRequisites]);

  const header = (
    <Layout>
      <Header />
    </Layout>
  );

  const main = (
    <Layout>
      <AsyncMain />
    </Layout>
  );

  const allCategories = (
    <Layout>
      <AsyncAllCategories {...props} />
    </Layout>
  );

  const post = (
    <Layout>
      <AsyncPost />
    </Layout>
  );

  const profile = (
    <Layout>
      <AsyncProfile />
    </Layout>
  );

  const errorC = (
    <Layout>
      <ErrorComponent {...props} notFound />
    </Layout>
  );

  let routes = (
    <Switch>
      <Route path="/signin" exact><AsyncAuthSignin /></Route>
      <Route path="/password-reset" exact><AsyncResetPass /></Route>
      <Route path="/signup" exact><AsyncAuthSignup /></Route>
      <Route path="/exchange" exact>{main}</Route>
      <Route path="/giveaway" exact>{main}</Route>
      <Route path="/post-new" exact>{post}</Route>
      <Route path="/user/:section">{profile}</Route>
      <Route path="/all" exact>{allCategories}</Route>
      <Route path="/all/:category" exact>{main}</Route>
      <Route path="/categories/:category/:subcategory">{main}</Route>
      <Route path="/" exact>{header}</Route>
      <Route path="*">{errorC}</Route>
    </Switch>
  );
  if (props.token) {
    routes = (
      <Switch>
        <Route path="/exchange" exact>{main}</Route>
        <Route path="/giveaway" exact>{main}</Route>
        <Route path="/post-new" exact>{post}</Route>
        <Route path="/all" exact>{allCategories}</Route>
        <Route path="/all/:category" exact>{main}</Route>
        <Route path="/promote" exact><AsyncPromote /></Route>
        <Route path="/user/:section">{profile}</Route>
        <Route path="/categories/:category/:subcategory">{main}</Route>
        <Route path="/" exact>{header}</Route>
        <Route path="*">{errorC}</Route>
      </Switch>
    );
  }
    
  return (
    <div className="App">
      {props.lodaingLazy && <LoadingScreen class="loadingScreen--abs" /> }
      {routes}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadingLazy: state.data.loadingLazy,
  token: state.user.token,
  lang: state.localization.lang
});

const mapDispatchToProps = (dispatch) => ({
  onImportRequisites: (req, list) => dispatch(actions.importRequisites(req, list)),
  onMatchSmallMedia: (val) => dispatch(actions.matchSmallMedia(val)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
