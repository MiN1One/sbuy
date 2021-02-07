import React, { useState } from 'react';
import { FcShop, FcOk, FcPlanner, FcHighPriority } from 'react-icons/fc';

import logo from '../assets/Без названия.png';
import * as utils from '../utilities/utilities';
import Logo from '../components/Logo';

const Promote = (props) => {

    return (
        <div className="promote">
            <div className="container">
                <div className="promote__wrapper">
                    <div className="promote__head">
                        <div className="mb-1 d-flex ac">
                            <FcShop className="promote__icon mr-15" />
                            <h2 className="promote__heading heading heading__2">Choose your plan</h2>
                        </div>
                        <p className="promote__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, velit condimentum tempus fringilla, mi lorem efficitur felis, venenatis sollicitudin nunc leo in arcu. Aliquam.</p>
                    </div>
                    <div className="promote__body">
                        <div className="promote__card" tabIndex="0">
                            <div className="promote__card-head">
                                <figure className="pos-rel">
                                    <img src={logo} className="promote__logo" alt="SBUY" />
                                    <span className="promote__card-title">Basic</span>
                                </figure>
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
                            <button className="btn btn__primary promote__card-btn">
                                $1.99
                            </button>
                        </div>
                        <div className="promote__card promote__card--prem" tabIndex="0">
                            <div className="promote__card-head">
                                <figure className="pos-rel">
                                    <img src={logo} className="promote__logo" alt="SBUY" />
                                    <span className="promote__card-title">Advanced</span>
                                </figure>
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
                            <button className="btn btn__secondary promote__card-btn">
                                $5.99
                            </button>
                        </div>
                        <div className="promote__card" tabIndex="0">
                            <div className="promote__card-head">
                                <figure className="pos-rel">
                                    <img src={logo} className="promote__logo" alt="SBUY" />
                                    <span className="promote__card-title">Pro</span>
                                </figure>
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
                            <button className="btn btn__primary promote__card-btn">
                                $3.99
                            </button>
                        </div>
                    </div>
                    <div className="promote__footer">
                        <button className="btn btn__primary btn__primary--outline">Do not promote</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Promote);
