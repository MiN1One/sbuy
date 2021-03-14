import axios from 'axios';
import React, { PureComponent } from 'react';
import imageCompression from 'browser-image-compression';

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
            loading: false,
            error: null,
            data: {
                image: avatar,
                name: '',
                email: '',
                number: '',
                company: ''
            }
        }

        this.figureRef = React.createRef();
        this.imgRef = React.createRef();

        this._isMounted = false;
    }

    onInputData = (val, name) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: val
            }
        }));
    }

    fetchData = () => {
        this.setState({ loading: true });
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                if (this._isMounted) {
                    console.log(res.data);
                    this.setState({ loading: false });
                }
            })
            .catch(er => {
                if (this._isMounted) {
                    console.error(er.message);
                    this.setState({ loading: false });
                }
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }

    componentWillUnmount() {
        this._isMounted = false;
        // source.cancel("Canceled");
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
        this.setState({ image: null });

        // -----------------

        // ....
    }

    selectImage = () => {
        if (this.imgRef.current.files.length) {

            const options = {
                maxSizeMB: .5,
                maxWidthOrHeight: 800,
                useWebWorker: true
            }
            
            imageCompression(this.imgRef.current.files[0], options)
                .then(cimage => {
                    const file = new File([cimage], cimage.name);

                    this.setState(prevState => ({ data: { ...prevState.data, image: file } }), 
                        () => {
                        this.appendImage(this.figureRef.current, this.state.data.image);
                        this.setState({ error: null });
                    });

                    const formData = new FormData();
                    formData.append('profileImage[]', this.state.data.image);
                })
                .catch(er => {
                    this.setState({ error: er });
                });


            // -------------------
            
            // .....
        }
    }
    
    render() {
        // Tranlations
        const { t } = this.props;

        let view = (
            <div className="profile__details">
                <div className="profile__text profile__text--name">
                    <p className="profile__title">{t('ad:name')}</p>
                    John Doe
                </div>
                <div className="profile__text">
                    <p className="profile__title">{t('ad:email')}</p>
                    johndoe@mail.eu
                </div>
                <div className="profile__text">
                    <p className="profile__title">{t('translation:nav.company')}</p>
                    Intech Ltd.
                </div>
                <div className="profile__text">
                    <p className="profile__title">{t('ad:phone number')}</p>
                    +651651 65165165 65
                </div>
            </div>
        );
        if (this.state.editMode) {
            view = (
                <div className="profile__details">
                    <div className="profile__text">
                        <label className="profile__title">{t('ad:name')}</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder={t('translation:input.your name')}
                            value={this.state.data.name} 
                            onChange={(e) => this.onInputData(e.target.value, 'name')} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">{t('ad:email')}</label>
                        <input 
                            className="profile__input input" 
                            type="email" 
                            placeholder={t('translation:input.your email')}
                            value={this.state.data.email} 
                            onChange={(e) => this.onInputData(e.target.value, 'email')} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">{t('translation:nav.company')}</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder={t('translation:input.your company')} 
                            value={this.state.data.company} 
                            onChange={(e) => this.onInputData(e.target.value, 'company')} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">Phone number</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder={t('translation:input.your number')} 
                            value={this.state.data.number} 
                            onChange={(e) => {
                                if (
                                    utils.isNum(parseInt(e.target.value)) || 
                                    e.target.value === '' || 
                                    e.target.value === '+'
                                    ) { this.onInputData(e.target.value, 'number'); }
                                }} />
                    </div>
                </div>
            );
        }

        if (this.state.loading) return <LoadingScreen class="loadingScreen--profile" />;

        return (
            <React.Fragment>
                <div className="profile__titlebar">
                    <h2 className="heading heading__2 profile__heading">{t('ad:user details')}</h2>
                    <button className="profile__btn profile__btn--rounded" onClick={() => this.onToggleEditMode()}>
                        <utils.use styleClass="profile__icon profile__icon--small" svg={this.state.editMode ? 'x' : 'edit-2'} />
                    </button>
                </div>
                <div className="profile__content">
                    {view}
                    <div className="d-flex ac fdc">
                        <div className="pos-rel d-inline mb-1">
                            <figure className="profile__figure" ref={this.figureRef}>
                                <img className="profile__img" alt="user" src={this.state.data.image} />
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
                        <p className="profile__hint tc">{t('ad:avatar warning')}</p>
                    </div>
                </div>
                <div className="profile__footer mt-15">
                    {this.state.editMode 
                        ? <React.Fragment>
                            {this.state.loading && <LoadingSub class="loader--small loader--grey" />}
                            <button className="ml-2 btn btn__primary btn__primary--outline" onClick={() => this.onSaveData()}>
                                {t('ad:save')}
                            </button>
                        </React.Fragment>
                        : <button className="ml-2 btn btn__red btn__red--outline" onClick={() => this.props.onLogOut()}>
                            {t('translation:nav.logout')}
                        </button>
                    }
                </div>
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
        this._isMounted = false;
    }

    onInputData = (val, name) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: val
            }
        }));
    }
    
    fetchData = () => {
        this.setState({ loading: true });
        axios('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setTimeout(() => {
                    if (this._isMounted) {
                        this.setState({ loading: false });
                    }
                }, 2000);
            })
            .catch(er => {
                
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }

    componentWillUnmount() {
        this._isMounted = false;
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

            const options = {
                maxSizeMB: .5,
                maxWidthOrHeight: 800,
                useWebWorker: true
            }
            
            imageCompression(this.imgRef.current.files[0], options)
                .then(cimage => {
                    const file = new File([cimage], cimage.name);

                    this.setState(prevState => ({ data: { ...prevState.data, image: file } }), 
                        () => {
                        this.appendImage(this.figureRef.current, this.state.data.image);
                        this.setState({ error: null });
                    });

                    const formData = new FormData();
                    formData.append('profileImage[]', this.state.data.image);
                })
                .catch(er => {
                    this.setState({ error: er });
                });


            // -------------------
            
            // .....
        }
    }

    removeImage = () => {
        this.figureRef.current.querySelector('.profile__img').remove();
        this.setState({ image: null });

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
        const { t } = this.props;

        let view = (
            <div className="profile__details">
                <div className="profile__text">
                    <p className="profile__title">{t('ad:company name')}</p>
                    Intech Ltd.
                </div>
                <div className="profile__text">
                    <p className="profile__title">{t('ad:email')}</p>
                    intech@enterprise.eu
                </div>
                <div className="profile__text">
                    <p className="profile__title">{t('ad:contact number')}</p>
                    +651651 65165165 65
                </div>
            </div>
        );
        if (this.state.editMode) {
            view = (
                <div className="profile__details">
                    <div className="profile__text">
                        <label className="profile__title">{t('ad:company name')}</label>
                        <input 
                            className="profile__input input" 
                            type="text" 
                            placeholder="Company name" 
                            value={this.state.data.name} 
                            onChange={(e) => this.onInputData(e.target.value, 'name')} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">{t('ad.company email')}</label>
                        <input 
                            className="profile__input input" 
                            type="email" 
                            placeholder={t('ad.company email')} 
                            value={this.state.data.email} 
                            onChange={(e) => this.onInputData(e.target.value, 'email')} />
                    </div>
                    <div className="profile__text">
                        <label className="profile__title">{t('ad:contact number')}</label>
                        <input className="profile__input input" type="text" placeholder="Company number" 
                            value={t('ad:contact number')}
                            onChange={(e) => {
                                if (
                                    utils.isNum(parseInt(e.target.value)) || 
                                    e.target.value === '' || 
                                    e.target.value === '+'
                                    ) { this.onInputData(e.target.value, 'number'); }
                                }} />
                    </div>
                </div>
            );
        }

        if (this.state.loading) return <LoadingScreen class="loadingScreen--profile" />;

        return (
            <React.Fragment>

                <div className="profile__titlebar">
                        <h2 className="heading heading__2 profile__heading">{t('ad:company details')}</h2>
                        <button className="profile__btn profile__btn--rounded" onClick={() => this.onToggleEditMode()}>
                            <utils.use styleClass="profile__icon profile__icon--small" svg="edit-2" />
                        </button>
                    </div>
                    <div className="profile__content">
                        {view}
                        <div>
                            <div className="pos-rel d-inline mb-1">
                                <figure className="profile__figure" ref={this.figureRef}>
                                    <img className="profile__img" alt="company" src={this.state.data.image} />
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
                            <p className="profile__hint tc">{t('ad:avatar warning')}</p>
                        </div>
                    </div>
                    {this.state.editMode && 
                        <div className="profile__footer mt-15">
                            {this.state.loading && <LoadingSub class="loader--small loader--grey" />}
                            <button className="ml-2 btn btn__primary btn__primary--outline" onClick={() => this.onSaveData()}>
                                {t('ad:save')}
                            </button>
                        </div>
                        }
            </React.Fragment>
        )
    }
}