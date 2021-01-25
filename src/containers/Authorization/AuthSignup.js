import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import emailValidator from 'email-validator';
import axios from 'axios';

import Backdrop from '../../UI/Backdrop';
import Language from '../../components/Language';
import Logo from '../../components/Logo';
import * as utils from '../../utilities/utilities';

class AuthSignup extends Component {
    constructor(props) { 
        super(props);
        
        this.state = {
            inputFocused: false,
            error: null,
            success: false,
            proceed: false,
            verified: true,
            number: ''
        }

        this.checkboxRef = React.createRef();
        this.numInputRef = React.createRef();
        this.passRef = React.createRef();
        this.passConfirmRef = React.createRef();
        this.nameRef = React.createRef();
        this.lNameRef = React.createRef();
    }

    componentDidMount() {
        window.location.hash = '';
    }

    clearErrorHighlight = () => {
        this.numInputRef.current.setCustomValidity('');
        this.nameRef.current.setCustomValidity('');
        this.lNameRef.current.setCustomValidity('');
        this.passRef.current.setCustomValidity('');
        this.passConfirmRef.current.setCustomValidity('');
        this.setState({ error: null });
    }

    validated = (filled, validNum, validPass, passwordsMatch, agree) => {

        if (filled) {
            if (!validNum) {
                this.numInputRef.current.setCustomValidity('Invalid phone number');
                this.numInputRef.current.focus();
                this.setState({ error: 'Invalid phone number' });
                return false;
            } else if (!validPass) {
                this.passRef.current.setCustomValidity('Password length is less than 6');
                this.passRef.current.focus();
                this.setState({ error: 'Password length must be at least 6 characters in length' });
                return false;
            } else if (!passwordsMatch) {
                this.passRef.current.setCustomValidity('Passwords do not match');
                this.passConfirmRef.current.setCustomValidity('Passwords do not match');
                this.passRef.current.focus();
                this.setState({ error: 'Passwords do not match' });
                return false;
            } else if (!agree) {
                this.setState({ error: 'You you have to accept website terms of use' });
                return false;
            } else {
                this.clearErrorHighlight();
                return true;
            }
        } else {
            this.numInputRef.current.setCustomValidity('Empty');
            this.nameRef.current.setCustomValidity('Empty');
            this.lNameRef.current.setCustomValidity('Empty');
            this.passRef.current.setCustomValidity('Empty');
            this.passConfirmRef.current.setCustomValidity('Empty');
            this.nameRef.current.focus();
            this.setState({ error: 'Please fill out all the fields' });
            return false;
        }
    }

    onSignUp = (e) => {
        e.preventDefault();
        const password = this.passRef.current;
        const passwordConf = this.passConfirmRef.current;

        const number = this.state.number;
        const lastName = this.lNameRef.current;
        const name = this.nameRef.current;
        
        if ((password.value && passwordConf.value && number && name.value && lastName.value) !== '') {

            const validNum = number.length > 7;
            const validPass = password.value.length >= 6;
            const passwordsMatch = passwordConf.value === password.value;

            if (this.validated(true, validNum, validPass, passwordsMatch, true)) {
                const data = {
                    phone: number,
                    password: password.value,
                    // email: 'test@mail.eu',
                    firstname: name.value,
                    lastname: lastName.value
                };
                axios.post('http://api.soybaliq.uz/api/auth/register', data)
                    .then(res => {
                        console.log(res);
                        window.location.hash = '#confirm';
                    }).catch(er => {
                        console.log(er);
                        this.setState({ error: er.message });
                    });
            }
        } else this.validated(false);
    }

    onProceed = (e) => {
        e.preventDefault();
        const number = this.state.number;
        const agree = this.checkboxRef.current.checked;
        const name = this.nameRef.current;
        const lastName = this.lNameRef.current;

        const validNum = number.length > 7;

        if ((number && name.value && lastName.value) !== '') {

            if (this.validated(true, validNum, true, true, agree)) {
                console.log(number);
                console.log(agree);

                // ---------------------------------
                
                // ........
                // this.props.history.push('#second-face');
                window.location.hash = 'second-face';
            }
        } else this.validated(false);
    }

    onInputnumber = (val) => {
        if (utils.isNum(parseInt(val)) || val === '+' || val === '') this.setState({ number: val });
    }

    onFocus = () => this.setState({ inputFocused: true });
    onBlur = () => this.setState({ inputFocused: false });

    render() {

        return (
            <div className="authorization">
                {this.state.inputFocused && <Backdrop z={1} click={this.onBlur} />}
                <Language class="authorization__lang" dropClass="dropdown--left-fix" />
                <div className="authorization__wrapper authorization__wrapper--high" onClick={() => this.onFocus()}>
                    <div className="authorization__head">
                        <Logo classImg="logo__figure--nav" />
                        <Link to="/signin" className="authorization__info authorization__info--heading">
                            <svg className="authorization__icon" dangerouslySetInnerHTML={{__html: utils.use('log-in')}} />
                            Sign in
                        </Link>
                    </div>
                    {this.state.error && <p className="authorization__error mb-1">{this.state.error}</p>}
                    <form className="authorization__form" id="second-face">
                        <p className="authorization__info authorization__info--heading mb-1">Set your password</p>
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="password" 
                                placeholder="Enter your password" 
                                ref={this.passRef} />
                            <p className="authorization__label authorization__label--abs">Your password</p>
                        </label>
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="password" 
                                placeholder="Confirm your password"
                                ref={this.passConfirmRef} />
                            <p className="authorization__label authorization__label--abs mb-2">Confirm your password</p>
                        </label>
                        <button className="btn btn__primary authorization__btn mt-1 mb-1" onClick={(e) => this.onSignUp(e)}>
                            Proceed
                            <svg className="icon ml-5 icon--8" dangerouslySetInnerHTML={{__html: utils.use('user-plus')}} />
                        </button>
                    </form>
                    <form className="authorization__form" id="first-face">
                        <p className="authorization__info authorization__info--heading mb-1">Sign up</p>
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="text" 
                                placeholder="First name"
                                ref={this.nameRef} />
                            <p className="authorization__label authorization__label--abs">First name</p>
                        </label>
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="text" 
                                placeholder="Last name"
                                ref={this.lNameRef} />
                            <p className="authorization__label authorization__label--abs">Last name</p>
                        </label>
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="text" 
                                placeholder="Your phone number" 
                                ref={this.numInputRef}
                                value={this.state.number} 
                                onChange={(e) => this.onInputnumber(e.target.value)} />
                            <p className="authorization__label authorization__label--abs">Your number or email</p>
                        </label>
                        <div className="authorization__item">
                            <input type="checkbox" id="terms" className="checkbox" ref={this.checkboxRef} />
                            <label htmlFor="terms" className="label">
                                <span></span>
                                Agree to terms of use
                            </label>
                        </div>
                        <button className="btn btn__primary authorization__btn mb-1" onClick={(e) => this.onProceed(e)}>
                            Proceed
                            <svg className="icon ml-5 icon--8" dangerouslySetInnerHTML={{__html: utils.use('user-plus')}} />
                        </button>
                        <p className="authorization__info">Existing user? <Link to="/signin" className="authorization__info--high">Sign in</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AuthSignup);