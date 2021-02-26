import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Rating from 'react-rating';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import Error from './Error';
import avatar from '../assets/images/32.jpg';
import Modal from './Modal';
import LoadingScreen from '../UI/LoadingScreen';
import * as utils from '../utilities/utilities';
import Backdrop from '../UI/Backdrop';
import { LazyLoadImage } from 'react-lazy-load-image-component';

SwiperCore.use([Navigation, Pagination]);

const MobileAdview = (props) => {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    const [swiper, setSwiper] = useState(null);

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [adId, setAdId] = useState();
    const [adIndex, setAdIndex] = useState(null);
    const [data, setData] = useState(null);

    const [phonePop, setPhonePop] = useState(false);
    const [messagePop, setMessagePop] = useState(false);

    useEffect(() => {

    }, [props.lang]);

    useEffect(() => {
        setAdId(params.id);
        const index = props.data.findIndex(el => el.id === params.id);
        setAdIndex(index);
    }, [params.id, props.data]);

    useEffect(() => {
        if (swiper) swiper.update();
    });

    const onCloseModal = () => {
        history.push(`/categories/${params.category}/${params.subcategory}?page=${props.page}`);
    };

    if (loading) {
        return (
            <Modal click={onCloseModal}>
                <LoadingScreen class="bg-white" />
            </Modal>  
        );
    }
    
    const ad = adIndex && props.data[adIndex];
    let adImages = null,
        adsFrom = null;


    const onMoveToNextImg = () => {
        if (ad.img.length - 1 > activeImageIndex) 
            setActiveImageIndex(activeImageIndex + 1);
    };

    const onMoveToPrevImg = () => {
        if (activeImageIndex >= 1)
            setActiveImageIndex(activeImageIndex - 1);
    };
    
    if (ad) {
        adImages = adIndex && props.data[adIndex].img.map((el, i) => {
            return (
                <SwiperSlide className="wh-100" key={i}>
                    <figure className="m-adview__figure">
                        <LazyLoadImage 
                            src={el} 
                            alt={el}
                            className="m-adview__img"
                            effect="opacity"
                            width="100%"
                            height="100%" />
                    </figure>
                </SwiperSlide>
            );
        });

        adsFrom = props.data.map((el, i) => {
            return (
                <SwiperSlide key={i}>
                    <Link className="m-adview__card" to={`/categories/${params.category}/${params.subcategory}/${el.id}`}>
                        <figure className="m-adview__card-figure mb-1">
                            <LazyLoadImage
                                width="100%"
                                height="100%"
                                src={el.img[0]}
                                effect="opacity"
                                className="m-adview__img"
                                alt={el.title} />
                        </figure>
                        <div className="m-adview__card-body">
                            <div className="d-flex w-100 fdc">
                                <span className="m-adview__card-title">{el.title}</span>
                                <span className="m-adview__subtext mt-5">{el.date}</span>
                            </div>
                            <span className="price-tag m-adview__card-tag">{el.price}</span>
                        </div>
                    </Link>
                </SwiperSlide>
            );
        });
    } else return (
        <Modal click={onCloseModal}>
            <Error notFound class="bg-white" />
        </Modal>
    );

    const category = props.categories && props.categories[params.category].title;
    const subcategory = props.categories && props.categories[params.category].subCategories.find(el => el.val === params.subcategory).title;

    const isFavorite = props.favorites.findIndex(el => el === params.id) > -1;

    return (
        <>
            {fullscreen && 
                <>
                    <div className="m-adview__fullscreen">
                        <Backdrop z={1} click={() => setFullscreen(false)} />
                        <figure className="m-adview__fullscreen-wrapper">
                            <img 
                                className="m-adview__img" 
                                src={ad.img[activeImageIndex]} 
                                alt={ad.title} />
                            <button className="btn btn__rounded btn__rounded--left" onClick={() => onMoveToPrevImg()}>
                                <utils.use styleClass="icon" svg="chevron-left" />
                            </button>
                            <button className="btn btn__rounded btn__rounded--right" onClick={() => onMoveToNextImg()}>
                                <utils.use styleClass="icon" svg="chevron-right" />
                            </button>
                        </figure>
                    </div>
                </>
            }
            <Modal 
                cat
                icon={props.categories && props.categories[params.category].icon}
                title={utils.limitStrAny(ad.title, 20, false)}
                click={onCloseModal}>
                    <div className="modal__body">
                        <div className="modal__list modal__list--wfoot">
                            <div className="m-adview__body">
                                <Swiper
                                    className="m-adview__img-list"
                                    navigation={{ prevEl: '.btn__rounded--left', nextEl: '.btn__rounded--right'  }}
                                    pagination
                                    onSwiper={(sw) => setSwiper(sw)}
                                    onSlideChange={(sw) => setActiveImageIndex(sw.activeIndex)}>
                                        {adImages}
                                        <button className="btn btn__rounded btn__rounded--left">
                                            <utils.use styleClass="icon" svg="chevron-left" />
                                        </button>
                                        <button className="btn btn__rounded btn__rounded--right">
                                            <utils.use styleClass="icon" svg="chevron-right" />
                                        </button>
                                        {ad.premium && <span className="m-adview__badge badge">promoted</span>}
                                </Swiper>
                                <div className="m-adview__description">
                                    <div className="d-flex sb afs">
                                        <h2 className="heading heading__2 m-adview__title">{ad.title}</h2>
                                        <div className="d-flex">
                                            <button className="m-adview__btn-rounded mr-1" onClick={() => setFullscreen(true)}>
                                                <utils.use styleClass="icon--7" svg="maximize" />
                                            </button>
                                            <button 
                                                className={`m-adview__btn-rounded ${isFavorite ? 'm-adview__btn-rounded--active' : ''}`} 
                                                onClick={() => props.onSetFavorites(adId)}>
                                                    {/* <utils.use styleClass="icon--7" svg="heart" /> */}
                                                    {isFavorite
                                                        ? <FaHeart className="icon--7" />
                                                        : <FaRegHeart className="icon--7" />
                                                    }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex afe sb mt-1">
                                        <div className="d-flex fdc">
                                            <span className="m-adview__subtext">{ad.date}</span>
                                            <span className="m-adview__subtext">{ad.location}</span>
                                        </div>
                                        <span className="price-tag m-adview__price">{ad.price}</span>
                                    </div>
                                </div>
                                <div className="m-adview__specs">
                                    <div className="mb-1">
                                        <span className="heading__sm mb-1 d-flex">Specifications:</span>
                                        <ul className="m-adview__list">
                                            <li className="tag tag__types m-adview__item">
                                                <Link to={`/${params.category}`}>{category}</Link>
                                            </li>
                                            <li className="tag tag__types m-adview__item">
                                                <Link to={`/${params.category}/${params.subcategory}`}>{subcategory}</Link>
                                            </li>
                                            <li className="tag tag__types m-adview__item">Camera: 100MP</li>
                                            <li className="tag tag__types m-adview__item">CPU: Snapdragon 865</li>
                                            <li className="tag tag__types m-adview__item">Battery: 5000mAh</li>
                                            <li className="tag tag__types m-adview__item">Condition: New</li>
                                            <li className="tag tag__types m-adview__item">Color: Grey</li>
                                            <li className="tag tag__types m-adview__item">ROM: 128GB</li>
                                            <li className="tag tag__types m-adview__item">RAM: 8GB</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="heading__sm mb-1 d-flex">Personalized description:</span>
                                        <p className="m-adview__text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra odio vel risus consequat feugiat. Vivamus nec lorem auctor felis suscipit ullamcorper sit amet non orci. Sed ornare justo eu arcu convallis venenatis. Sed luctus maximus viverra. Nullam sit amet urna fermentum, dignissim urna semper, auctor mi. Mauris pulvinar porta augue, sodales ultricies urna placerat vitae.
                                        </p>
                                        <span className="m-adview__subtext d-flex mt-2">Number of views: 153&nbsp;&nbsp;|&nbsp;&nbsp;Edited at 13:16</span>
                                    </div>
                                </div>
                                <div className="m-adview__rating-box">
                                    <div className="d-flex fdc">
                                        <span className="m-adview__subtext mb-5">Reviews:</span>
                                        <div className="m-adview__rating">
                                            <Rating
                                                className="mr-5"
                                                initialRating={4.5}
                                                fractions={2} 
                                                emptySymbol={<utils.useStars styleClass="rating" svg="star-empty" />}
                                                fullSymbol={<utils.useStars styleClass="rating rating--fill" svg="star-full" />} 
                                                />
                                            4.5
                                        </div>
                                    </div>
                                    <Link className="m-adview__link" to="/reviews/someId">
                                        Reviews
                                        <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                    </Link>
                                </div>
                                <div className="m-adview__nav">
                                    <button onClick={() => setAdIndex(adIndex - 1)}>
                                        <utils.use styleClass="icon icon--dark" svg="chevron-left" />
                                        Previous
                                    </button>
                                    <button onClick={() => setAdIndex(adIndex + 1)}>
                                        Next
                                        <utils.use styleClass="icon icon--dark" svg="chevron-right" />
                                    </button>
                                </div>
                            </div>
                            <div className="m-adview__footer">
                                <span className="heading__sm mb-1 d-flex">Ads from the user:</span>
                                <Swiper
                                    className="m-adview__cards mb-2"
                                    navigation={{ prevEl: '.m-adview__card-btn--left', nextEl: '.m-adview__card-btn--right' }}
                                    slidesPerView={2}
                                    breakpoints={{ 600: { slidesPerView: 3 } }}>
                                        {adsFrom}
                                        <button className="m-adview__card-btn m-adview__card-btn--left">
                                            <utils.use styleClass="icon--7" svg="chevron-left" />
                                        </button>
                                        <button className="m-adview__card-btn m-adview__card-btn--right">
                                            <utils.use styleClass="icon--7" svg="chevron-right" />
                                        </button>
                                </Swiper>
                                <Link className="m-adview__link m-adview__link--ads sb" to="/advertiser/someId">
                                    All from the user
                                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="modal__footer">
                        <div className="container h-100">
                            <div className="d-flex ac pos-rel wh-100 jc">
                                <button className="m-adview__btn btn btn__primary mr-5" onClick={() => {
                                    setMessagePop(false);
                                    setPhonePop(true);
                                }}>
                                    Phone number
                                    <utils.use styleClass="ml-5 icon--7" svg="phone" />
                                </button>
                                <button className="m-adview__btn btn btn__secondary" onClick={() => {
                                    setPhonePop(false);
                                    setMessagePop(true);
                                }}>
                                    Message
                                    <utils.use styleClass="ml-5 icon--7" svg="edit-2" />
                                </button>
                                {(messagePop || phonePop) && 
                                    <Backdrop z={99} class="backdrop--white" click={() => {
                                        setMessagePop(false);
                                        setPhonePop(false);
                                    }} />
                                }
                                <div className={`modal__float ${messagePop ? 'modal__float--show' : ''}`}>
                                    <div className="container">
                                        <div className="modal__float-head">
                                            <h5 className="heading heading__5">Messages</h5>
                                            <button className="" onClick={() => setMessagePop(false)}>
                                                <utils.use styleClass="icon icon--dark" svg="x" /> 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`modal__float ${phonePop ? 'modal__float--show' : ''}`}>
                                    <div className="container">
                                        <div className="modal__float-head">
                                            <h5 className="heading heading__5">Contact number</h5>
                                            <button className="" onClick={() => setPhonePop(false)}>
                                                <utils.use styleClass="icon icon--dark" svg="x" /> 
                                            </button>
                                        </div>
                                        <div className="modal__float-body">
                                            <div className="d-flex fdc">
                                                <figure className="modal__figure mr-2">
                                                    <img className="modal__img" src={avatar} alt={avatar} />
                                                </figure>
                                                <figcaption className="m-adview__pop-text">John Doe</figcaption>
                                            </div>
                                            <div>
                                                <div className="modal__item">
                                                    <span className="m-adview__subtext">Phone number:</span>
                                                    <span className="m-adview__pop-text">+65468484648</span>
                                                </div>
                                                <div className="modal__item">
                                                    <span className="m-adview__subtext">Email address:</span>
                                                    <span className="m-adview__pop-text">johndoe@mail.eu</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>
        </>
    );
};

export default MobileAdview;