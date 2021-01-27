import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcFeedback, FcFaq, FcEmptyTrash } from 'react-icons/fc';

import * as utils from '../../utilities/utilities';
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

    let view = null;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcFeedback className="profile__icon--large mb-1" />
                    Nothing here to display
                    <button className="btn btn__white mt-2">
                        <utils.use styleClass="icon icon--dark mr-1" svg="edit-2" />
                        Write message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Inbox</h2>
            </div>
            <div className="profile__content">
                {view}
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
    
    let view = null;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcFaq className="profile__icon--large mb-1" />
                    Nothing here to display
                    <button className="btn btn__white mt-2">
                        <utils.use styleClass="icon icon--dark mr-1" svg="edit-2" />
                        Write message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Sentbox</h2>
            </div>
            <div className="profile__content">
                {view}
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

    let view = null;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcEmptyTrash className="profile__icon--large mb-1" />
                    Nothing here to display
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Spam</h2>
            </div>
            <div className="profile__content">
                {view}
            </div>
        </React.Fragment>
    );
};
