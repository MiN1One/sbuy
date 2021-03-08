import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FcOpenedFolder } from 'react-icons/fc';

import { AdFull } from "./Ads/AdCard";
import LoadingScreen from "../../UI/LoadingScreen";

const Favorites = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { t } = props;

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

    const ads = props.data.filter(el => el.favorite === true).map(el => <AdFull el={el} />);

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    let view = ads;
    if (true) {
        view = (
            <div className="profile__empty">
                <div>
                    <FcOpenedFolder className="profile__icon--large" />
                    Nothing here to display
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">{t('translation:nav.favorites')} {t('translation:main.ads')}</h2>
            </div>
            <div className="profile__ads">
                {view}
            </div>
        </React.Fragment>
    );
};

export default Favorites;