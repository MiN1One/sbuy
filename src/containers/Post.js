import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { withRouter } from 'react-router-dom';

import * as utils from '../utilities/utilities';
import Backdrop from '../UI/Backdrop';
import Dropdown from "../components/Dropdown";
import LoadingScreen from "../UI/LoadingScreen";

class Publish extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

            // -------- Data -----------

            business_type: 'Individual',
            adType: 'sell',
            mainTitle: '',
            description: '',
            currency: 'uzsom',
            numbers: ['+998994886928'],
            email: '',
            name: '',
            images: [],


            mileage: '',
            year: '',
            condition: 'new',
            type: 'boys',


            // -------------------------

            types: {
                sell: 'Sell',
                exchange: 'Exchange',
                give: 'Give away'
            },
            showCat: false,
            activeSubCat: null,
            subCatTitle: null,
            activeAfter: null,
            activeCat: null,
            error: null,

            categories: {},
            filterObj: null,
            loading: false
        };

        this.fileRef = React.createRef();
        this.priceInputRef = React.createRef();

        if (!this.props.token) this.props.history.push('/signin');
    }

    importCategories = () => {
        import(`../store/Categories/categories_${this.props.lang}`)
            .then(res => {
                this.setState({ categories: res.default });
            })
            .catch(er => console.log(er));
    }

    componentDidMount() {
        this.importCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeAfter !== prevState.activeAfter) {
            const category = this.state.categories[this.state.activeAfter].val;
            console.log(category);

            this.setState({ activeSubCat: null }, () => {
                console.log('hey')
                import(`../store/PostFilters/${this.props.lang}/${category}`)
                    .then(filter => {
                        this.setState({ filterObj: filter.default }, () => {
                            console.log(this.state.filterObj);
                        });
                    })
                    .catch(er => {
                        
                    });
            });
        }
        if (this.props.lang !== prevProps.lang) this.importCategories();
        if (!this.props.token) this.props.history.push('/signin');
    }

    onAddNumber = () => {
        if (this.state.numbers.length < 3) {
            this.setState(prevState => {
                const newNums = [...prevState.numbers, ''];
                return { numbers: newNums };
            });
        }
    }
    
    onInputNumber = (val, index) => {
        if (utils.isNum(parseInt(val)) || val === '' || val === '+') {
            this.setState(prevState => {
                const numbers = prevState.numbers.map((el, i) => {
                    if (i === index) return el = val;
                    else return el;
                });
                return { numbers };
            });
        }
    }

    onInputDescription = (e) => this.setState({ description: e.target.value });
    onInputTitle = (e) => this.setState({ mainTitle: e.target.value });


    onChangeCurrency = (c) => this.setState({ currency: c });
    onChangeBusinessType = (type) => this.setState({ business_type: type });
    onChangeAdType = (type) => this.setState({ adType: type });

    onOpenCatPop = () => {
        if (!this.props.class) this.setState({ showCat: true });
    }
    onCloseCatPop = () => this.setState({ showCat: false });

    setActiveCat = (cat) => this.setState({ activeCat: cat, activeAfter: cat, activeSubCat: null });
    unsetActiveCat = () => this.setState({ activeCat: null });

    onSelectSubCat = (subCat) => {
        this.setState({
            activeSubCat: subCat
        }, () => this.setState({ showCat: false, activeCat: null }));
    }

    appendImage = (el, files) => {
        const reader = new FileReader();

        reader.readAsDataURL(files);
        reader.onload = () => {

            const imgInitial = el.querySelector('.post__img');
            if (imgInitial) imgInitial.remove();

            const img = document.createElement('img');
            img.classList.add('post__img');
            img.src = reader.result;
            el.appendChild(img);
        };
    }

    onDeleteImage = (index) => {
        this.setState(prevState => {
            const images = prevState.images.filter((el, i) => i !== index);
            return { images };
        }, () => {
            const photoContainers = Array.from(document.querySelectorAll('.post__figure'));
            photoContainers[index].querySelector('.post__img').remove();

            console.log(this.state.images);

            this.state.images.forEach((el, i) => this.appendImage(photoContainers[i], el));

            const imageAfter = photoContainers[index + 1].querySelector('.post__img');
            if (imageAfter) imageAfter.remove();

            const imageLast = photoContainers[this.state.images.length].querySelector('.post__img');
            if (imageLast) imageLast.remove();
        });
    }

    onImageUpload = () => {
        const files = this.fileRef.current.files;

        if (files.length && this.state.images.length < 7) {
            let photos = Array.from(files).slice(0, 7);

            const largeFile = photos.find(el => el.size > 3500000);

            const fileTypeArr = photos.map(el => el.type.startsWith('image/'));
            const typeOk = !fileTypeArr.some(el => el === false);
            
            if (typeOk) {
                if (!largeFile) {

                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    }
                    
                    this.setState({ loading: true }, () => {
                        for (let i = 0; i < photos.length; i++) {
                            imageCompression(photos[i], options)
                                .then(cimage => {
                                    const file = new File([cimage], cimage.name);

                                    this.setState(prevState => {
                                        return { images: [...prevState.images, file] };
                                    }, () => {
                                        const photoContainers = Array.from(document.querySelectorAll('.post__figure'));
                                        
                                        this.state.images.forEach((el, i) => this.appendImage(photoContainers[i], el));
                                        this.setState({ error: null, loading: false });
                                    });
                                })
                                .catch(er => {
                                    this.setState({ error: er, loading: false });
                                });
                        }
                    });
                } else this.setState({ error: `File "${largeFile.name}" exceeded maximum size of 3.5MB` });
            } else this.setState({ error: 'Only image files are allowed' });
        }
    }

    onSubmitPost = () => {
        // this.state.mainTitle;
        // this.state.description;
        // this.state.type;
        // this.state.email;
        // this.state.name;
        // const numbers = this.state.numbers.filter(el => {
        //      if (el !== '') return el;
        //      return null;
        // });
        const price = this.priceInputRef.current.value;
        let category = this.state.categories[this.state.activeAfter];
        let subcategory = this.state.activeSubCat;
        
        if ((this.state.mainTitle && this.state.description && this.state.name) !== '' && (category.val && subcategory)) {
            if ((this.state.adType === 'sell') && (this.state.price !== '')) {
                console.log('nu che sellnem');
            }
            console.log(this.state);
            
    
            const formatData = new FormData();
            this.state.images.forEach(el => formatData.append('photos[]', el));
        }
    }

    onSetSpecification = (param, val) => {
        this.setState({ [param]: val }, () => console.log(this.state[param]));
    }

    render() {
        const typesArr = [];
        for (let key in this.state.types) {
            typesArr.push({
                id: key,
                value: this.state.types[key]
            })
        }
        const types = typesArr.map(el => {
            return (
                <div className="dropdown__item" key={el.id} onClick={() => this.onChangeAdType(el.id)}>
                    <div className="dropdown__link post__dropitem">{el.value}</div>
                </div>
            );
        });

        let subOptions = null, inputItems = null;
        if (this.state.filterObj && this.state.activeSubCat) {

            subOptions = this.state.filterObj.items[this.state.activeSubCat].sub.map((obj, index) => {
                
                const dropItems = obj.items.map((el, i) => {
                    return (
                        <div className="dropdown__item" key={i}>
                            <div className="dropdown__link post__dropitem" onClick={() => this.onSetSpecification(obj.val, el.val)}>{utils.capitalize(el.title)}</div>
                        </div>
                    );
                });

                const defaultTitle = obj.items.find(el => el.val === this.state[obj.val]).title;

                return (
                    <React.Fragment key={index}>
                        <p className="post__title mb-1">{obj.title}</p>
                        <div className="w-100 pos-rel mb-15">
                            <div className="post__input post__input--cat post__input--drop" tabIndex="0">
                                {defaultTitle}
                                <utils.use styleClass="icon post__icon icon post__icon--cat-arrow" svg="chevron-down" />
                            </div>
                            <Dropdown class="dropdown--full dropdown--close dropdown--sm-s post__dropdown">
                                {dropItems}
                            </Dropdown>
                        </div>
                    </React.Fragment>
                )
            });
        
            inputItems = this.state.filterObj.items[this.state.activeSubCat].inputs.map((el, i) => {
                return (
                    <div className="mb-15" key={i}>
                        <p className="post__title mb-1">{el.title}</p>
                        <input type="text" placeholder={el.title} className="post__input" onChange={() => {}} />
                    </div>
                );
            });

        }

        const catItemsArr = [];
        let subItems = null, catItems = null;
        if (this.state.categories) {
            for (let key in this.state.categories) {
                catItemsArr.push({
                    id: key,
                    title: this.state.categories[key].title,
                    icon: this.state.categories[key].icon
                });
            }
    
            catItems = catItemsArr.map((el) => {
                return (
                    <li 
                        className="cat__item"
                        key={el.id}
                        onClick={() => this.setActiveCat(el.id)}>
                        <div className="cat__link">
                            <div className="cat__group">
                                <utils.useCat styleClass="cat__i cat__i--cat" svg={el.icon} />
                                {el.title}
                            </div>
                            <utils.use styleClass="cat__i cat__i--arrow" svg="chevron-right" />
                        </div>
                    </li>
                );
            });
            
            if (this.state.activeCat) {
                subItems = this.state.categories[this.state.activeCat].subCategories.map((el, i) => {
                    return (
                        <li className="cat__subitem" key={i}>
                            <div className="cat__link cat__link--sub" onClick={() => this.onSelectSubCat(el.val)}>
                                <utils.use styleClass="cat__i cat__i--sub" svg="chevron-right" />
                                {el.title}
                            </div>
                        </li>
                    );
                });
            }

        }

        let title = null;
        if (this.state.activeSubCat && this.state.activeAfter) {
            title = this.state.categories[this.state.activeAfter].subCategories.find(el => el.val === this.state.activeSubCat).title;
        }

        const numbers = this.state.numbers.slice(1).map((el, i) => {
            return (
                <input 
                    type="text" 
                    placeholder="Your contact number" 
                    className="post__input post__input--singlebtn mb-15" 
                    value={this.state.numbers[i + 1]} 
                    onChange={(e) => this.onInputNumber(e.target.value, i + 1)} 
                    maxLength={15} />
            );
        });

        return (
            <React.Fragment>
                {this.state.loading && <LoadingScreen class="loadingScreen--abs" />}
                <section className={`post ${this.props.class || ''}`}>
                    <div className="container">
                        <div className="post__wrapper">
                            <div className="post__head">
                                <h2 className="heading heading__2 mb-1">Post new add</h2>
                                <span className="post__text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id tellus a eros vulputate euismod in at orci. Ut felis ipsum, bibendum vitae elit viverra, consectetur tincidunt lorem. Donec lectus.
                                </span>
                            </div>
                            {this.state.error && <p className="post__hint post__hint--red mb-2">{this.state.error}</p>}
                            <div className="post__main">
                                <div className="post__group">
                                    <p className="post__title mb-1">Add photos</p>
                                    <div className="post__uploadbox">
                                        <input 
                                            className="post__input d-none" 
                                            type="file" 
                                            multiple 
                                            accept="image/*"
                                            ref={this.fileRef} 
                                            onChange={() => this.onImageUpload()} />
                                        <div className="post__imagebox  post__imagebox--main">
                                            <figure className="post__figure post__figure--main" onClick={() => this.fileRef.current.click()}>
                                                <utils.use styleClass="post__icon post__icon--main mb-1" svg="image" />
                                                <span className="post__prompt">Click here to uload main photo</span>
                                            </figure>
                                            {this.state.images[0] && <div className="post__overlay">
                                                <button className="post__btn post__btn--delete" onClick={() => this.onDeleteImage(0)}>
                                                    <utils.use styleClass="post__icon post__icon--cat" svg="trash-2" />
                                                </button>
                                            </div>}
                                        </div>
                                        <div className="post__row">
                                            <div className="post__imagebox">
                                                <figure className="post__figure post__figure--small" onClick={() => this.fileRef.current.click()}>
                                                    <utils.use styleClass="post__icon" svg="plus" />
                                                </figure>
                                                {this.state.images[1] && <div className="post__overlay">
                                                    <button className="post__btn post__btn--sm post__btn--delete" onClick={() => this.onDeleteImage(1)}>
                                                        <utils.use styleClass="post__icon post__icon--cat post__icon--sm" svg="trash-2" />
                                                    </button>
                                                </div>}
                                            </div>
                                            <div className="post__imagebox">
                                                <figure className="post__figure post__figure--small" onClick={() => this.fileRef.current.click()}>
                                                    <utils.use styleClass="post__icon" svg="plus" />
                                                </figure>
                                                {this.state.images[2] && <div className="post__overlay">
                                                    <button className="post__btn post__btn--sm post__btn--delete" onClick={() => this.onDeleteImage(2)}>
                                                        <utils.use styleClass="post__icon post__icon--cat post__icon--sm" svg="trash-2" />
                                                    </button>
                                                </div>}
                                            </div>
                                            <div className="post__imagebox">
                                                <figure className="post__figure post__figure--small" onClick={() => this.fileRef.current.click()}>
                                                    <utils.use styleClass="post__icon" svg="plus" />
                                                </figure>
                                                {this.state.images[3] && <div className="post__overlay">
                                                    <button className="post__btn post__btn--sm post__btn--delete" onClick={() => this.onDeleteImage(3)}>
                                                        <utils.use styleClass="post__icon post__icon--cat post__icon--sm" svg="trash-2" />
                                                    </button>
                                                </div>}
                                            </div>
                                            <div className="post__imagebox">
                                                <figure className="post__figure post__figure--small" onClick={() => this.fileRef.current.click()}>
                                                    <utils.use styleClass="post__icon" svg="plus" />
                                                </figure>
                                                {this.state.images[4] && 
                                                    <div className="post__overlay">
                                                        <button className="post__btn post__btn--sm post__btn--delete" onClick={() => this.onDeleteImage(4)}>
                                                            <utils.use styleClass="post__icon post__icon--cat post__icon--sm" svg="trash-2" />
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                            <div className="post__imagebox">
                                                <figure className="post__figure post__figure--small" onClick={() => this.fileRef.current.click()}>
                                                    <utils.use styleClass="post__icon" svg="plus" />
                                                </figure>
                                                {this.state.images[5] && <div className="post__overlay">
                                                    <button className="post__btn post__btn--sm post__btn--delete" onClick={() => this.onDeleteImage(5)}>
                                                        <utils.use styleClass="post__icon post__icon--cat post__icon--sm" svg="trash-2" />
                                                    </button>
                                                </div>}
                                            </div>
                                            <div className="post__imagebox">
                                                <figure className="post__figure post__figure--small" onClick={() => this.fileRef.current.click()}>
                                                    <utils.use styleClass="post__icon" svg="plus" />
                                                </figure>
                                                {this.state.images[6] && <div className="post__overlay">
                                                    <button className="post__btn post__btn--sm post__btn--delete" onClick={() => this.onDeleteImage(6)}>
                                                        <utils.use styleClass="post__icon post__icon--cat post__icon--sm" svg="trash-2" />
                                                    </button>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="post__hint post__hint--left mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt nec nibh non porta. Donec.
                                    </p>
                                </div>
                                <div className="post__group">
                                    <p className="post__title mb-1">Main title</p>
                                    <label className="post__label">
                                        <input
                                            type="text"
                                            className="post__input post__input--title"
                                            placeholder="Enter Ad title"
                                            onChange={(e) => this.onInputTitle(e)}
                                            value={this.state.mainTitle} 
                                            maxLength="35" />
                                        <span className="post__counter mt-1">{35 - this.state.mainTitle.length} characters left</span>
                                    </label>
                                    <p className="post__hint mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus nibh vel hendrerit maximus. Proin imperdiet elit ipsum, in maximus lectus faucibus in. Praesent eu nunc ut quam mattis rhoncus.
                                    </p>
                                </div>
                                <div className="post__group">
                                    <p className="post__title mb-1">Category</p>
                                    {this.props.class && <p className="post__hint post__hint--red mb-1">You cannot change category</p>}
                                    <button className="post__input post__input--cat post__input--cat-main" onClick={() => this.onOpenCatPop()}>
                                        <span className="post__val">
                                            {this.state.activeAfter && <utils.useCat styleClass="post__icon post__icon--cat icon__dark mr-1" svg={this.state.categories[this.state.activeAfter].icon} />}
                                            {title ? title : 'Select category'}
                                        </span>
                                        <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-right" />
                                    </button>
                                    {this.state.activeAfter &&
                                        <React.Fragment>
                                            <div className="post__catselected post__input mt-1" onClick={() => this.onOpenCatPop()}>
                                                <ul className="post__list">
                                                    <li className="post__item">{this.state.categories[this.state.activeAfter].title}</li>
                                                    <li className="post__item">{title}</li>
                                                </ul>
                                                <button className="post__btn post__btn--catitems">
                                                    <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-right" />
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    }
                                    <p className="post__hint mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt nec nibh non porta. Donec.
                                    </p>
                                </div>
                                <div className="post__group post__group--details m-0">
                                    <div className="post__group">
                                        <div className="mb-15">
                                            <p className="post__title mb-1">Price</p>
                                            <div className="mb-1 w-100 pos-rel">
                                                <div className="post__input post__input--cat post__input--drop" tabIndex="0">
                                                    {this.state.types[this.state.adType]}
                                                    <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-down" />
                                                </div>
                                                <Dropdown class="dropdown--full dropdown--close dropdown--sm-s post__dropdown">
                                                    {types}
                                                </Dropdown>
                                            </div>
                                            {this.state.adType === 'sell' &&
                                                <div className="post__double-form">
                                                    <input type="text" placeholder="Price" className="post__input post__input--price mr-1" ref={this.priceInputRef} />
                                                    <div className="pos-rel">
                                                        <div className="post__input post__input--cat post__input--drop" tabIndex="0">
                                                            {this.state.currency.toUpperCase()}
                                                            <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-down" />
                                                        </div>
                                                        <Dropdown class="dropdown--full dropdown--close dropdown--sm-s post__dropdown">
                                                            <div className="dropdown__item" onClick={() => this.onChangeCurrency('usd')}>
                                                                <div className="dropdown__link post__dropitem post__dropitem--currency">USD</div>
                                                            </div>
                                                            <div className="dropdown__item" onClick={() => this.onChangeCurrency('uzsom')}>
                                                                <div className="dropdown__link post__dropitem post__dropitem--currency">UZSOM</div>
                                                            </div>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <p className="post__title mb-1">Type of business</p>
                                        <div className="w-100 pos-rel">
                                            <div className="post__input post__input--cat post__input--drop" tabIndex="0">
                                                {utils.capitalize(this.state.business_type)}
                                                <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-down" />
                                            </div>
                                            <Dropdown class="dropdown--full dropdown--close dropdown--sm-s post__dropdown">
                                                <div className="dropdown__item" onClick={() => this.onChangeBusinessType('individual')}>
                                                    <div className="dropdown__link post__dropitem">Individual</div>
                                                </div>
                                                <div className="dropdown__item" onClick={() => this.onChangeBusinessType('business')}>
                                                    <div className="dropdown__link post__dropitem">Business</div>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="post__group">{subOptions}</div>
                                    <div className="post__group">{inputItems}</div>
                                </div>
                                <div className="post__group post__group--des">
                                    <p className="post__title mb-1">Personalized description</p>
                                    <label className="post__label">
                                        <textarea 
                                            className="post__input post__input--des" 
                                            placeholder=" " 
                                            value={this.state.description}
                                            onChange={(e) => this.onInputDescription(e)}
                                            maxLength="4500"></textarea>
                                        <span className="post__counter mt-1">{4500 - this.state.description.length} characters left</span>
                                    </label>
                                    <p className="post__hint mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nulla porta, rutrum enim eget, luctus neque. Cras scelerisque imperdiet.
                                    </p>
                                </div>
                            </div>
                            <div className="post__head post__head--doubleline">
                                <h2 className="heading heading__2 mb-1">Contact details</h2>
                                <span className="post__text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis.
                                </span>
                            </div>
                            <div className="post__main">
                                <div className="post__group">
                                    <p className="post__title mb-1">Contact numbers</p>
                                    {this.state.numbers.length > 1 && <p className="post__text mb-1">If you do not want to add a number laeve number field empty</p>}
                                    <div className="post__double-form w-100 pos-rel">
                                        <input 
                                            type="text" 
                                            placeholder="Your contact number" 
                                            className="post__input mr-1" 
                                            value={this.state.numbers[0]} 
                                            onChange={(e) => this.onInputNumber(e.target.value, 0)} 
                                            maxLength={15} />
                                        <button className="post__input jc d-flex" onClick={() => this.onAddNumber()}>
                                            Add
                                            <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="plus" />
                                        </button>
                                    </div>
                                    {numbers}
                                    <p className="post__title mb-1 mt-15">Email address</p>
                                    <input 
                                        type="text"
                                        placeholder="Your email address (optional)"
                                        className="post__input mb-15"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value })} />
                                    <p className="post__title mb-1">Contact Name</p>
                                    <input 
                                        type="text"
                                        placeholder="Your contact name"
                                        className="post__input mb-15" 
                                        value={this.state.name}
                                        onChange={(e) => this.setState({ name: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="post__footer">
                            <div className="container">
                                <div className="post__footwrap">
                                    <button className="btn post__btn-main btn__primary" onClick={() => this.onSubmitPost()}>
                                        Post
                                        <utils.use styleClass="icon ml-5" svg="check-circle" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {(this.state.showCat && !this.props.class) &&
                    <div className="cat__container">
                        <Backdrop z={96} click={this.onCloseCatPop} />
                        {this.state.activeCat && <Backdrop z={9} click={this.unsetActiveCat} />}
                        <div className="cat cat--fix">
                            <ul className="cat__list cat__list--select">{catItems}</ul>
                            {this.state.activeCat && 
                                <div className="cat__panel">
                                    <div className="cat__subhead">
                                        <h2 className="cat__heading cat__heading--sub">
                                            {this.state.categories[this.state.activeCat].title}
                                            <utils.useCat styleClass="cat__i--large" svg={this.state.categories[this.state.activeCat].icon} />
                                        </h2>
                                        <button className="cat__btn cat__btn--sub" onClick={() => this.unsetActiveCat()}>
                                            <utils.use styleClass="cat__i cat__i--close" svg="x" />
                                        </button>
                                    </div>
                                    <ul className="cat__sublist">
                                        {subItems}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.localization.lang,
    token: state.user.token
});

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Publish));