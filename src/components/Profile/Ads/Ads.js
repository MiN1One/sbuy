import React from 'react';

import { AdsCard } from './AdCard';

const ActiveAds = React.memo((props) => {

    const onDeactivate = (id) => {

        // ----------------------

        // .....
    }

    const ads = props.data.map((el, i) => <AdsCard el={el} view="active" key={el.id} />);

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

    const onActivate = (id) => {

        // ----------------------
        
        // .....
    };

    const onRemove = (id) => {

        // ----------------------
        
        // .....
    };

    const ads = props.data.map((el, i) => <AdsCard el={el} view="inactive" key={el.id} />);
    
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

    const onDeactivate = (id) => {

        // ----------------------
        
        // .....
    };

    const onActivate = (id) => {

        // ----------------------
        
        // .....
    };

    const ads = props.data.filter(el => el.premium === true).map(el => <AdsCard el={el} view="active" key={el.id} />);

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
