import React, { useEffect, useState } from 'react';
import axios from 'axios';

import LoadingScreen from '../../UI/LoadingScreen';

export const Inbox = (props) => {

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

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Inbox</h2>
            </div>
            <div className="profile__content">
                <div className=""></div>
            </div>
        </React.Fragment>
    );
};

export const Sentbox = (props) => {

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

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Sentbox</h2>
            </div>
            <div className="profile__content">
                <div className=""></div>
            </div>
        </React.Fragment>
    );
};

export const Spam = (props) => {

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

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Spam</h2>
            </div>
            <div className="profile__content">
                <div className=""></div>
            </div>
        </React.Fragment>
    );
};
