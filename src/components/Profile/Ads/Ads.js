import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Active Ads</h2>
            </div>
                {/* <div className="profile__extra mb-2">
                    Sort by:
                    <div className="profile__sort ml-1">
                        Date
                        <svg className="profile__icon profile__icon--small ml-5" dangerouslySetInnerHTML={{__html: utils.use('chevron-down')}} />
                    </div>
                </div> */}
                <div className="profile__ads">
                    {ads}
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
    
    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Inactive Ads</h2>
            </div>
            <div className="profile__ads">
                {ads}
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

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Promoted Ads</h2>
            </div>
            <div className="profile__ads">
                {ads}
            </div>
        </React.Fragment>
    );
});

export { ActiveAds, InactiveAds, PromotedAds };
