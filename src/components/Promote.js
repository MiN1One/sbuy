import React, { useState } from 'react';
import { FcShop, FcOk, FcPlanner, FcHighPriority } from 'react-icons/fc';

import * as utils from '../utilities/utilities';

const Promote = (props) => {
    // useState()

    return (
        <div className="promote">
            <div className="container">
                <div className="promote__wrapper">
                    <div className="promote__head">
                        <div className="mb-5 d-flex ac">
                            <FcShop className="promote__icon mr-15" />
                            <h2 className="promote__heading heading heading__2">Choose your plan</h2>
                        </div>
                        <p className="promote__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, velit condimentum tempus fringilla, mi lorem efficitur felis, venenatis sollicitudin nunc leo in arcu. Aliquam.</p>
                    </div>
                    <div className="promote__body">
                        <div className="promote__card" tabIndex="0">
                            <div className="promote__card-head">
                                <h4 className="heading heading__4 promote__card-heading">SBUY Basic</h4>
                            </div>
                            <div className="promote__card-body">
                                <div className="promote__feature">
                                    <FcPlanner className="promote__icon--sm" />
                                    3 days premium plan
                                </div>
                                <div className="promote__feature">
                                    <FcHighPriority className="promote__icon--sm" />
                                    Some advantage 2
                                </div>
                                <div className="promote__feature">
                                    <FcHighPriority className="promote__icon--sm" />
                                    Some advantage 3
                                </div>
                                <div className="promote__feature">
                                    <FcOk className="promote__icon--sm" />
                                    Some advantage 4
                                </div>
                            </div>
                            <div className="btn btn__primary promote__card-btn">
                                $1.99
                            </div>
                        </div>
                        <div className="promote__card promote__card--prem" tabIndex="0">
                            <div className="promote__card-head">
                                <h4 className="heading heading__4 promote__card-heading">SBUY Advanced</h4>
                                {/* <FcRating className="promote__icon--mid" /> */}
                            </div>
                            <div className="promote__card-body">
                                <div className="promote__feature">
                                    <FcPlanner className="promote__icon--sm" />
                                    14 days premium plan
                                </div>
                                <div className="promote__feature">
                                    <FcOk className="promote__icon--sm" />
                                    Some advantage 2
                                </div>
                                <div className="promote__feature">
                                    <FcOk className="promote__icon--sm" />
                                    Some advantage 3
                                </div>
                                <div className="promote__feature">
                                    <FcOk className="promote__icon--sm" />
                                    Some advantage 4
                                </div>
                            </div>
                            <div className="btn btn__secondary promote__card-btn">
                                $5.99
                            </div>
                        </div>
                        <div className="promote__card" tabIndex="0">
                            <div className="promote__card-head">
                                <h4 className="heading heading__4 promote__card-heading">SBUY Pro</h4>
                            </div>
                            <div className="promote__card-body">
                                <div className="promote__feature">
                                    <FcPlanner className="promote__icon--sm" />
                                    7 days premium plan
                                </div>
                                <div className="promote__feature">
                                    <FcOk className="promote__icon--sm" />
                                    Some advantage 2
                                </div>
                                <div className="promote__feature">
                                    <FcHighPriority className="promote__icon--sm" />
                                    Some advantage 3
                                </div>
                                <div className="promote__feature">
                                    <FcOk className="promote__icon--sm" />
                                    Some advantage 4
                                </div>
                            </div>
                            <div className="btn btn__primary promote__card-btn">
                                $3.99
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Promote);
