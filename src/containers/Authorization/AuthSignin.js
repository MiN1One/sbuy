import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as emailValidator from 'email-validator';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

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

    componentWillUnmount() {
        this.setState({ error: null, number: '' });
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
            const data = {
                phone: mainInput,
                password: password.value,
                // email: 'test@mail.eu',
            };
            axios.post('http://api.soybaliq.uz/api/auth/login', data)
                .then(res => {
                    const { access_token } = res.data;
                    this.props.onLogin(access_token);

                    if (remember) localStorage.setItem('auth-token', access_token);
                    else localStorage.removeItem('auth-token');

                    this.setState({ error: null });
                    this.props.history.replace('/');
                }).catch(er => {
                    console.log(er);
                    this.setState({ error: er.message });
                });
            // ..........
        } else {
            this.loginRef.current.setCustomValidity('Empty');
            this.passRef.current.setCustomValidity('Empty');
            this.loginRef.current.focus();
            this.setState({ error: 'Please fill out all of the fields' });
        }
    }

    onInputNumber = (val) => {
        this.setState({ number: val });
        // if (utils.isNum(parseInt(val)) || val === '+' || val === '') this.setState({ number: val });
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
        const wrapClass = ['a__wrapper'];
        if (this.state.inputFocused) wrapClass.push('a__wrapper--animate');

        return (
            <div className="a">
                {this.state.inputFocused && <Backdrop z={1} click={this.onBlur} />}
                <Language class="a__lang" dropClass="dropdown--left-fix"/>
                <div className={wrapClass.join(' ')} onClick={() => this.onFocus()}>
                    <div className="a__head">
                        <Logo classImg="logo__figure--nav" />
                        <Link to="/signup" className="a__info a__info--heading">
                            <utils.use styleClass="a__icon" svg="user-plus" />
                            Sign up
                        </Link>
                    </div>
                    {this.state.error && <p className="a__error mb-1">{this.state.error}</p>}
                    <form className="a__form">
                        <label className="a__label">
                            <input 
                                className="a__input input" 
                                type="text" 
                                placeholder="Your phone number or email" 
                                ref={this.loginRef}
                                value={this.state.number} 
                                onChange={(e) => this.onInputNumber(e.target.value)} />
                            <p className="a__label a__label--abs">Your number or email</p>
                        </label>
                        <label className="a__label">
                            <input 
                                className="a__input input" 
                                type="password" 
                                placeholder="Enter your password"
                                ref={this.passRef} />
                            <button type="button" className="a__btn--abs" onClick={(e) => this.onTogglePass(e)}>
                                <svg className="a__icon" dangerouslySetInnerHTML={{__html: utils.use('eye-off')}} />
                            </button>
                            <p className="a__label a__label--abs">Your password</p>
                        </label>
                        <div className="a__item mb-1">
                            <input type="checkbox" id="remember" className="checkbox" ref={this.checkboxRef} />
                            <label htmlFor="remember" className="label">
                                <span></span>
                                Stay logged in
                            </label>
                        </div>
                        <button className="btn btn__primary a__btn mb-1" onClick={(e) => this.onProceed(e)}>
                            Sign in
                            <utils.use styleClass="icon ml-5 icon--8" svg="log-in" />
                        </button>
                        <Link to="/password-reset" className="a__info mb-15">Reset password</Link>
                        <p className="a__info">Do not have an account? <Link to="/signup" className="a__info--high">Sign up</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.localization.lang,
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({
    onLogin: (token) => dispatch(actions.logIn(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignin);