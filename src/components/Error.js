import { connect } from 'react-redux';
import { FcMediumPriority, FcCableRelease, FcBrokenLink } from 'react-icons/fc';
import { Link, withRouter } from 'react-router-dom';

import * as utils from '../utilities/utilities';

const Error = (props) => {

    let view = (
        <div className="e__main">
            <div className="e__top">
                <FcBrokenLink className="e__i mb-2" />
                <h2 className="heading heading__2">Oops, Something went wrong</h2>
            </div>
            <div className="e__bottom">
                <Link to="/" className="btn btn__white e__link">
                    <utils.use styleClass="e__i e__i--sm" svg="home" />
                    Home
                </Link>
                <Link className="btn btn__white e__link" to="/about#troubleshooting">
                    <utils.use styleClass="e__i e__i--sm" svg="tool" />
                    Troubleshooting
                </Link>
                <Link to="/about#contact" className="btn btn__white e__link">
                    <utils.use styleClass="e__i e__i--sm" svg="phone-call" />
                    Contact
                </Link>
            </div>
        </div>
    );
    if (props.notFound) {
        view = (
            <div className="e__main">
                <div className="e__top">
                    <FcMediumPriority className="e__i mb-2" />
                    <h2 className="heading heading__2 mb-1">Sorry, Page is not found</h2>
                    <p className="e__text">Please, make sure you have the right address</p>
                </div>
                <div className="e__bottom">
                    <Link to="/" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="home" />
                        Home
                    </Link>
                    <Link className="btn btn__white e__link" onClick={() => props.history.goBack()}>
                        <utils.use styleClass="e__i e__i--sm" svg="corner-up-left" />
                        Go back
                    </Link>
                    <Link to="/sitemap" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="map" />
                        Sitemap
                    </Link>
                </div>
            </div>
        );
    }
    if (props.connection) {
        view = (
            <div className={`e__main ${props.class || ''}`}>
                <div className="e__top">
                    <FcCableRelease className="e__i mb-2" />
                    <h2 className="heading heading__2 mb-1">Connection is lost</h2>
                    <p className="e__text">Please, check your internet connection</p>
                </div>
                <div className="e__bottom">
                    <Link to="/" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="home" />
                        Home
                    </Link>
                    <Link className="btn btn__white e__link" to="/about#troubleshooting">
                        <utils.use styleClass="e__i e__i--sm" svg="tool" />
                        Troubleshooting
                    </Link>
                    <Link to="/about#contact" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="phone-call" />
                        Contact
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="e">
            {view}
        </div>
    );
};

export default withRouter(Error);