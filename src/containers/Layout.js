import React from 'react';

import Footer from './Footer';
import Navigation from './Navigation';

const Layout = (props) => {

    return (
        <React.Fragment>
            <Navigation {...props} />
                {props.children}
            <Footer />
        </React.Fragment>
    );
};



export default React.memo(Layout);