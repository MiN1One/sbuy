import React from "react";
import { AdFull } from "./Ads/AdCard";

const Favorites = (props) => {

    const ads = props.data.filter(el => el.favorite === true).map(el => <AdFull el={el} favs />)

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