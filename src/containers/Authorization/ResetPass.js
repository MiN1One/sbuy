import React, { Component } from 'react';
import * as emailValidator from 'email-validator';
import { withRouter, Link } from 'react-router-dom';

import Backdrop from '../../UI/Backdrop';
import Language from '../../components/Language';
import Logo from '../../components/Logo';
import * as utils from '../../utilities/utilities';

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFocused: false,
            showNextStep: false,
            error: null,
            success: false,
            attempted: false,
            number: false,
            time: 300
        }

        this.phoneRef = React.createRef();
        this.codeFieldRef = React.createRef();
    }

    componentWillUnmount() {
        this.setState({ error: null, number: '' });
    }

    onFocus = () => this.setState({ inputFocused: true });
    onBlur = () => this.setState({ inputFocused: false });

    timerWait = () => {
        if (this.state.time > 0) 
            this.setState((prevState) => {
                return { time: prevState.time - 1 }
            });
    }

    validate = (num, email) => {
        if (num && num.length < 9) {
            this.phoneRef.current.setCustomValidity('Invalid phone number');
            this.setState({ error: 'Please, enter valid phone number' });
            return false;
        } else if (email && !emailValidator.validate(this.phoneRef.current.value)) {
            this.phoneRef.current.setCustomValidity('Please, enter valid email address');
            this.setState({ error: 'Please, enter valid email address' });
            return false;
        } else {
            this.phoneRef.current.setCustomValidity('');
            this.setState({ error: null });
            return true;
        }
    }

    makeHttp = (login, query) => {
        window.location.hash = '#reset';
    }

    onProceed = (e) => {
        e.preventDefault();
        const mainInput = this.phoneRef.current;
        const code = this.codeFieldRef.current;

        if (mainInput.value !== '') {
            let isNum = utils.isNum(parseInt(mainInput.value));
            if (mainInput.value.includes('+')) isNum = true;

            let query = isNum ? 'phone' : 'email';
            if (isNum) this.setState({ number: true });
            let valid = false;
            if (isNum) valid = this.validate(mainInput.value);
            else valid = this.validate(null, mainInput.value);

            if (!this.state.attempted) {
    
                if (valid) {
                    const timer = setInterval(this.timerWait, 1000);
                    this.setState({
                        showNextStep: true,
                        attempted: true
                    });
                }

            } else if (this.state.attempted && valid) {
                if (code.value !== '') this.makeHttp(mainInput.value, query);
                else if (this.state.time === 0) {
                    this.setState({ time: 300 });
                    code.focus();
                }
            }
        } else {
            mainInput.focus();
            mainInput.setCustomValidity('Please, enter your email address or phone number');
            return this.setState({ error: 'Please, enter your email address or phone number' });
        }
    }

    render() {
        const wrapClass = ['a__wrapper'];
        if (this.state.inputFocused) wrapClass.push('a__wrapper--animate');

        return (
            <div className="a">
                {this.state.inputFocused && <Backdrop z={1} click={this.onBlur} />}
                <Language class="a__lang" dropClass="dropdown--left-fix"/>
                <form className={wrapClass.join(' ')} onClick={() => this.onFocus()}>
                    <div className="a__head">
                        <Logo classImg="logo__figure--nav" />
                        <Link to="/signin" className="a__info a__info--heading">
                            <utils.use styleClass="a__icon" svg="log-in" />
                            Sign in
                        </Link>
                    </div>
                    <div className="a__form">
                        <p className="a__info a__info--heading mb-1">Reset password</p>
                        {this.state.attempted && 
                            <p className="a__error a__error--success mb-2">
                                <utils.use styleClass="a__icon" svg={this.state.number ? 'phone' : 'mail'} />
                                The code is sent to your {this.state.number ? 'phone number' : 'email'}
                            </p>
                        }
                        {this.state.error && <p className="a__error mb-1">{this.state.error}</p>}
                        <label className="a__label">
                            <input 
                                className="a__input a__input--res input" 
                                type="text" 
                                placeholder="Your number or email"
                                ref={this.phoneRef} />
                            <p className="a__label a__label--abs">Your number or email</p>
                        </label>
                        {this.state.showNextStep && 
                            <React.Fragment>
                                <label className="a__label">
                                    <input 
                                        className="a__input a__input--res input" 
                                        type="text" 
                                        placeholder="Enter the code" 
                                        required
                                        autoFocus 
                                        ref={this.codeFieldRef} />
                                    <p className="a__label a__label--abs">The code your recieved</p>
                                </label>
                            </React.Fragment>
                        }
                        <button className="btn btn__primary btn__primary--green a__btn" onClick={(e) => this.onProceed(e)}>
                            Reset Password
                            <utils.use styleClass="icon ml-5 icon--8" svg="key" />
                        </button>
                        {!this.state.showNextStep && 
                            <p className="a__info mt-1">Do not have an account?&nbsp;<Link to="/signup" className="a__info--high">Sign up</Link></p>
                        }
                        {(this.state.attempted && this.state.time > 0) && <p className="a__label a__label--timer mt-1">You can request another code in {this.state.time}</p>}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(ResetPass);