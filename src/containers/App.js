import React, { useEffect, useState } from 'react';
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
  const { onImportRequisites, onMatchSmallMedia, onSetLoadingMain } = props;
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    setMounted(true);
  }, []);

  const mediaSM = window.matchMedia('(max-width: 48em)');
  const watch = () => {
    if (mediaSM.matches) onMatchSmallMedia(true);
    else onMatchSmallMedia(false);
  };

  if (!mounted) {
    // --------- MATCH SMALL MEDIA ---------
    watch();
    mediaSM.onchange = watch;
    //   reqInterceptor = axios.interceptors.request.use(req => {
    //     setState({error: null})
    //     return req;
    // });

    // resInterceptor = axios.interceptors.response.use(res => res, error => {
    //     setState({error: error});
    // });
  }
  
  useEffect(() => {
    async function fetchPrerequisites() {
      try {
        setLoading(true);

        // --------- IMPORT REGIONS ---------
        const regions = await import(`../store/Regions/regions_${props.lang}`);
        onImportRequisites('regionsList', regions.default);
        // --------- IMPORT CATEGORIES ----------
        const categories = await import(`../store/Categories/categories_${props.lang}`);
        onImportRequisites('categoriesList', categories.default);
        // --------- IMPORT BASE TRANSLATIONS -------
        const base = await import(`../store/Translations/base/base_${props.lang}`);
        onImportRequisites('base', base.default);
        
        setLoading(false);
      } catch(er) {
        console.error(er);
        setLoading(false);
      }
    }

    fetchPrerequisites();
    document.documentElement.lang = props.lang;
    
  }, [props.lang, onImportRequisites, onSetLoadingMain]);

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
      <Route path="/post-new" exact>{post}</Route>
      <Route path="/user/:section">{profile}</Route>
      <Route path="/all" exact>{allCategories}</Route>
      <Route path="/search" exact>{main}</Route>
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
        <Route path="/search" exact>{main}</Route>
        <Route path="/all/:category" exact>{main}</Route>
        <Route path="/ads/promote" exact><AsyncPromote /></Route>
        <Route path="/user/:section">{profile}</Route>
        <Route path="/categories/:category/:subcategory">{main}</Route>
        <Route path="/" exact>{header}</Route>
        <Route path="*">{errorC}</Route>
      </Switch>
    );
  }
    
  return (
    <div className="App">
      {loading ? <LoadingScreen class="loadingScreen--abs" /> : routes}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  loading: state.localization.loading,
  lang: state.localization.lang
});

const mapDispatchToProps = (dispatch) => ({
  onImportRequisites: (req, list) => dispatch(actions.importRequisites(req, list)),
  onMatchSmallMedia: (val) => dispatch(actions.matchSmallMedia(val)),
  onSetLoadingMain: (val) => dispatch(actions.setLoadingMain(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
