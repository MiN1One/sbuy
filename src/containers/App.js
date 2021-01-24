import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Header from './Header';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import Layout from './Layout';
import LoadingScreen from '../UI/LoadingScreen';
import { connect } from 'react-redux';

const AsyncAuthSignin = asyncComponent(() => import('./Authorization/AuthSignin'));
const AsyncAuthSignup = asyncComponent(() => import('./Authorization/AuthSignup'));
const AsyncResetPass = asyncComponent(() => import('./Authorization/ResetPass'));
const AsyncPost = asyncComponent(() => import('./Post'));
const AsyncProfile = asyncComponent(() => import('../components/Profile/Profile'));

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

  const singleCategory = (
    <Layout>
      <h1>All</h1>
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
  
  return (
    <div className="App">
      {props.lodaingLazy && <LoadingScreen class="loadingScreen--abs" /> }
      <Switch>
        <Route path="/signin" exact component={AsyncAuthSignin} />
        <Route path="/password-reset" exact component={AsyncResetPass} />
        <Route path="/signup" exact component={AsyncAuthSignup} />
        <Route path="/user/:section" render={() => profile} />
        <Route path="/post-new" exact render={() => post} />
        <Route path="/all/:category" exact render={() => singleCategory} />
        <Route path="/:category/:subcategory" render={() => main} />
        <Route path="/" render={() => header} />
        <Route path="*" render={() => <h1>404 Not Found</h1>} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingLazy: state.data.loadingLazy
  }
};

export default connect(mapStateToProps)(App);
