import { FcMediumPriority, FcCableRelease, FcBrokenLink } from 'react-icons/fc';
import { Link, withRouter } from 'react-router-dom';

import * as utils from '../utilities/utilities';

const Error = (props) => {

    let view = (
        <div className={`e__main ${props.class || ''}`}>
            <div className="e__top">
                <FcBrokenLink className="e__i mb-2" />
                <h2 className="heading heading__2">Oops, Something went wrong</h2>
            </div>
            <div className="e__bottom">
                <Link to="/" className="btn btn__white e__link">
                    <utils.use styleClass="e__i e__i--sm" svg="home" />
                    <span className="e__title">Home</span>
                    
                </Link>
                <Link className="btn btn__white e__link" to="/about#troubleshooting">
                    <utils.use styleClass="e__i e__i--sm" svg="tool" />
                    <span className="e__title">Troubleshooting</span>
                </Link>
                <Link to="/about#contact" className="btn btn__white e__link">
                    <utils.use styleClass="e__i e__i--sm" svg="phone-call" />
                    <span className="e__title">Contact</span>
                </Link>
            </div>
        </div>
    );
    if (props.notFound) {
        view = (
            <div className={`e__main ${props.class || ''}`}>
                <div className="e__top">
                    <FcMediumPriority className="e__i mb-2" />
                    <h2 className="heading heading__2 mb-1">Sorry, Page is not found</h2>
                    <p className="e__text">Please, make sure you have the right address</p>
                </div>
                <div className="e__bottom">
                    <Link to="/" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="home" />
                        <span className="e__title">Home</span>
                    </Link>
                    <button className="btn btn__white e__link" onClick={() => props.history.goBack()}>
                        <utils.use styleClass="e__i e__i--sm" svg="corner-up-left" />
                        <span className="e__title">Go back</span>
                    </button>
                    <Link to="/sitemap" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="map" />
                        <span className="e__title">Sitemap</span>
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
                        <span className="e__title">Home</span>
                    </Link>
                    <Link className="btn btn__white e__link" to="/about#troubleshooting">
                        <utils.use styleClass="e__i e__i--sm" svg="tool" />
                        <span className="e__title">Troubleshooting</span>
                    </Link>
                    <Link to="/about#contact" className="btn btn__white e__link">
                        <utils.use styleClass="e__i e__i--sm" svg="phone-call" />
                        <span className="e__title">Contact</span>
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