import React, { useEffect, useRef, useState } from 'react';

import * as utils from '../../utilities/utilities';
import LoadingSub from '../../UI/LoadingSub';
import RegionsDropdown from '../RegionsDropdown';

const Settings = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [passTime, setPassTime] = useState('05.07.2021 16:43');
    const [region, setRegion] = useState('toshkent');

    const passwordOldInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();
    const emailInputRef = useRef();

    const prevRegionRef = useRef();
    useEffect(() => {
        prevRegionRef.current = region;
    });

    const prevRegion = prevRegionRef.current;

    const onTogglePass = (e) => {
        if (passwordInputRef.current.value !== '') {
            if (passwordInputRef.current.type === 'password') passwordInputRef.current.type = 'text';
            else passwordInputRef.current.type = 'password';
        }
    };

    const onDiscardChanges = () => {
        setRegion(prevRegion);
        setEditMode(false);
    };

    const onSaveChanges = () => {
        const old = passwordOldInputRef.current;
        const newP = passwordInputRef.current;
        const conf = passwordConfirmInputRef.current;

        if (old.value !== '') {
            if ((newP.value && conf.value) !== '') {
                if (newP.value.length >= 6) {
                    if (newP.value === conf.value) {
                        clearErrorHighlight();

                        // ------------------------


                        // ........
                        const d = new Date();

                        let month = d.getMonth()+1;
                        if (month < 10) month = `0${month}`;
                        
                        setPassTime(`${d.getDate()}.${month}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`);
                        setEditMode(false);
                        
                    } else {
                        newP.setCustomValidity('Passwords do not match');
                        conf.setCustomValidity('Passwords do not match');
                        setError('Passwords do not match');
                        newP.focus();
                    }
                } else {
                    newP.focus();
                    setError('Password length should not be less than 6');
                }

            } else {
                newP.setCustomValidity('Type in a new password');
                conf.setCustomValidity('Type in a new password');
                setError('Type in a new password');
                newP.focus();
            }
        } else setEditMode(false);
    };

    function clearErrorHighlight() {
        passwordInputRef.current.setCustomValidity('');
        passwordOldInputRef.current.setCustomValidity('');
        passwordConfirmInputRef.current.setCustomValidity('');
        setError(null);
    };

    let regionTitle = null;
    if (props.regions) {
        regionTitle = props.regions.find(el => el.val === region).title;
    }

    let regionView = <span className="heading heading__5 profile__main-text">Region, {regionTitle}</span>;
    if (editMode) {
        regionView = (
            <React.Fragment>
                <span className="profile__title">Region</span>
                <div className="pos-rel">
                    <div className="profile__input profile__input--reg input" tabIndex="0">{regionTitle}</div>
                    <RegionsDropdown click={setRegion} default={region} class={['dropdown--full dropdown--left-fix profile__reg-dropdown dropdown--close']}/>
                </div>
            </React.Fragment>
        )
    }

    let passView = <span className="heading heading__5 profile__main-text">Password was last changed on {passTime}</span>;
    if (editMode) {
        passView = (
            <React.Fragment>
                {error && 
                    <div className="profile__text profile__text--error fdr ac">
                        <utils.use styleClass="profile__icon icon--red mr-5" svg="alert-triangle" />
                        {error}
                    </div>
                }
                <p className="profile__ad-details mb-2">If you do not want to change the password leave the fields empty.</p>
                <p className="profile__text">
                    <label className="profile__title">Enter your old password</label>
                    <input className="profile__input input" type="password" placeholder="Old password" ref={passwordOldInputRef} />
                </p>
                <div className="profile__text">
                    <label className="profile__title">New password</label>
                    <label className="pos-rel">
                        <input className="profile__input input" type="password" placeholder="New password" ref={passwordInputRef} minLength="6" />
                        <button className="profile__btn profile__btn--abs" onClick={(e) => onTogglePass(e)}>
                            <utils.use styleClass="profile__icon profile__icon--small" svg="eye-off" />
                        </button>
                    </label>
                </div>
                <div className="profile__text">
                    <label className="profile__title">Confirm password</label>
                    <input className="profile__input input" type="password" placeholder="Confirm password" ref={passwordConfirmInputRef} />
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="profile__titlebar">
                <h2 className="heading heading__2 profile__heading">Settings</h2>
                {!editMode && <button className="profile__btn profile__btn--rounded" onClick={() => setEditMode(true)}>
                    <utils.use styleClass="profile__icon profile__icon--small" svg="edit-2" />
                </button>}
                {editMode && <button className="profile__btn profile__btn--rounded" onClick={() => onDiscardChanges()}>
                    <utils.use styleClass="profile__icon profile__icon--small" svg="x" />
                </button>}
            </div>
            <div className="profile__content fdc">
                {regionView}
            </div>
            <div className="profile__content profile__content--mid fdc">
                {passView}
            </div>
            {editMode && 
                <React.Fragment>
                    <div className="profile__content profile__content--mid">
                        <div className="profile__text m-0">
                            <label className="profile__title mb-1">Change email address</label>
                            <input className="profile__input input" type="text" placeholder="Email address" ref={emailInputRef} />
                        </div>
                    </div>
                    <div className="profile__footer mt-15">
                        {loading && <LoadingSub />}
                        <button className="ml-2 btn btn__primary btn__primary--outline" onClick={() => onSaveChanges()}>
                            Save
                        </button>
                    </div>
                </React.Fragment>
            }
            {!editMode &&
                <div className="profile__content profile__content--mid">
                    <span className="heading heading__5 profile__main-text">Email, johndoe@mail.eu</span>
                </div>
            }
        </React.Fragment>
    );
};

export default Settings;