import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { withRouter } from 'react-router-dom';
import { withTranslation } from "react-i18next";

import * as utils from '../../utilities/utilities';
import Dropdown from '../../UI/Dropdown';
import LoadingScreen from '../../UI/LoadingScreen';
import './Post.scss';

class Post extends PureComponent {
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

            filterObj: null,
            loading: false,
            categoriesComponent: null
        };

        this.filesRef = React.createRef();
        this.priceInputRef = React.createRef();

        if (!this.props.token) this.props.history.push('/signin');
    }

    watchMedia = () => {
        if (this.props.mobile && !this.props.edit) this.setState({ categoriesComponent: React.lazy(() => import('../../components/MobileCats/MobileCats')) });
        else if (!this.props.mobile) this.setState({ categoriesComponent: React.lazy(() => import('../../components/CategoriesFull/CategoriesFull')) });
    }

    componentDidMount() {
        this.watchMedia();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mobile !== this.props.mobile) this.watchMedia();
        if (
            (this.state.activeAfter !== prevState.activeAfter && this.props.categories) ||
            (this.state.activeAfter && this.props.i18n.language !== prevProps.i18n.language && this.props.categories)
           )
        {
            const category = this.props.categories[this.state.activeAfter].val;

            this.setState({ activeSubCat: null }, () => {
                import(`../../store/PostFilters/${this.props.i18n.language}/${category}`)
                    .then(filter => {
                        this.setState({ filterObj: filter.default }, () => {
                            console.log(this.state.filterObj);
                        });
                    })
                    .catch(er => {
                        console.error(er);
                    });
            });
        }
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
        if (!this.props.edit) this.setState({ showCat: true });
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

            this.state.images.forEach((el, i) => this.appendImage(photoContainers[i], el));

            const imageAfter = photoContainers[index + 1].querySelector('.post__img');
            if (imageAfter) imageAfter.remove();

            const imageLast = photoContainers[this.state.images.length].querySelector('.post__img');
            if (imageLast) imageLast.remove();
        });
    }

    onImageUpload = () => {
        const files = this.filesRef.current.files;
        const numOfImagesAllowed = this.state.filterObj ? this.state.filterObj.imagesAllowed : 5;
        console.log(numOfImagesAllowed)

        if (this.state.images.length < numOfImagesAllowed) {
            let photos = Array.from(files).slice(0, numOfImagesAllowed);

            const largeFile = photos.find(el => el.size > 3500000);
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
                                    this.filesRef.current.value = '';
                                });
                            })
                            .catch(er => {
                                this.setState({ error: er, loading: false });
                                this.filesRef.current.value = '';
                            });
                    }
                });
            } else this.setState({ error: `File "${largeFile.name}" exceeded maximum size of 3.5MB` });
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
        let category = this.props.categories[this.state.activeAfter];
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

    render() {
        const { t } = this.props;

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

        let subOptions = null, 
            inputItems = null,
            numOfImages = 5;

        if (this.state.filterObj && this.state.activeSubCat) {

            subOptions = this.state.filterObj.items[this.state.activeSubCat].sub.map((obj, index) => {
                
                const dropItems = obj.items.map((el, i) => {
                    return (
                        <div className="dropdown__item" key={i}>
                            <div 
                                className="dropdown__link post__dropitem" 
                                onClick={() => this.setState({ [obj.val]: el.val })}>
                                    {utils.capitalize(el.title)}
                            </div>
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
                        <input 
                            type="text" 
                            placeholder={el.title} 
                            className="post__input" 
                            onChange={(e) => this.setState({ [el.val]: e.target.value })} />
                    </div>
                );
            });

            numOfImages = this.state.filterObj.imagesAllowed || numOfImages;
        }

        let title = null;
        if (this.state.activeSubCat && this.state.activeAfter) {
            title = this.props.categories[this.state.activeAfter].subCategories.find(el => el.val === this.state.activeSubCat).title;
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

        const Categories = this.state.categoriesComponent && this.state.categoriesComponent;
        let categories = null;
        if (!this.props.edit && Categories) {
            categories = <Categories 
                clickMain={this.setActiveCat}
                clickSub={this.onSelectSubCat} 
                close={this.onCloseCatPop} 
                categories={this.props.categories} />;
    
            if (this.props.mobile) {
                categories = <Categories
                    clickMain={this.setActiveCat}
                    clickSub={this.onSelectSubCat} 
                    categories={this.props.categories} 
                    fixed
                    close={this.onCloseCatPop} />;
            }
        }

        const imageFields = Array.from(Array(numOfImages).keys()).map((el, i) => {
            return (
                <div className="post__imagebox" key={i}>
                    <figure 
                        className="post__figure" 
                        onClick={() => this.filesRef.current.click()}>
                            <utils.use 
                                styleClass={`post__icon ${i === 0 ? 'post__icon--main mb-1' : ''}`} 
                                svg={i === 0 ? 'image' : 'plus'} />
                            {i === 0 && (
                                    !this.state.images[0] && <span className="post__prompt">{t('ad:click to upload')}</span>
                                )
                            }
                    </figure>
                    {this.state.images[i] && 
                        <div className="post__overlay">
                            <button className="post__btn post__btn--delete" onClick={() => this.onDeleteImage(i)}>
                                <utils.use styleClass="post__icon post__icon--cat" svg="trash-2" />
                            </button>
                        </div>
                    }
                </div>
            );
        });

        return (
            <React.Fragment>
                {this.state.loading && <LoadingScreen class="loadingScreen--abs" />}
                <section className={`post ${this.props.edit ? 'post--edit' : ''}`}>
                    <div className="container">
                        <div className="post__wrapper">
                            {!this.props.edit && 
                                <div className="post__head">
                                    <h2 className="heading heading__2 mb-1">{t('ad:post new')}</h2>
                                    <span className="post__text">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id tellus a eros vulputate euismod in at orci. Ut felis ipsum, bibendum vitae elit viverra, consectetur tincidunt lorem. Donec lectus.
                                    </span>
                                </div>
                            }
                            {this.state.error && <p className="post__hint post__hint--red mb-2">{this.state.error}</p>}
                            <div className="post__main">
                                <div className="post__group">
                                    <p className="post__title mb-1">{t('ad:post new')}</p>
                                    <div className="post__uploadbox">
                                        {imageFields}
                                        <input 
                                            className="post__input d-none" 
                                            type="file" 
                                            multiple 
                                            accept="image/*"
                                            ref={this.filesRef} 
                                            onChange={() => this.onImageUpload()} />
                                    </div>
                                    
                                    <p className="post__hint post__hint--left mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt nec nibh non porta. Donec.
                                    </p>
                                </div>
                                <div className="post__group post__group--title">
                                    <p className="post__title mb-1">{t('ad:enter title')}</p>
                                    <label className="post__label">
                                        <input
                                            type="text"
                                            className="post__input post__input--title"
                                            placeholder="Enter Ad title"
                                            onChange={(e) => this.onInputTitle(e)}
                                            value={this.state.mainTitle} 
                                            maxLength="35" />
                                        <span className="post__counter mt-1">{35 - this.state.mainTitle.length} {t('translation:input.chars left')}</span>
                                    </label>
                                    <p className="post__hint mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus nibh vel hendrerit maximus. Proin imperdiet elit ipsum, in maximus lectus faucibus in. Praesent eu nunc ut quam mattis rhoncus.
                                    </p>
                                </div>
                                <div className="post__group">
                                    <p className="post__title mb-1">{t('ad:category')}</p>
                                    {this.props.edit && 
                                        <p className="post__hint post__hint--red mb-1">{t('ad:warn category change')}</p>
                                    }
                                    <button className="post__input post__input--cat post__input--cat-main" onClick={() => this.onOpenCatPop()}>
                                        <span className="post__val">
                                            {this.state.activeAfter && <utils.useCat styleClass="post__icon post__icon--cat icon__dark mr-1" svg={this.props.categories[this.state.activeAfter].icon} />}
                                            {title ? title : t('ad:select category')}
                                        </span>
                                        <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-right" />
                                    </button>
                                    {this.state.activeAfter &&
                                        <React.Fragment>
                                            <div className="post__catselected post__input mt-1" onClick={() => this.onOpenCatPop()}>
                                                <ul className="post__list">
                                                    <li className="post__item">{this.props.categories[this.state.activeAfter].title}</li>
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
                                                        <div className="jc post__input post__input--cat post__input--drop" tabIndex="0">
                                                            {this.state.currency.toUpperCase()}
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
                                        <p className="post__title mb-1">{t('ad:type of business')}</p>
                                        <div className="w-100 pos-rel">
                                            <div className="post__input post__input--cat post__input--drop" tabIndex="0">
                                                {utils.capitalize(this.state.business_type)}
                                                <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="chevron-down" />
                                            </div>
                                            <Dropdown class="dropdown--full dropdown--close dropdown--sm-s post__dropdown">
                                                <div className="dropdown__item" onClick={() => this.onChangeBusinessType('individual')}>
                                                    <div className="dropdown__link post__dropitem">{t('ad:individual')}</div>
                                                </div>
                                                <div className="dropdown__item" onClick={() => this.onChangeBusinessType('business')}>
                                                    <div className="dropdown__link post__dropitem">{t('ad:business')}</div>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="post__group">{subOptions}</div>
                                    <div className="post__group">{inputItems}</div>
                                </div>
                                <div className="post__group post__group--description">
                                    <p className="post__title mb-1">{t('ad:personalized des')}</p>
                                    <label className="post__label">
                                        <textarea 
                                            className="post__input post__input--description" 
                                            placeholder=" " 
                                            value={this.state.description}
                                            onChange={(e) => this.onInputDescription(e)}
                                            maxLength="4500"></textarea>
                                        <span className="post__counter mt-1">{4500 - this.state.description.length} {t('translation:input.chars left')}</span>
                                    </label>
                                    <p className="post__hint mt-1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nulla porta, rutrum enim eget, luctus neque. Cras scelerisque imperdiet.
                                    </p>
                                </div>
                            </div>
                            <div className="post__head post__head--doubleline">
                                <h2 className="heading heading__2 mb-1">{t('ad:contact details')}</h2>
                                <span className="post__text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis.
                                </span>
                            </div>
                            <div className="post__main">
                                <div className="post__group">
                                    <p className="post__title mb-1">{t('ad:contact number')}</p>
                                    {this.state.numbers.length > 1 && 
                                        <p className="post__text mb-1">{t('ad:num leave empty')}</p>
                                    }
                                    <div className="post__double-form w-100 pos-rel">
                                        <input 
                                            type="text" 
                                            placeholder="Your contact number" 
                                            className="post__input mr-1" 
                                            value={this.state.numbers[0]} 
                                            onChange={(e) => this.onInputNumber(e.target.value, 0)} 
                                            maxLength={15} />
                                        <button className="post__input jc d-flex" onClick={() => this.onAddNumber()}>
                                            <utils.use styleClass="post__icon icon post__icon--cat-arrow" svg="plus" />
                                        </button>
                                    </div>
                                    {numbers}
                                    <p className="post__title mb-1 mt-15">{t('ad:email')}</p>
                                    <input 
                                        type="text"
                                        placeholder="Your email address (optional)"
                                        className="post__input mb-15"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value })} />
                                    <p className="post__title mb-1">{t('ad:name')}</p>
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
                                        {t('ad:post')}
                                        <utils.use styleClass="icon ml-5" svg="check-circle" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {(this.state.showCat && !this.props.edit) && categories}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.localization.lang,
    token: state.user.token,
    categories: state.localization.translations.categoriesList,
    mobile: state.data.mediaSmall
});

export default connect(mapStateToProps)(withRouter(withTranslation(['ad', 'translation'])(Post)));