import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from './Header';
import LoadingScreen from '../UI/LoadingScreen';
import ErrorComponent from './ErrorPage';
import Layout from './Layout';
import * as actions from '../store/actions';

const AsyncAuthSignin = React.lazy(() => import('./Authorization/AuthSignin'));
const AsyncAuthSignup = React.lazy(() => import('./Authorization/AuthSignup'));
const AsyncResetPass = React.lazy(() => import('./Authorization/ResetPass'));
const AsyncPost = React.lazy(() => import('./Post/Post'));
const AsyncMobilePost = React.lazy(() => import('./MobilePost/MobilePost'));
const AsyncProfile = React.lazy(() => import('./Profile/Profile'));
const AsyncAllCategories = React.lazy(() => import('./AllCatsPage/AllCatsPage'));
const AsyncPromote = React.lazy(() => import('./Promote/Promote'));
const AsyncMain = React.lazy(() => import('./Main/Main'));

function App(props) {
  const { onImportRequisites, onMatchSmallMedia, onSetLoadingMain } = props;
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const { i18n } = useTranslation();

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
    //  
    //     return req;
    // });

    // resInterceptor = axios.interceptors.response.use(res => res, error => {
    //
    // });
  }
  
  useEffect(() => {
    async function fetchPrerequisites() {
      try {
        setLoading(true);

        // --------- IMPORT REGIONS ---------
        const regions = await import(`../store/Regions/regions_${i18n.language}`);
        onImportRequisites('regionsList', regions.default);
        // --------- IMPORT CATEGORIES ----------
        const categories = await import(`../store/Categories/categories_${i18n.language}`);
        onImportRequisites('categoriesList', categories.default);
        // --------- IMPORT BASE TRANSLATIONS -------
        const base = await import(`../store/Translations/base/base_${i18n.language}`);
        onImportRequisites('base', base.default);
        
        setLoading(false);
      } catch(er) {
        console.error(er);
        setLoading(false);
      }
    }

    fetchPrerequisites();
    document.documentElement.lang = i18n.language;
    
  }, [i18n.language, onImportRequisites, onSetLoadingMain]);

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
      {props.mobile 
        ? <AsyncMobilePost />
        : <AsyncPost />
      }
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
    <Suspense fallback={(<LoadingScreen class="loadingScreen--abs" />)}>
      <div className="App">
        {/* {loading ? <LoadingScreen class="loadingScreen--abs" /> : routes} */}
        {routes}
      </div>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  loading: state.localization.loading,
  lang: state.localization.lang,
  mobile: state.data.mediaSmall
});

const mapDispatchToProps = (dispatch) => ({
  onImportRequisites: (req, list) => dispatch(actions.importRequisites(req, list)),
  onMatchSmallMedia: (val) => dispatch(actions.matchSmallMedia(val)),
  onSetLoadingMain: (val) => dispatch(actions.setLoadingMain(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
