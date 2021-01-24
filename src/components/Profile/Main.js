import React, { PureComponent } from 'react';

import avatar from '../../assets/images/32.jpg';
import company from '../../assets/images/intech-2.jpg';
import LoadingSub from '../../UI/LoadingSub';
import * as utils from '../../utilities/utilities';

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            contactEditMode: false,
            companyEditMode: false,
            loading: false,
            loadingCompany: false,
            imageAppended: false
        }

        this.contactFigRef = React.createRef();
        this.companyFigRef = React.createRef();

        this.imgRef = React.createRef();
        this.companyRef = React.createRef();

        this.nameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.numberInputRef = React.createRef();
        this.companyInputRef = React.createRef();
        
        this.emailCompanyInputRef = React.createRef();
        this.numberCompanyInputRef = React.createRef();
        this.nameCompanyInputRef = React.createRef();
    }

    onToggleContactEditMode = () => this.setState(prevState => {
        return { contactEditMode: !prevState.contactEditMode }
    });
    onToggleCompanyEditMode = () => this.setState(prevState => {
        return { companyEditMode: !prevState.companyEditMode }
    });

    onSaveContactData = () => {
        const name = this.nameInputRef.current.value;
        const email = this.emailInputRef.current.value;
        const number = this.numberInputRef.current.value;
        const company = this.companyInputRef.current.value;

        // ---------------
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false }, () => this.setState({ contactEditMode: false }));
        }, 50000000);
        // ....
    }
    
    onSaveCompanyData = () => {
        const nameCompany = this.nameCompanyInputRef.current.value;
        const emailCompany = this.emailCompanyInputRef.current.value;
        const numberCompany = this.numberCompanyInputRef.current.value;
        
        // ---------------
        this.setState({ loadingCompany: true });
        setTimeout(() => this.setState({ loadingCompany: false }, () => this.setState({ companyEditMode: false })), 2000);

        // ....
    }

    appendImage = (el, file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            let image = el.querySelector('.profile__img');
            if (!image) {
                image = document.createElement('img');
                image.classList.add('profile__img');
                el.appendChild(image);
            }
            image.src = reader.result;
        };
    };

    removeContactImage = () => {
        this.contactFigRef.current.querySelector('.profile__img').remove();

        // -----------------

        // ....
    }

    removeComapnyImage = () => {
        this.companyFigRef.current.querySelector('.profile__img').remove();

        // -----------------

        // ....
    }

    appendContactImg = () => {
        if (this.imgRef.current.files.length) {
            this.appendImage(this.contactFigRef.current, this.imgRef.current.files[0]);
            
            const formData = new FormData();
            formData.append('profileImage[]', this.imgRef.current.files[0]);

            // -------------------
            
            // .....
        }
    }
    
    appendCompanyImg = () => {
        if (this.companyRef.current.files.length) {
            this.appendImage(this.companyFigRef.current, this.companyRef.current.files[0]);
            
            const formData = new FormData();
            formData.append('profileImage[]', this.companyRef.current.files[0]);
            
            // -------------------
            
            // .....
        }
    }
    
    render() {
        let contactView = (
            <div className="profile__details">
                <div className="profile__text profile__text--name">
                    <p className="profile__title">Name</p>
                    John Doe
                </div>
                <div className="profile__text">
                    <p className="profile__title">Email</p>
                    johndoe@mail.eu
                </div>
                <div className="profile__text">
                    <p className="profile__title">Company</p>
                    Intech Ltd.
                </div>
                <div className="profile__text">
                    <p className="profile__title">Phone number</p>
                    +651651 65165165 65
                </div>
            </div>
        );
        if (this.state.contactEditMode) {
            contactView = (
                <div className="profile__details">
                    <div className="profile__text">
                        <label className="profile__title">Name</label>
                        <input className="profile__input input" type="text" placeholder="Your name" ref={this.nameInputRef} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Email</label>
                        <input className="profile__input input" type="text" placeholder="Your email" ref={this.emailInputRef} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Company</label>
                        <input className="profile__input input" type="text" placeholder="Company name" ref={this.companyInputRef} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Phone number</label>
                        <input className="profile__input input" type="text" placeholder="Your number" ref={this.numberInputRef} />
                    </div>
                </div>
            );
        }
        let companyView = (
            <div className="profile__details">
                <div className="profile__text">
                    <p className="profile__title">Company Name</p>
                    Intech Ltd.
                </div>
                <div className="profile__text">
                    <p className="profile__title">Email</p>
                    intech@enterprise.eu
                </div>
                <div className="profile__text">
                    <p className="profile__title">Phone number</p>
                    +651651 65165165 65
                </div>
            </div>
        );
        if (this.state.companyEditMode) {
            companyView = (
                <div className="profile__details">
                    <div className="profile__text">
                        <label className="profile__title">Company Name</label>
                        <input className="profile__input input" type="text" placeholder="Company name" ref={this.nameCompanyInputRef} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Email</label>
                        <input className="profile__input input" type="text" placeholder="Company email" ref={this.emailCompanyInputRef} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Phone number</label>
                        <input className="profile__input input" type="text" placeholder="Company number" ref={this.numberCompanyInputRef} />
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="profile__titlebar">
                    <h2 className="heading heading__2 profile__heading">Contact details</h2>
                    <button className="profile__btn profile__btn--rounded" onClick={() => this.onToggleContactEditMode()}>
                        <svg className="profile__icon profile__icon--small" dangerouslySetInnerHTML={{__html: utils.use(this.state.contactEditMode ? 'x' : 'edit-2')}} />
                    </button>
                </div>
                <div className="profile__content">
                    {contactView}
                    <div>
                        <div className="pos-rel d-inline mb-1">
                            <figure className="profile__figure" ref={this.contactFigRef}>
                                <img className="profile__img" alt="user" src={avatar} />
                                <svg className="profile__icon profile__icon--big" dangerouslySetInnerHTML={{__html: utils.use('user')}} />
                            </figure>
                            <input className="d-none" type="file" ref={this.imgRef} onChange={() => this.appendContactImg()} />
                            <div className="profile__btn--img">
                                {this.state.contactEditMode && <button className="mr-5 profile__btn profile__btn--rounded" onClick={() => this.removeContactImage()}>
                                    <svg className="profile__icon profile__icon--small" dangerouslySetInnerHTML={{__html: utils.use('trash-2')}} />
                                </button>}
                                <button className="profile__btn profile__btn--rounded" onClick={() => this.imgRef.current.click()}>
                                    <svg className="profile__icon profile__icon--small" dangerouslySetInnerHTML={{__html: utils.use('camera')}} />
                                </button>
                            </div>
                        </div>
                        <p className="profile__hint tc">Image size and resolution<br/>should not exceed<br/>1MB and 500x500px</p>
                    </div>
                </div>
                {this.state.contactEditMode && 
                    <div className="profile__footer mt-15">
                        {this.state.loading && <LoadingSub class="loader--small loader--grey" />}
                        <button className="ml-2 btn btn__primary" onClick={() => this.onSaveContactData()}>
                            Save
                            <svg className="icon icon--8 ml-5" dangerouslySetInnerHTML={{__html: utils.use('save')}} />
                        </button>
                    </div>
                }
                <div className="profile__titlebar">
                    <h2 className="heading heading__2 profile__heading">Company details</h2>
                    <button className="profile__btn profile__btn--rounded" onClick={() => this.onToggleCompanyEditMode()}>
                        <svg className="profile__icon profile__icon--small" dangerouslySetInnerHTML={{__html: utils.use(this.state.companyEditMode ? 'x' : 'edit-2')}} />
                    </button>
                </div>
                <div className="profile__content">
                    {companyView}
                    <div>
                        <div className="pos-rel d-inline mb-1">
                            <figure className="profile__figure" ref={this.companyFigRef}>
                                <img className="profile__img" alt="user" src={company} />
                                <svg className="profile__icon profile__icon--big" dangerouslySetInnerHTML={{__html: utils.use('image')}} />
                            </figure>
                            <input className="d-none" type="file" ref={this.companyRef} onChange={() => this.appendCompanyImg()} />
                            
                            <div className="profile__btn--img">
                                {this.state.companyEditMode && <button className="mr-5 profile__btn profile__btn--rounded" onClick={() => this.removeComapnyImage()}>
                                    <svg className="profile__icon profile__icon--small" dangerouslySetInnerHTML={{__html: utils.use('trash-2')}} />
                                </button>}
                                <button className="profile__btn profile__btn--rounded" onClick={() => this.companyRef.current.click()}>
                                    <svg className="profile__icon profile__icon--small" dangerouslySetInnerHTML={{__html: utils.use('camera')}} />
                                </button>
                            </div>
                        </div>
                        <p className="profile__hint tc">Image size and resolution<br/>should not exceed<br/>1MB and 500x500px</p>
                    </div>
                </div>
                {this.state.companyEditMode && 
                    <div className="profile__footer mt-15">
                        {this.state.loadingCompany && <LoadingSub />}
                        <button className="ml-2 btn btn__primary" onClick={() => this.onSaveCompanyData()}>
                            Save
                            <svg className="icon icon--8 ml-5" dangerouslySetInnerHTML={{__html: utils.use('save')}} />
                        </button>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default Main;