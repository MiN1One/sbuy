import axios from 'axios';
import React, { PureComponent } from 'react';

import avatar from '../../assets/images/32.jpg';
import company from '../../assets/images/intech-2.jpg';
import LoadingScreen from '../../UI/LoadingScreen';
import LoadingSub from '../../UI/LoadingSub';
import * as utils from '../../utilities/utilities';

export class User extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            image: company,
            loading: false,
            data: {
                name: '',
                email: '',
                number: '',
                company: ''
            }
        }

        this.figureRef = React.createRef();
        this.imgRef = React.createRef();
    }

    fetchData = () => {
        this.setState({ loading: true });
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setTimeout(() => {
                    
                    this.setState({ loading: false });
                }, 2000);
            })
            .catch(er => {
                
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    onToggleEditMode = () => this.setState(prevState => {
        return { editMode: !prevState.editMode, loading: false }
    });

    onSaveData = () => {

        // ---------------
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false }, () => this.setState({ editMode: false }));
        }, 2000);
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
    }

    removeImage = () => {
        this.figureRef.current.querySelector('.profile__img').remove();

        // -----------------

        // ....
    }

    selectImage = () => {
        if (this.imgRef.current.files.length) {
            this.appendImage(this.figureRef.current, this.imgRef.current.files[0]);
            
            const formData = new FormData();
            formData.append('profileImage[]', this.imgRef.current.files[0]);

            // -------------------
            
            // .....
        }
    }
    
    render() {
        let view = (
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
        if (this.state.editMode) {
            view = (
                <div className="profile__details">
                    <div className="profile__text">
                        <label className="profile__title">Name</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder="Your name" 
                            value={this.state.data.name} 
                            onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Email</label>
                        <input 
                            className="profile__input input" 
                            type="email" 
                            placeholder="Your email" 
                            value={this.state.data.email} 
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Company</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder="Company name" 
                            value={this.state.data.company} 
                            onChange={(e) => this.setState({ company: e.target.value })} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Phone number</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder="Your number" 
                            value={this.state.data.number} 
                            onChange={(e) => {
                                if (utils.isNum(parseInt(e.target.value)) || e.target.value === '')
                                    this.setState({ number: e.target.value });
                                }} />
                    </div>
                </div>
            );
        }

        if (this.state.loading) return <LoadingScreen class="loadingScreen--profile" />;

        return (
            <React.Fragment>
                <div className="profile__titlebar">
                    <h2 className="heading heading__2 profile__heading">Contact details</h2>
                    <button className="profile__btn profile__btn--rounded" onClick={() => this.onToggleEditMode()}>
                        <utils.use styleClass="profile__icon profile__icon--small" svg={this.state.editMode ? 'x' : 'edit-2'} />
                    </button>
                </div>
                <div className="profile__content">
                    {view}
                    <div>
                        <div className="pos-rel d-inline mb-1">
                            <figure className="profile__figure" ref={this.figureRef}>
                                <img className="profile__img" alt="user" src={avatar} />
                                <utils.use styleClass="profile__icon profile__icon--big" svg="user" />
                            </figure>
                            <input className="d-none" type="file" ref={this.imgRef} onChange={() => this.selectImage()} />
                            <div className="profile__btn--img">
                                {this.state.editMode && <button className="mr-5 profile__btn profile__btn--rounded" onClick={() => this.removeImage()}>
                                    <utils.use styleClass="profile__icon profile__icon--small" svg="trash-2" />
                                </button>}
                                <button className="profile__btn profile__btn--rounded" onClick={() => this.imgRef.current.click()}>
                                    <utils.use styleClass="profile__icon profile__icon--small" svg="camera" />
                                </button>
                            </div>
                        </div>
                        <p className="profile__hint tc">Image size and resolution<br/>should not exceed<br/>1MB and 500x500px</p>
                    </div>
                </div>
                {this.state.editMode && 
                    <div className="profile__footer mt-15">
                        {this.state.loading && <LoadingSub class="loader--small loader--grey" />}
                        <button className="ml-2 btn btn__primary btn__primary--outline" onClick={() => this.onSaveData()}>
                            Save
                        </button>
                    </div>
                }
            </React.Fragment>
        );
    }
}








export class Company extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            loading: false,
            data: {
                image: company,
                email: '',
                number: '',
                name: ''
            }
        }

        this.figureRef = React.createRef();
        this.imgRef = React.createRef();
    }
    
    fetchData = () => {
        this.setState({ loading: true });
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setTimeout(() => {
                    
                    this.setState({ loading: false });
                }, 2000);
            })
            .catch(er => {
                
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    onToggleEditMode = () => this.setState(prevState => {
        return { editMode: !prevState.editMode, loading: false }
    });

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
    }

    selectImage = () => {
        if (this.imgRef.current.files.length) {
            this.appendImage(this.figureRef.current, this.imgRef.current.files[0]);
            
            const formData = new FormData();
            formData.append('profileImage[]', this.imgRef.current.files[0]);
            
            // -------------------
            
            // .....
        }
    }

    removeImage = () => {
        this.figureRef.current.querySelector('.profile__img').remove();

        // -----------------

        // ....
    }

    onSaveData = () => {
        
        // ---------------
        this.setState({ loading: true });
        setTimeout(() => this.setState({ loading: false }, () => this.setState({ editMode: false })), 2000);

        // ....
    }

    render() {
        let view = (
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
                    <p className="profile__title">Contact number</p>
                    +651651 65165165 65
                </div>
            </div>
        );
        if (this.state.editMode) {
            view = (
                <div className="profile__details">
                    <div className="profile__text">
                        <label className="profile__title">Company Name</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder="Company name" 
                            value={this.state.data.name} 
                            onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Email</label>
                        <input 
                            className="profile__input input" 
                            type="email" 
                            placeholder="Company email" 
                            value={this.state.data.email} 
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Contact number</label>
                        <input className="profile__input input" type="text" placeholder="Company number" 
                            value={this.state.data.number} 
                            onChange={(e) => {
                                if (utils.isNum(parseInt(e.target.value)) || e.target.value === '')
                                    this.setState({ number: e.target.value });
                                }} />
                    </div>
                </div>
            );
        }

        if (this.state.loading) return <LoadingScreen class="loadingScreen--profile" />;

        return (
            <React.Fragment>

                <div className="profile__titlebar">
                        <h2 className="heading heading__2 profile__heading">Company details</h2>
                        <button className="profile__btn profile__btn--rounded" onClick={() => this.onToggleEditMode()}>
                            <utils.use styleClass="profile__icon profile__icon--small" svg="edit-2" />
                        </button>
                    </div>
                    <div className="profile__content">
                        {view}
                        <div>
                            <div className="pos-rel d-inline mb-1">
                                <figure className="profile__figure" ref={this.figureRef}>
                                    <img className="profile__img" alt="user" src={company} />
                                    <utils.use styleClass="profile__icon profile__icon--big" svg="image" />
                                </figure>
                                <input className="d-none" type="file" ref={this.imgRef} onChange={() => this.selectImage()} />
                                
                                <div className="profile__btn--img">
                                    {this.state.editMode && <button className="mr-5 profile__btn profile__btn--rounded" onClick={() => this.removeImage()}>
                                        <utils.use styleClass="profile__icon profile__icon--small" svg="trash-2" />
                                    </button>}
                                    <button className="profile__btn profile__btn--rounded" onClick={() => this.imgRef.current.click()}>
                                        <utils.use styleClass="profile__icon profile__icon--small" svg="camera" />
                                    </button>
                                </div>
                            </div>
                            <p className="profile__hint tc">Image size and resolution<br/>should not exceed<br/>1MB and 500x500px</p>
                        </div>
                    </div>
                    {this.state.editMode && 
                        <div className="profile__footer mt-15">
                            {this.state.loading && <LoadingSub class="loader--small loader--grey" />}
                            <button className="ml-2 btn btn__primary btn__primary--outline" onClick={() => this.onSaveData()}>
                                Save
                            </button>
                        </div>
                        }
            </React.Fragment>
        )
    }
}