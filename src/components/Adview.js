import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel, Pagination, Navigation } from 'swiper';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import avatar from '../assets/images/32.jpg';
import Backdrop from '../UI/Backdrop';
import Tooltip from '../UI/Tooltip';
import LoadingScreen from '../UI/LoadingScreen';
import axios from 'axios';

SwiperCore.use([Scrollbar, Mousewheel, Pagination, Navigation]);

class adview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            index: null,
            rating: 4.5,
            showNum: false,
            showMessageBar: false,
            rotate: null,
            message: '',
            fullScreen: false,
            swiperBegin: true,
            swiperEnd: false,
            activeSwiperImage: 0
        }

        this.categoryPath = `${this.props.match.params.category}/${this.props.match.params.subcategory}`;
        this.id = this.props.match.params.id;

        this.copyNumRef = React.createRef();
        this.mesTitleRef = React.createRef();
    }

    fetchData = async () => {
        try {
            this.setState({ loading: true });
            const data = await axios('https://jsonplaceholder.typicode.com/todos/');
            setTimeout(() => {
                
                this.setState({ loading: false });
            }, 1500);
        } catch(er) {
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.fetchData();

        const index = this.props.data.findIndex(el => el.id === this.id);
        if (index === -1) {
            console.log('No such ad exists');
        } else this.setState({ index }, () => console.log('Find index by id: ' + this.state.index));

        const root = document.documentElement;
        root.style.setProperty('--cat-item-transition', 'none');
        root.style.setProperty('--cat-item-transition-real', 'none');
        
        document.body.style.overflow = 'hidden';
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData();
            this.swiper.update();
            const index = this.props.data.findIndex(el => el.id === this.props.match.params.id);
            this.setState({ index });
        }
    }
    
    componentWillUnmount() {
        if (this.swiper) this.swiper.destroy();
        
        const root = document.documentElement;
        root.style.setProperty('--cat-item-transition', 'all .3s ease');
        root.style.setProperty('--cat-item-transition-real', 'all .1s ease');

        document.body.style.overflow = 'initial';
    }

    onLikeAd = (id) => {
        let newList = null;
        const exists = this.props.favorites.find(el => el === id);
        if (exists) newList = this.props.favorites.filter(el => el !== id);
        else newList = [...this.props.favorites, id];
        localStorage.setItem('favorite_ads_sbuy', JSON.stringify(newList));
        this.props.onSetFavorites(newList);
    }

    onNextImage = (img) => {
        if (this.state.activeSwiperImage < img.length - 1) {
            this.setState((prevState) => {
                return { activeSwiperImage: prevState.activeSwiperImage + 1 }
            })
        } else this.setState({ activeSwiperImage: 0 });
    }

    onPrevImage = () => {
        if (this.state.activeSwiperImage > 0) {
            this.setState((prevState) => {
                return { activeSwiperImage: prevState.activeSwiperImage - 1 }
            })
        }
    }

    onGoFullScreen = () => this.setState({ fullScreen: true });
    onCloseFullScreen = () => this.setState({ fullScreen: false });

    onReachBeginSwiper = () => this.setState({ swiperBegin: true, swiperEnd: false }, () => console.log(this.state.swiperBegin, this.state.swiperEnd));
    onReachEndSwiper = () => this.setState({ swiperBegin: false, swiperEnd: true }, () => console.log(this.state.swiperBegin, this.state.swiperEnd));

    onRotate = () => {
        let i = 0;
        const degrees = [90, 180, 270, 360];
        if (this.state.rotate) {
            i = degrees.findIndex(el => el === this.state.rotate) + 1;
        }
        if (i > degrees.length - 1) i = 0;
        this.setState({ rotate: degrees[i] }, () => console.log(this.state.rotate));
    } 

    onSendMessage = (e) => {
        e.preventDefault();
        if (this.state.message) {
            this.mesTitleRef.current.textContent = 'Your message is sent!';
            setTimeout(() => {
                this.mesTitleRef.current.textContent = 'Write your message...';
            }, 1000);
        }
    }

    closePopup = () => {
        if (!this.props.match.params.category && !this.props.match.params.subcategory) this.props.history.goBack();
        else this.props.history.replace('/categories/' + this.categoryPath);
    }

    onShowMessageBar = () => this.setState({ showMessageBar: true });
    onHideMessageBar = () => this.setState({ showMessageBar: false });

    onCopyNum = (val) => {
        const el = document.createElement('textarea');
        el.value = val;
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    onHideNum = () => this.setState({ showNum: false });
    
    onClickNext = () => {
        if (this.state.index < this.props.data.length - 1) {
            this.setState(prevState => {
                return { index: prevState.index + 1 }
            }, () => {
                this.props.history.replace(`/categories/${this.categoryPath}/${this.props.data[this.state.index].id}`);
            });
        }
        else this.props.history.replace(`/categories/${this.categoryPath}`);
        if (this.state.activeSwiperImage > 0) this.setState({ activeSwiperImage: 0 });
    }
    
    onClickPrev = () => {
        if (this.state.index > 0) {
            this.setState(prevState => {
                return { index: prevState.index - 1 }
            }, () => {
                this.props.history.replace(`/${this.props.match.params.category}/${this.props.match.params.subcategory}/${this.props.data[this.state.index].id}`);
            });
        }
        else this.props.history.replace(`/${this.categoryPath}`);
        if (this.state.activeSwiperImage > 0) this.setState({ activeSwiperImage: 0 });
    }

    render() {
        let category = `/${this.props.match.params.category}`;
        let subcategory = this.props.match.params.subcategory;
        
        let routes = null;
        if (this.props.match.params.category && this.props.match.params.subcategory) {
            routes = (
                <React.Fragment>
                    <Link to={category} className="adview__btn adview__btn--rel adview__btn--bggrey adview__btn--routes DTool pos-rel wh-auto">{utils.capitalize(utils.parseUrl(utils.formatRouteString(category)))}</Link>
                    <Link to={`${category}/${subcategory}`} className="adview__btn adview__btn--rel adview__btn--bggrey adview__btn--routes DTool pos-rel wh-auto">{utils.capitalize(utils.parseUrl(utils.formatRouteString(subcategory)))}</Link>
                </React.Fragment>
            );
        }

        let rotateDegClass = '';
        if (this.state.rotate) rotateDegClass = `adview__rotate--${this.state.rotate}`;

        const topGradientClass = ['adview__gradient adview__gradient--top'];
        const bottomGradientClass = ['adview__gradient'];
        if (this.state.swiperEnd) topGradientClass.push('adview__gradient--show');
        if (this.state.swiperBegin) bottomGradientClass.push('adview__gradient--show');

        const ad = this.props.data[this.state.index];
        if (!ad) return null;
                
        const images = ad.img.map((el, i) => (
            <SwiperSlide className={`adview__figmain ${rotateDegClass}`} key={i}>
                <LazyLoadImage 
                    width="100%"
                    height="100%"
                    className="adview__img"
                    src={el}
                    alt={i}
                    />
            </SwiperSlide>
        ));
        
        let adsFrom = (
            <React.Fragment>
                {this.props.data.map((el, i) => {
                    return (
                        <Link to={`${category}/${subcategory}/${el.id}`} className="adview__card adview__box adview__box--card" key={i}>
                            <figure className="adview__figure adview__figure--card mr-2">
                                <LazyLoadImage 
                                    className="adview__img adview__img--card"
                                    src={el.img[0]}
                                    width="100%"
                                    height="100%"
                                    />
                            </figure>
                            <div className="adview__group adview__group--col w-max afs">
                                <span className="adview__subheading adview__subheading--card mb-1">{utils.limitStrAny(el.title, 15, true)}</span>
                                <span className="adview__title mb-5">{el.date}</span>
                                <span className="adview__title mb-5">{el.location}</span>
                                <span className="price-tag">{el.price}</span>
                            </div>
                        </Link>
                    )
                })}
                <button className="adview__card adview__card--btn">See all</button>
            </React.Fragment>
        );

        const isFavorite = this.props.favorites.findIndex(el => el === ad.id) > -1;

        if (this.state.loading) return <LoadingScreen class="loadingScreen--abs" />
        
        return (
            <React.Fragment>
                <header className="adview">
                    {this.state.fullScreen && 
                        <div className="adview__fullscreen">
                            <div className="container">
                                <Backdrop z={1} click={this.onCloseFullScreen} />
                                <div className="adview__fullscreenwrap">
                                    <figure className="adview__figure adview__figure--full">
                                        <img src={ad.img[this.state.activeSwiperImage]} alt={ad.title} className="adview__img adview__img--full" />
                                    </figure>
                                </div>
                            </div>
                            <button className="adview__btn adview__btn--abs adview__btn--grey adview__btn--left" onClick={() => this.onPrevImage()}>
                                <utils.use styleClass="icon--7" svg="chevron-left" />
                            </button>
                            <button className="adview__btn adview__btn--abs adview__btn--grey adview__btn--right" onClick={() => this.onNextImage(ad.img)}>
                                <utils.use styleClass="icon--7" svg="chevron-right" />
                            </button>
                        </div>
                    }
                    <Swiper 
                        className="adview__wrapper"
                        direction="vertical"
                        slidesPerView="auto"
                        freeMode
                        scrollbar={{ el: '#scrollbar', draggable: true, snapOnRelease: false }}
                        mousewheel
                        simulateTouch={false}
                        keyboard={{ enabled: true, onlyInViewport: true }}>
                            <SwiperSlide className="adview__content">
                                <div className="container">
                                    <div className="adview__head">
                                        <div className="adview__group">
                                            <Link to="/" className="adview__btn adview__btn--rel adview__btn--bggrey adview__btn--routes DTool pos-rel wh-auto">Home</Link>
                                            {routes}
                                            <span className="adview__btn adview__btn--rel adview__btn--bggrey adview__btn--routes DTool pos-rel wh-auto">{utils.limitStrAny(ad.title, 15, true)}</span>
                                        </div>
                                        <div className="adview__group">
                                            <button className="adview__btn adview__btn--rel adview__btn--bggrey adview__btn--routes DTool pos-rel wh-auto afs" onClick={() => this.onClickPrev()}>
                                                <utils.use styleClass="icon--7" svg="chevron-left" />
                                                Previous Ad
                                            </button>
                                            <button className="adview__btn adview__btn--rel adview__btn--bggrey adview__btn--routes DTool pos-rel wh-auto afs" onClick={() => this.onClickNext()}>
                                                Next Ad
                                                <utils.use styleClass="icon--7" svg="chevron-right" />
                                            </button>
                                            <button className="adview__btn adview__btn--rel adview__btn--bggrey DTool pos-rel DTool DTool--bottom no-transition" onClick={() => this.closePopup()}>
                                                <utils.use styleClass="icon--7" svg="x" />
                                                <Tooltip>Close</Tooltip>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="adview__main">
                                        <div className="adview__left">
                                            <div className="adview__box adview__box--main">
                                                <Swiper 
                                                    className="adview__swiper"
                                                    slidesPerView={1}
                                                    navigation={{nextEl: '#right', prevEl: '#left', disabledClass: 'adview__btn--disabled'}}
                                                    pagination={{ el: '.swiper-pagination' }}
                                                    onSwiper={(sw) => this.swiper = sw}
                                                    simulateTouch={false}
                                                    preloadImages
                                                    updateOnImagesReady
                                                    onImagesReady={() => this.swiper.update()}
                                                    onSlideChange={(sw) => this.setState({ activeSwiperImage: sw.activeIndex })}
                                                    preventInteractionOnTransition={true}>
                                                    {images}
                                                    <button className="adview__btn adview__btn--abs adview__btn--left" id="left">
                                                        <utils.use styleClass="icon--7" svg="chevron-left" />
                                                    </button>
                                                    <button className="adview__btn adview__btn--abs adview__btn--right" id="right">
                                                        <utils.use styleClass="icon--7" svg="chevron-right" />
                                                    </button>
                                                    <div className="adview__group adview__group--abs">
                                                        <button className="adview__btn DTool adview__btn--rel adview__btn--abs adview__btn--corner mr-2 pos-rel no-transition" onClick={() => this.onRotate()}>
                                                            <utils.use styleClass="icon--7" svg="rotate-cw" />
                                                            <Tooltip>Rotate the photo</Tooltip>
                                                        </button>
                                                        <button className="adview__btn DTool adview__btn--rel adview__btn--abs adview__btn--corner pos-rel no-transition" onClick={() => this.onGoFullScreen()}>
                                                            <utils.use styleClass="icon--7" svg="maximize" />
                                                            <Tooltip>Full Screen</Tooltip>
                                                        </button>
                                                    </div>
                                                    <div className="swiper-pagination"></div>
                                                </Swiper>
                                                <div className="adview__details mb-2">
                                                    <div className="adview__group sb">
                                                        <div className="adview__headingwrap">
                                                            <h1 className="heading heading__1" data-premium={ad.premium}>
                                                                {ad.title}
                                                                <span className="badge ml-1">
                                                                    Promoted
                                                                </span>
                                                            </h1>
                                                            <div className="adview__subheading mb-1">
                                                                <p className="adview__item adview__item--location">{ad.date}, {ad.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="adview__group sb afe">
                                                        <div>
                                                            <p className="price-tag adview__item adview__item--price">{ad.price}</p>
                                                        </div>
                                                        <div className="adview__group">
                                                            <button className="adview__btn adview__btn--rel DTool pos-rel no-transition">
                                                                <utils.use styleClass="icon--7" svg="share" />
                                                                <Tooltip>Share</Tooltip>
                                                            </button>
                                                            <button 
                                                                className="adview__btn adview__btn--rel DTool pos-rel no-transition" 
                                                                data-favorite={isFavorite} 
                                                                onClick={() => this.onLikeAd(ad.id)}>
                                                                    <utils.use styleClass="icon--7" svg="heart" />
                                                                    <Tooltip>{!isFavorite ? 'Add to favourites' : 'Remove from favorites'}</Tooltip>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="adview__box adview__box--description">
                                                <div className="adview__subhead sb mb-2">
                                                    <h2 className="heading heading__2 adview__subheading">Description</h2>
                                                    <p className="adview__title">Number of views: 153&nbsp;&nbsp;|&nbsp;&nbsp;Edited at 13:16</p>
                                                </div>
                                                <div className="adview__group adview__group--col afs mb-1">
                                                    <p className="adview__title adview__title--mid mb-1">Secifications:</p>
                                                    <ul className="adview__group adview__group--wrap">
                                                        <li className="tag tag__types mb-1">Camera: 100MP</li>
                                                        <li className="tag tag__types mb-1">CPU: Snapdragon 865</li>
                                                        <li className="tag tag__types mb-1">Battery: 5000mAh</li>
                                                        <li className="tag tag__types mb-1">Condition: New</li>
                                                        <li className="tag tag__types mb-1">Color: Grey</li>
                                                        <li className="tag tag__types mb-1">ROM: 128GB</li>
                                                        <li className="tag tag__types mb-1">RAM: 8GB</li>
                                                    </ul>
                                                </div>
                                                <div className="adview__group adview__group--col afs">
                                                    <p className="adview__title adview__title--mid mb-1">Personalized description:</p>
                                                    <p className="adview__text">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra odio vel risus consequat feugiat. Vivamus nec lorem auctor felis suscipit ullamcorper sit amet non orci. Sed ornare justo eu arcu convallis venenatis. Sed luctus maximus viverra. Nullam sit amet urna fermentum, dignissim urna semper, auctor mi. Mauris pulvinar porta augue, sodales ultricies urna placerat vitae. 
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="adview__right">
                                            <div className="adview__box adview__box--user">
                                                <figure className="adview__figure adview__item">
                                                    <img className="adview__img" src={avatar} alt={ad.id} />
                                                </figure>
                                                <Link to="/user/john_doe" className="adview__item adview__item--name anim-link pos-rel no-transition">John Doe</Link>
                                                <span className="adview__item adview__item--titled">
                                                    <span className="adview__title mb-5">Enterprise</span>
                                                    <Link to="/company" className="adview__item adview__item--lined">Intech Ltd.</Link>
                                                </span>
                                                <span className="adview__item adview__item--titled">
                                                    <span className="adview__title mb-5">Reviews:</span> 
                                                    <span className="adview__item">
                                                        <Rating 
                                                            className="adview__item--ratingbar"
                                                            initialRating={this.state.rating} 
                                                            fractions={2} 
                                                            emptySymbol={<utils.useStars styleClass="rating" svg="star-empty" />}
                                                            fullSymbol={<utils.useStars styleClass="rating rating--fill" svg="star-full" />}
                                                            onChange={(r) => this.setState({ rating: r })}
                                                            />
                                                        <span>{(Math.round(this.state.rating * 100) / 100).toFixed(1)}</span>
                                                    </span>
                                                </span>
                                                <div className="adview__item pos-rel no-transition">
                                                    <button className="adview__btn--main btn btn__primary" onClick={() => this.setState({ showNum: true })}>
                                                        Phone number
                                                        <utils.use styleClass="icon--7 ml-5" svg="phone-outgoing" />
                                                    </button>
                                                    {this.state.showNum && 
                                                        <React.Fragment>
                                                            <Backdrop z={98} click={this.onHideNum} />
                                                            <Tooltip class="adview__numbox" click={this.onHideNum}>
                                                                <span className="adview__number">+684 655985 2656</span>
                                                                <button className="adview__btn adview__btn--clip ml-1" onClick={() => this.onCopyNum('+684 655985 2656')} title="Copy number">
                                                                    <utils.use styleClass="icon--7 ml-5" svg="clipboard" />
                                                                </button>
                                                            </Tooltip>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                                <button className="adview__btn--main adview__item btn btn__secondary" onClick={() => this.onShowMessageBar()}>
                                                    Write a message
                                                    <utils.use styleClass="icon--7 icon ml-5" svg="edit-2" />
                                                </button>
                                            </div>
                                            {this.state.showMessageBar && 
                                                <div className="adview__box adview__box--message">
                                                    <div className="adview__group adview__group--sb mb-1">
                                                        <p className="adview__title" ref={this.mesTitleRef}>Write your message:</p>
                                                        <button className="adview__btn adview__btn--sm adview__btn--rel pos-rel" onClick={() => this.onHideMessageBar()}>
                                                            <utils.use styleClass="icon--7" svg="x" />
                                                        </button>
                                                    </div>
                                                    <form className="adview__form" onSubmit={(e) => this.onSendMessage(e)}>
                                                        <div className="adview__input-box">
                                                            <textarea autoFocus required className="adview__input mr-5" placeholder="Message..." type="text" onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message} />
                                                            {this.state.message !== '' && <span className="adview__title mt-1">{300 - this.state.message.length} characters left</span>}
                                                        </div>
                                                        <button className="wh-auto btn btn__primary btn__primary--outline">
                                                            Send
                                                            <utils.use styleClass="icon--7 icon" svg="send" />
                                                        </button>
                                                    </form>
                                                </div>
                                            }
                                            <Swiper
                                                className="adview__cardscontainer"
                                                direction="vertical"
                                                slidesPerView="auto"
                                                freeMode
                                                mousewheel
                                                nested
                                                simulateTouch={false}
                                                keyboard={{ enabled: true, onlyInViewport: true }}
                                                onReachBeginning={() => this.onReachBeginSwiper()}
                                                onReachEnd={() => this.onReachEndSwiper()}
                                                scrollbar={{ el: '#scrollbar-2', draggable: true, snapOnRelease: false }}
                                                >
                                                <span className={topGradientClass.join(' ')}></span>
                                                <span className={bottomGradientClass.join(' ')}></span>
                                                <SwiperSlide className="adview__cards">
                                                    {adsFrom}
                                                    
                                                </SwiperSlide>
                                                <div className="swiper-scrollbar" id="scrollbar-2"></div>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        <div className="swiper-scrollbar" id="scrollbar"></div>
                    </Swiper>
                </header>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.localization.lang,
    favorites: state.user.favorites,
    data: state.data.data
});

const mapDispatchToProps = (dispatch) => ({
    onSetFavorites: (list) => dispatch(actions.setFavorites(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(adview)));