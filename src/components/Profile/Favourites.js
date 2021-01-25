import React, { useEffect, useState } from "react";
import { setLoading } from "../../store/actions";
import axios from 'axios';

import { AdFull } from "./Ads/AdCard";
import LoadingScreen from "../../UI/LoadingScreen";

const Favorites = (props) => {
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

    const ads = props.data.filter(el => el.favorite === true).map(el => <AdFull el={el} />);

    if (loading) return <LoadingScreen class="loadingScreen--profile" />;

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Favourite Ads</h2>
            </div>
            <div className="profile__ads">
                {ads}
            </div>
        </React.Fragment>
    );
};

export default Favorites;