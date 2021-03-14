import { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Rating from 'react-rating';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import Error from '../ErrorPage';
import avatar from '../../assets/images/32.jpg';
import Modal from '../../components/Modal';
import LoadingScreen from '../../UI/LoadingScreen';
import * as utils from '../../utilities/utilities';
import LoadingSub from '../../UI/LoadingSub';
import './MobileAdview.scss';
import Backdrop from '../../UI/Backdrop';

SwiperCore.use([Navigation, Pagination]);

const MobileAdview = (props) => {
    const history = useHistory();
    const params = useParams();
    console.log(params.id)

    const { t } = useTranslation(['ad', 'translation']);

    const attachmentRef = useRef();
    const messageRef = useRef();
    const modalRef = useRef();

    const [swiper, setSwiper] = useState(null);
    const [adsSwiper, setAdsSwiper] = useState(null);

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingMes, setLoadingMes] = useState(false);

    const [adId, setAdId] = useState();
    const [adIndex, setAdIndex] = useState(null);
    const [data, setData] = useState(null);

    const [phonePop, setPhonePop] = useState(false);
    const [messagePop, setMessagePop] = useState(false);

    useEffect(() => {
        setAdId(params.id);
        const index = props.data.findIndex(el => el.id === params.id);
        setAdIndex(index);
        if (modalRef.current) modalRef.current.scrollTop = 0
    }, [params.id, props.data]);

    useEffect(() => {
        if (swiper) swiper.update();
        if (adsSwiper) adsSwiper.update();
    });

    const onCloseModal = () => {
        // history.push(`/categories/${params.category}/${params.subcategory}?page=${props.page ? props.page : '1'}`);
        history.goBack();
    };

    const onSendMessage = () => {

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
                        <div className="modal__list modal__list--wfoot" ref={modalRef} id="m-adview-container">
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
                                        {ad.premium && <span className="m-adview__badge badge">{t('translation:main.premium badge')}</span>}
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
                                        <span className="heading__sm mb-1 d-flex">{t('ad:specs')}:</span>
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
                                        <span className="heading__sm mb-1 d-flex">{t('ad:personalized des')}:</span>
                                        <p className="m-adview__text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra odio vel risus consequat feugiat. Vivamus nec lorem auctor felis suscipit ullamcorper sit amet non orci. Sed ornare justo eu arcu convallis venenatis. Sed luctus maximus viverra. Nullam sit amet urna fermentum, dignissim urna semper, auctor mi. Mauris pulvinar porta augue, sodales ultricies urna placerat vitae.
                                        </p>
                                        <span className="m-adview__subtext d-flex mt-2">{t('ad:num views')}: 153&nbsp;&nbsp;|&nbsp;&nbsp;{t('ad:edited at')} 13:16</span>
                                    </div>
                                </div>
                                <div className="m-adview__rating-box">
                                    <div className="d-flex fdc">
                                        <span className="m-adview__subtext mb-5">{t('tranlation:main.reviews')}:</span>
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
                                        {t('tranlation:main.reviews')}
                                        <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                    </Link>
                                </div>
                                <div className="m-adview__nav">
                                    <button onClick={() => setAdIndex(adIndex - 1)}>
                                        <utils.use styleClass="icon icon--dark" svg="chevron-left" />
                                        {t('ad:prev ad')}
                                    </button>
                                    <button onClick={() => setAdIndex(adIndex + 1)}>
                                        {t('ad:next ad')}
                                        <utils.use styleClass="icon icon--dark" svg="chevron-right" />
                                    </button>
                                </div>
                            </div>
                            <div className="m-adview__footer">
                                <span className="heading__sm mb-1 d-flex">{t('ad:ads from')}:</span>
                                <Swiper
                                    className="m-adview__cards mb-2"
                                    navigation={{ prevEl: '.m-adview__card-btn--left', nextEl: '.m-adview__card-btn--right' }}
                                    slidesPerView={2}
                                    breakpoints={{ 600: { slidesPerView: 3 } }}
                                    onSwiper={(sw) => setAdsSwiper(sw)}>
                                        {adsFrom}
                                        <button className="m-adview__card-btn m-adview__card-btn--left">
                                            <utils.use styleClass="icon--7" svg="chevron-left" />
                                        </button>
                                        <button className="m-adview__card-btn m-adview__card-btn--right">
                                            <utils.use styleClass="icon--7" svg="chevron-right" />
                                        </button>
                                </Swiper>
                                <Link className="m-adview__link m-adview__link--ads sb" to="/advertiser/someId">
                                    {t('ad:see all')}
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
                                    {t('ad:phone number')}
                                    <utils.use styleClass="ml-5 icon--7" svg="phone" />
                                </button>
                                <button className="m-adview__btn btn btn__secondary" onClick={() => {
                                    setPhonePop(false);
                                    setMessagePop(true);
                                }}>
                                    {t('ad:write message')}
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
                                            <h5 className="heading heading__5">{t('ad:messages')}</h5>
                                            <button className="" onClick={() => setMessagePop(false)}>
                                                <utils.use styleClass="icon icon--dark" svg="x" /> 
                                            </button>
                                        </div>
                                        <div className="modal__float-body">
                                            {loadingMes
                                                ? <LoadingSub class="loader--mid" />
                                                : <>
                                                    <div className="d-flex fdc">
                                                        <span className="m-adview__subtext mb-5">{t('translation:input.write your message')}:</span>
                                                        <textarea type="text" className="modal__textarea mr-5" ref={messageRef} />
                                                    </div>
                                                    <div className="d-flex modal__float-body--mss">
                                                        <input className="d-none" type="file" ref={attachmentRef} />
                                                        <button className="btn btn__primary mr-5" onClick={() => attachmentRef.current.click()} >
                                                            <utils.use styleClass="icon--7" svg="paperclip" />
                                                        </button>
                                                        <button className="btn btn__primary" onClick={() => onSendMessage()}>
                                                            <utils.use styleClass="icon--7 mr-5" svg="edit-2" />
                                                            {t('ad:send')}
                                                        </button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={`modal__float ${phonePop ? 'modal__float--show' : ''}`}>
                                    <div className="container">
                                        <div className="modal__float-head">
                                            <h5 className="heading heading__5">{t('ad:contact number')}</h5>
                                            <button className="" onClick={() => setPhonePop(false)}>
                                                <utils.use styleClass="icon icon--dark" svg="x" /> 
                                            </button>
                                        </div>
                                        <div className="modal__float-body">
                                            <div className="d-flex fdc ac mr-15">
                                                <figure className="modal__figure mb-15">
                                                    <img className="modal__img" src={avatar} alt={avatar} />
                                                </figure>
                                                <figcaption className="modal__float-text">John Doe</figcaption>
                                            </div>
                                            <div className="d-flex fdc">
                                                <div className="d-flex fdc mb-1">
                                                    <span className="m-adview__subtext mb-5">{t('ad:phone number')}:</span>
                                                    <div className="d-flex">
                                                        <span className="modal__float-text modal__float-text--withbtn">+65468484648</span>
                                                        <button className="modal__float-btn" onClick={() => utils.onCopyToClipboard('+65468484648')}>
                                                            <utils.use styleClass="icon--7" svg="clipboard" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="d-flex fdc">
                                                    <span className="m-adview__subtext mb-5">{t('ad:email')}:</span>
                                                    <div className="d-flex">
                                                        <span className="modal__float-text modal__float-text--withbtn">johndoe@mail.eu</span>
                                                        <button className="modal__float-btn" onClick={() => utils.onCopyToClipboard('johndoe@mail.eu')}>
                                                            <utils.use styleClass="icon--7" svg="clipboard" />
                                                        </button>
                                                    </div>
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