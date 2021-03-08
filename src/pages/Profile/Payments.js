import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcMoneyTransfer } from 'react-icons/fc';

import LoadingScreen from '../../UI/LoadingScreen';

const Payments = (props) => {
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
                    <FcMoneyTransfer className="profile__icon--large mb-1" />
                    No payments were made
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Payments</h2>
                <h5 className="heading heading__5">Total balance: 1561,56 som</h5>
            </div>
            <div className="profile__content">
                {view}
            </div>
        </React.Fragment>
    );
};

export default Payments;