import React from 'react';
import { connect } from 'react-redux';

import Footer from './Footer';
import Navigation from './Navigation';
import Searchbar from '../components/Searchbar';
import LoadingScreen from '../UI/LoadingScreen';

const Layout = (props) => {

    return (
        <React.Fragment>
            <Navigation />
                {props.loading ? <LoadingScreen /> : props.children}
            <Footer />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.data.loading
    }
};

export default connect(mapStateToProps)(React.memo(Layout));