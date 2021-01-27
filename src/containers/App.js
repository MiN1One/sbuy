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

  const errorC = (
    <Layout>
      <ErrorComponent {...props} notFound />
    </Layout>    
  );

  let routes = (
    <Switch>
      <Route path="/signin" exact component={AsyncAuthSignin} />
      <Route path="/password-reset" exact component={AsyncResetPass} />
      <Route path="/signup" exact component={AsyncAuthSignup} />
      <Route path="/exchange" exact render={() => main} />
      <Route path="/giveaway" exact render={() => main} />
      <Route path="/post-new" exact render={() => post} />
      <Route path="/user/:section" render={() => profile} />
      <Route path="/all/:category" exact render={() => singleCategory} />
      <Route path="/categories/:category/:subcategory" render={() => main} />
      <Route path="/" exact render={() => header} />
      <Route path="*" render={() => errorC} />
    </Switch>
  );
  if (props.token) {
    routes = (
      <Switch>
        <Route path="/exchange" exact render={() => main} />
        <Route path="/giveaway" exact render={() => main} />
        <Route path="/post-new" exact render={() => post} />
        <Route path="/all/:category" exact render={() => singleCategory} />
        <Route path="/user/:section" render={() => profile} />
        <Route path="/categories/:category/:subcategory" render={() => main} />
        <Route path="/" exact render={() => header} />
        <Route path="*" render={() => errorC} />
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
