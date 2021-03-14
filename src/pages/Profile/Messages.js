import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcFeedback, FcFaq, FcEmptyTrash } from 'react-icons/fc';
import { Link, Route } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import * as utils from '../../utilities/utilities';
import LoadingScreen from '../../UI/LoadingScreen';
import Placeholder from './Placeholder';

export const Conversation = ({ t }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [messagesAll, setMessagesAll] = useState([
        {mes: 'Hola', from: true},
        {mes: 'Hello', from: true},
        {mes: 'Hola Receiver', from: true}
    ]);

    useEffect(() => {
        setLoading(true);
        axios('https://jsonplaceholder.typicode.com/todos?limit=10')
            .then((res) => {
                // setMessagesAll(res.data);
                setLoading(false);
            })
            .catch(er => {
                
                setLoading(false);
            });
    }, []);

    const messages = messagesAll.map((el, i) => (
        <div key={i} className="profile__message-buble profile__message-buble--receiver">{el.mes}</div>
    ));

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    return (
        <React.Fragment>
            <Scrollbars className="profile__chat">
                <div className="profile__chat-area">
                    {messages}
                </div>
            </Scrollbars>
            <div className="profile__sendbox">
                <textarea 
                    className="profile__textarea" 
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message} />
                <button className="btn btn__secondary btn__secondary--outline profile__btn-send">
                    {t('ad:send')}
                    <utils.use styleClass="icon--7 icon--dark ml-5" svg="send" />
                </button>
            </div>
        </React.Fragment>

    );
};

export const Inbox = ({ t }) => {

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

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">{t('translation:nav.inbox')}</h2>
            </div>
            {view}
            <ul className="profile__messages-list">
                <Route path="/user/messages/conversation/:id">
                    <Conversation />
                </Route>
                <li className="profile__messages-item">
                    <Link to={`/user/messages/conversation/123`} className="profile__messages-link">
                        <span className="profile__messages-text profile__messages-text--name">Someone</span>
                        <span className="profile__messages-text">{utils.limitStrAny('Some message from someone regjrengjkerngjsjgn jdgnjdkn', 20, true)}</span>
                    </Link>
                    <div className="profile__messages-btn">
                        <button className="profile__btn profile__btn--control">
                            <utils.use styleClass="profile__icon profile__icon--small" svg="trash-2" />
                            <span className="profile__btn-title">{t('ad:add spam')}</span>
                        </button>
                        <button className="profile__btn profile__btn--control">
                            <utils.use styleClass="profile__icon profile__icon--small" svg="edit" />
                            <span className="profile__btn-title">{t('ad:spam')}</span>
                        </button>
                    </div>
                </li>
            </ul>
        </React.Fragment>
    );
};

export const Sentbox = ({ t }) => {

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
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">{t('translation:nav.sentbox')}</h2>
            </div>
            <div className="profile__content">
                {view}
            </div>
        </React.Fragment>
    );
};

export const Spam = ({ t }) => {

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
    if (true) return <Placeholder />;

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">{t('tranlsation:nav.spam')}</h2>
            </div>
            <div className="profile__content">
                {view}
            </div>
        </React.Fragment>
    );
};
