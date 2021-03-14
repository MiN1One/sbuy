import React, { useEffect, useState } from "react";
import axios from 'axios';

import Placeholder from './Placeholder';
import { AdFull } from "./Ads/AdCard";
import LoadingScreen from "../../UI/LoadingScreen";

const Favorites = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { t } = props;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                if (isMounted) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
            })
            .catch(er => {
                if (isMounted) {
                    setLoading(false);
                    console.error(er);
                }
            });
        return () => isMounted = false;
    }, []);

    const ads = props.data.filter(el => el.favorite === true).map(el => <AdFull el={el} />);

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    let view = ads;
    if (true) return <Placeholder t={t} />

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