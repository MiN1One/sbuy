import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FcTemplate, FcPackage, FcPositiveDynamic } from 'react-icons/fc';

import * as utils from '../../../utilities/utilities.js';
import LoadingScreen from '../../../UI/LoadingScreen';
import { AdsCard } from './AdCard';

const ActiveAds = React.memo((props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(er => {
                
                setLoading(false);
            });
    }, []);

    const onDeactivate = (id) => {

        // ----------------------

        // .....
    }

    const ads = props.data.map((el, i) => <AdsCard el={el} view="active" key={el.id} />);

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    let view = ads;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcTemplate className="profile__icon--large mb-1" />
                    Nothing here to display
                    <Link className="btn btn__white mt-2" to="/post-new">
                        <utils.use styleClass="icon icon--dark mr-5" svg="plus" />
                        Post ad
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Active Ads</h2>
            </div>
                <div className="profile__ads">
                    {view}
                </div>
        </React.Fragment>      
    )
});

const InactiveAds = React.memo((props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(er => {
                
                setLoading(false);
            });
    }, []);

    const onActivate = (id) => {

        // ----------------------
        
        // .....
    };

    const onRemove = (id) => {

        // ----------------------
        
        // .....
    };

    const ads = props.data.map((el, i) => <AdsCard el={el} view="inactive" key={el.id} />);

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    let view = ads;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcPackage className="profile__icon--large" />
                    Nothing here to display
                </div>
            </div>
        );
    }
    
    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Inactive Ads</h2>
            </div>
            <div className="profile__ads">
                {view}
            </div>
        </React.Fragment>
    );
});

const PromotedAds = React.memo((props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(er => {
                
                setLoading(false);
            });
    }, []);

    const onDeactivate = (id) => {

        // ----------------------
        
        // .....
    };

    const onActivate = (id) => {

        // ----------------------
        
        // .....
    };
    
    const ads = props.data.filter(el => el.premium === true).map(el => <AdsCard el={el} view="active" key={el.id} />);
    
    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    let view = ads;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcPositiveDynamic className="profile__icon--large mb-1" />
                    Nothing here to display
                    <Link to="/promote" className="btn btn__white mt-2">
                        <utils.use styleClass="icon icon--dark mr-1" svg="trending-up" />
                        Promote
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Promoted Ads</h2>
            </div>
            <div className="profile__ads">
                {view}
            </div>
        </React.Fragment>
    );
});

export { ActiveAds, InactiveAds, PromotedAds };
