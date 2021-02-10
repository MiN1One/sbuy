import React, { PureComponent } from 'react';
import { FaRegHeart } from 'react-icons/fa';

import * as utils from '../utilities/utilities';

class MobileNav extends PureComponent {

    render() {
        
        return (
            <nav role="navigation" className="m-nav">
                <div className="container">
                    <div className="m-nav__wrapper">
                        <div className="m-nav__item">
                            <FaRegHeart className="" />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default MobileNav;