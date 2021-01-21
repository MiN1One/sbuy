import React from 'react';

export const Inbox = (props) => {

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
