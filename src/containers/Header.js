import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import Searchbar from '../components/Searchbar';
import Categories from '../components/Categories';
import * as utils from '../utilities/utilities';
import Card from '../components/Card';
import LoadingScreen from '../UI/LoadingScreen';
import LoadingSub from '../UI/LoadingSub';
import Adview from '../components/Adview';

SwiperCore.use([Autoplay, Navigation, Pagination]);

class Header extends Component {
    state = {
        loading: false,
        loadingVendor: false,
        data: null,
        vendorAds: null,
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true, loadingVendor: true });
            const vendorAds = axios('https://jsonplaceholder.typicode.com/todos');
            const data = axios('https://jsonplaceholder.typicode.com/todos');

            console.log(await vendorAds, await data);
            setTimeout(() => {
                
                this.setState({ loading: false, loadingVendor: false });
            }, 1500);
        } catch(er) {
            console.log(er);
            this.setState({ loading: false, loadingVendor: false });
        }
    }

    componentDidUpdate() {
        this.swiper.update();
    }

    render() {
        // alert(this.props.match.params.id)
        const vendorAds = this.props.vendorAds.map((el, i) => {
            return (
                <SwiperSlide className="header__item" key={i}>
                    <Link to={`/${el}`} className="header__link">
                        <img className="header__img" src={el.img} alt={i} />
                        <h1 className="heading heading__1 header__heading">{el.title}</h1>
                    </Link>
                </SwiperSlide>
            );
        });
        
        const premiumArr = this.props.data.filter(el => el.premium === true);
        const premium = premiumArr.map((el, i) => <Card data={el} key={i} />);

        return (
            <React.Fragment>
                <Route path="/:id" render={() => <Adview {...this.props} />} />
                <Searchbar />
                <header className="header">
                    <div className="header__main">
                        <div className="container">
                            <div className="header__mainwrap">
                                <Categories />
                                {this.state.loadingVendor ? 
                                    <div className="header__list header__loading loading-center">
                                        <LoadingSub />
                                    </div> 
                                    : <Swiper 
                                        className="header__list gradient gradient--right"
                                        autoplay={{ delay: 3000, disableOnInteraction: false, waitForTransition: true }}
                                        navigation={{ prevEl: '.btn__rounded--left', nextEl: '.btn__rounded--right', disabledClass: 'btn__rounded--disabled' }}
                                        pagination={{el: '.swiper-pagination', clickable: true}}
                                        preloadImages
                                        updateOnImagesReady
                                        onSwiper={(sw) => this.swiper = sw}>
                                        {vendorAds}
                                        <button className="btn btn__rounded btn__rounded--left">
                                            <svg className="header__icon" dangerouslySetInnerHTML={{__html: utils.use('chevron-left')}} />
                                        </button>
                                        <button className="btn btn__rounded btn__rounded--right">
                                            <svg className="header__icon" dangerouslySetInnerHTML={{__html: utils.use('chevron-right')}} />
                                        </button>
                                        <div className="swiper-pagination"></div>
                                    </Swiper>
                                    }
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

                                <div className="list">{this.state.loading ? <LoadingScreen /> : premium}</div>
                                <Link to="/" className="btn btn__primary btn__primary--outline main__btn">
                                    Show more
                                    <svg className="icon ml-5" dangerouslySetInnerHTML={{__html: utils.use('chevrons-down')}} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </header>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    vendorAds: state.data.vendorAds,
    data: state.data.data,
    lang: state.localization.lang,
    favorites: state.data.favoriteAds
});

export default connect(mapStateToProps)(withRouter(Header));