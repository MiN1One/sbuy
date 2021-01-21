import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import Searchbar from '../components/Searchbar'; 

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import Categories from '../components/Categories';
import * as utils from '../utilities/utilities';
import Card from '../components/Card';

SwiperCore.use([Autoplay, Navigation, Pagination]);

class Header extends Component {

    render() {
        
        const vendorAds = this.props.vendorAds.map((el, i) => {
            return (
                <SwiperSlide className="header__item" key={i}>
                    <Link to={`/${el}`} className="header__link">
                        <img className="header__img" src={el.img} alt={i} />
                        <h1 className="heading heading__1 header__heading">{el.title}</h1>
                    </Link>
                </SwiperSlide>
            )
        });

        const premiumArr = this.props.data.filter(el => el.premium === true);
        const premium = premiumArr.map((el, i) => <Card data={el} key={i} />);
        
        return (
            <React.Fragment>
                <Searchbar />
                <header className="header">
                    <div className="header__main">
                        <div className="container">
                            <div className="header__mainwrap">
                                <Categories />
                                <Swiper 
                                    className="header__list gradient gradient--right"
                                    autoplay={{ delay: 3000, disableOnInteraction: false, waitForTransition: true }}
                                    navigation={{ prevEl: '.btn__rounded--left', nextEl: '.btn__rounded--right', disabledClass: 'btn__rounded--disabled' }}
                                    pagination={{el: '.swiper-pagination', clickable: true}}
                                    preloadImages
                                    updateOnImagesReady>
                                    {vendorAds}
                                    <button className="btn btn__rounded btn__rounded--left">
                                        <svg className="header__icon" dangerouslySetInnerHTML={{__html: utils.use('chevron-left')}} />
                                    </button>
                                    <button className="btn btn__rounded btn__rounded--right">
                                        <svg className="header__icon" dangerouslySetInnerHTML={{__html: utils.use('chevron-right')}} />
                                    </button>
                                    <div className="swiper-pagination"></div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <section className="header__premium">
                        <div className="container">
                            <div className="header__premwrap">
                                <div className="header__head">
                                    <div className="main__group">
                                        <h2 className="heading heading__2 main__heading mb-5 mr-1">Premiuim ads</h2>
                                        <Link to="/" className="filter__btn filter__btn--close main__link">See all</Link>
                                    </div>
                                    <p className="main__subhead">Found 10,364 ads</p>
                                </div>

                                <div className="list">{premium}</div>
                                <Link to="/" className="btn btn__primary btn__primary--outline main__btn">
                                    Show more
                                    <svg className="icon ml-5" dangerouslySetInnerHTML={{__html: utils.use('chevrons-down')}} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </header>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        vendorAds: state.data.vendorAds,
        data: state.data.data,
        lang: state.localization.lang
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);