import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { withTranslation } from 'react-i18next';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import axios from 'axios';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import Searchbar from '../components/Searchbar';
import * as utils from '../utilities/utilities';
import Card from '../components/Card';
import LoadingScreen from '../UI/LoadingScreen';
import LoadingSub from '../UI/LoadingSub';

const AsyncAdview = React.lazy(() => import('./Adview/Adview'));

SwiperCore.use([Autoplay, Navigation, Pagination]); 

class Header extends Component {
    state = {
        loading: false,
        loadingVendor: false,
        data: [...this.props.data],
        vendorAds: this.props.vendorAds,
        categoryComp: null
    }

    fetchPremiumAds = async () => {
        try {
            this.setState({ loading: true });
            const data = await axios('https://jsonplaceholder.typicode.com/todos');
            this.setState({ loading: false, error: null });
            return data;
        } catch(er) {
            this.setState({ loading: false });
        }
    }

    watchMedia = () => {
        if (this.props.mobile) this.setState({ categoryComp: React.lazy(() => import('../components/MobileCats/MobileCats')) });
        else this.setState({ categoryComp: React.lazy(() => import('../components/Categories/Categories')) });
    }

    async componentDidMount() {
        this.watchMedia();
        try {
            this.setState({ loading: true, loadingVendor: true });
            const vendorAds = await axios('https://jsonplaceholder.typicode.com/todos');
            const premiumAds = await this.fetchPremiumAds();

            setTimeout(() => {
                
                this.setState({ loadingVendor: false, error: null });
            }, 1500);
        } catch(er) {
            console.log(er);
            this.setState({ loadingVendor: false, error: er });
        }
    }

    componentDidUpdate(prevProps) {
        this.swiper.update();
        if (prevProps.mobile !== this.props.mobile) this.watchMedia();
    }

    onShowMore = async () => {
        const data = await this.fetchPremiumAds();
        this.setState(prevState => ({ data: [...prevState.data, ...this.props.data] }));
    }

    render() {
        // ---------- TRANSLATIONS VIA PROPS ---------
        const { t } = this.props;

        const vendorAds = this.state.vendorAds.map((el, i) => {
            return (
                <SwiperSlide className="header__item" key={i}>
                    <Link to={`/${el}`} className="header__link">
                        <img className="header__img" src={el.img} alt={i} />
                        <h1 className="heading heading__1 header__heading">{el.title}</h1>
                    </Link>
                </SwiperSlide>
            );
        });
        
        const premiumArr = this.state.data.filter(el => el.premium === true);
        const premium = premiumArr.map((el, i) => <Card data={el} key={i} />);

        const Categories = this.state.categoryComp; 

        return (
            <React.Fragment>
                <Route path="/premium/:id" exact component={AsyncAdview} />
                <Searchbar />
                <header className="header">
                    <div className="header__main">
                        <div className="container header__container">
                            <div className="header__mainwrap">
                                {Categories && <Categories {...this.props} />}
                                {this.state.loadingVendor 
                                    ? <div className="header__list header__loading loading-center">
                                        <LoadingSub />
                                    </div>
                                    : <Swiper 
                                        className="header__list gradient gradient--right"
                                        autoplay={{ delay: 3000, waitForTransition: true }}
                                        navigation={{ prevEl: '.btn__rounded--left', nextEl: '.btn__rounded--right', disabledClass: 'btn__rounded--disabled' }}
                                        pagination={{el: '.swiper-pagination', clickable: true}}
                                        preloadImages
                                        updateOnImagesReady
                                        onSwiper={(sw) => this.swiper = sw}>
                                            {vendorAds}
                                            <button className="btn btn__rounded btn__rounded--left">
                                                <utils.use styleClass="header__icon" svg="chevron-left" />
                                            </button>
                                            <button className="btn btn__rounded btn__rounded--right">
                                                <utils.use styleClass="header__icon" svg="chevron-right" />
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
                                    <div className="d-flex ac">
                                        <h2 className="heading heading__2 main__heading mb-5 mr-1">{t('main.premium ads')}</h2>
                                        <Link to="/premium" className="btn__sub btn__sub--active">{t('main.see all')}</Link>
                                    </div>
                                    <p className="heading__sub">{t('main.found ads.p1')} 10,364 {t('main.found ads.p2')}</p>
                                </div>

                                <div className="list">{this.state.loading ? <LoadingScreen /> : premium}</div>
                                
                                <button className="btn btn__primary btn__primary--outline" onClick={() => this.onShowMore()}>
                                    {t('main.show more')}
                                    <utils.use styleClass="icon ml-5" svg="chevrons-down" />
                                </button>
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
    categories: state.localization.translations.categoriesList,
    loading: state.data.loading,
    mobile: state.data.mediaSmall,

    // translations
    // base: state.localization.translations.base
});

export default connect(mapStateToProps)(withRouter(withTranslation()(trackWindowScroll(Header))));