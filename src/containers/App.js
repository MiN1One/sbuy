import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from './Main';
import Header from './Header';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import LoadingScreen from '../UI/LoadingScreen';
import ErrorComponent from '../components/Error';
import Layout from './Layout';

const AsyncAuthSignin = asyncComponent(() => import('./Authorization/AuthSignin'));
const AsyncAuthSignup = asyncComponent(() => import('./Authorization/AuthSignup'));
const AsyncResetPass = asyncComponent(() => import('./Authorization/ResetPass'));
const AsyncPost = asyncComponent(() => import('./Post'));
const AsyncProfile = asyncComponent(() => import('../components/Profile/Profile'));
const AsyncAllCategories = asyncComponent(() => import('../components/AllCategories'));

function App(props) {
  const header = (
    <Layout>
      <Header />
    </Layout>
  );

  const main = (
    <Layout>
      <Main />
    </Layout>
  );

  const allCategories = (
    <Layout>
      <AsyncAllCategories />
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
  token: state.user.token
});

export default connect(mapStateToProps)(App);
