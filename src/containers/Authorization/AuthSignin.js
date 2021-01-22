import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as emailValidator from 'email-validator';
import axios from 'axios';

import Backdrop from '../../UI/Backdrop';
import Language from '../../components/Language';
import Logo from '../../components/Logo';
import * as utils from '../../utilities/utilities';

class AuthSignin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputFocused: false,
            error: null,
            number: ''
        }

        this.checkboxRef = React.createRef();
        this.passRef = React.createRef();
        this.loginRef = React.createRef();
    }

    clearErrorHighlight = () => {
        this.loginRef.current.setCustomValidity('');
        this.passRef.current.setCustomValidity('');
        this.setState({ error: null });
    }

    onProceed = (e) => {
        e.preventDefault();
        const mainInput = this.state.number;
        const password = this.passRef.current;
        const remember = this.checkboxRef.current.checked;

        if ((mainInput && password.value) !== '') {

            console.log(mainInput);
            console.log(password.value);
            console.log(remember);

            // --------------------------------------------
            
            // ..........
        } else {
            this.loginRef.current.setCustomValidity('Empty');
            this.passRef.current.setCustomValidity('Empty');
            this.loginRef.current.focus();
            this.setState({ error: 'Please fill out all of the fields' });
        }
    }

    onInputNumber = (val) => {
        if (utils.isNum(parseInt(val)) || val === '+' || val === '') this.setState({ number: val });
    }

    onTogglePass = (e) => {
        if (this.passRef.current.value !== '') {
            if (this.passRef.current.type === 'password') this.passRef.current.type = 'text';
            else this.passRef.current.type = 'password';
        }
    }

    onFocus = () => this.setState({ inputFocused: true });
    onBlur = () => this.setState({ inputFocused: false });

    render() {
        const wrapClass = ['authorization__wrapper'];
        if (this.state.inputFocused) wrapClass.push('authorization__wrapper--animate');

        return (
            <div className="authorization">
                {this.state.inputFocused && <Backdrop z={1} click={this.onBlur} />}
                <Language class="authorization__lang" dropClass="dropdown--left-fix"/>
                <div className={wrapClass.join(' ')} onClick={() => this.onFocus()}>
                    <div className="authorization__head">
                        <Logo classImg="logo__figure--nav" />
                        <Link to="/signup" className="authorization__info authorization__info--heading">
                            <svg className="authorization__icon" dangerouslySetInnerHTML={{__html: utils.use('user-plus')}} />
                            Sign up
                        </Link>
                    </div>
                    {this.state.error && <p className="authorization__error mb-1">{this.state.error}</p>}
                    <form className="authorization__form">
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="text" 
                                placeholder="Your phone number" 
                                ref={this.loginRef}
                                value={this.state.number} 
                                onChange={(e) => this.onInputNumber(e.target.value)} />
                            <p className="authorization__label authorization__label--abs">Your number or email</p>
                        </label>
                        <label className="authorization__label">
                            <input 
                                className="authorization__input input" 
                                type="password" 
                                placeholder="Enter your password"
                                ref={this.passRef} />
                            <button type="button" className="authorization__btn--abs" onClick={(e) => this.onTogglePass(e)}>
                                <svg className="authorization__icon" dangerouslySetInnerHTML={{__html: utils.use('eye-off')}} />
                            </button>
                            <p className="authorization__label authorization__label--abs">Your password</p>
                        </label>
                        <div className="authorization__item mb-1">
                            <input type="checkbox" id="remember" className="checkbox" ref={this.checkboxRef} />
                            <label htmlFor="remember" className="label">
                                <span></span>
                                Stay logged in
                            </label>
                        </div>
                        <button className="btn btn__primary authorization__btn mb-1" onClick={(e) => this.onProceed(e)}>
                            Sign in
                            <svg className="icon ml-5 icon--8" dangerouslySetInnerHTML={{__html: utils.use('log-in')}} />
                        </button>
                        <Link to="/password-reset" className="authorization__info mb-15">Reset password</Link>
                        <p className="authorization__info">Do not have an account? <Link to="/signup" className="authorization__info--high">Sign up</Link></p>
                </form>
                </div>
            </div>
        )
    }
}

export default AuthSignin;