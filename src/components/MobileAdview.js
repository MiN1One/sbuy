import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import avatar from '../assets/images/32.jpg';
import Modal from './Modal';
import * as utils from '../utilities/utilities';

SwiperCore.use([Navigation, Pagination]);

const MobileAdview = (props) => {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();

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

    const onCloseModal = () => {
        history.push(`/categories/${params.category}/${params.subcategory}`);
    };

    const adImages = adIndex && props.data[adIndex].img.map((el, i) => {
        console.log(el)
        return (
            <SwiperSlide className="m-adview__item" key={i}>
                <figure className="m-adview__figure">
                    <img className="m-adview__img" alt={el} src={el} />
                </figure>
            </SwiperSlide>
        );
    });

    const category = props.categories && props.categories[params.category].title;
    const subcategory = props.categories && props.categories[params.category].subCategories.find(el => el.val === params.subcategory).title;

    return (
        <Modal 
            title={props.data.title}
            click={onCloseModal}>
                <div className="modal__body">
                    {/* <div className="m-adview__head">
                        
                    </div> */}
                    <div className="m-adview__body">
                        <Swiper
                            className="m-adview__list"
                            navigation={{ nextEl: '.btn__rounded--right', prevEl: '.btn__rounded' }}>
                                {adImages}
                                <button className="btn btn__rounded">
                                    <utils.use styleClass="icon" svg="chevron-left" />
                                </button>
                                <button className="btn btn__rounded btn__rounded--right">
                                    <utils.use styleClass="icon" svg="chevron-right" />
                                </button>
                        </Swiper>
                        <div className="m-adview__description">

                        </div>
                        <div className="m-adview__specs">

                        </div>
                    </div>
                    <div className="m-adview__footer">
                        {/* <button className="">
                            <utils.use styleClass="icon" svg="chevron-left" />
                            Previous
                        </button>
                        <button className="">
                            Next
                            <utils.use styleClass="icon" svg="chevron-right" />
                        </button> */}

                        <Link to={`/${params.category}`} className="tag tag__types m-adview__breadc">{category}</Link>
                        <Link to={`/${params.category}/${params.subcategory}`} className="tag tag__types m-adview__breadc">{subcategory}</Link>
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
                                        <figure className="modal__figure mr-2">
                                            <img className="modal__img" src={avatar} alt={avatar} />
                                        </figure>
                                        <div className="d-flex fdc">
                                            <span className="heading__sm">+651651651</span>
                                            <span className="heading__sm">johndoe@mail.eu</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Modal>
    );
};

export default MobileAdview;