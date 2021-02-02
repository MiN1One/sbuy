import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import * as utils from '../utilities/utilities';

import Backdrop from '../UI/Backdrop';
import LoadingSub from '../UI/LoadingSub';


class Categories extends PureComponent {
    state = {
        categories: null,
        activeCat: null,
        loading: false
    }

    componentDidMount() {
        this.importCategories();
    }
    
    importCategories = () => {
        this.setState({ loading: true });
        import(`../store/Categories/categories_${this.props.lang}`)
            .then(res => {
                this.setState({ categories: res.default, loading: false });
            })
            .catch(er => {
                console.log(er);
                this.setState({ loading: false });
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) this.importCategories();
    }

    setActiveCat = (cat) => this.setState({ activeCat: cat });
    unsetActiveCat = () => this.setState({ activeCat: null });

    onClickItem = () => {
        if (this.props.clickItem) this.props.clickItem();
    } 

    render() {

        const catItemsArr = [];
        for (let key in this.state.categories) {
            catItemsArr.push({
                id: key,
                val: this.state.categories[key].val,
                title: this.state.categories[key].title,
                icon: this.state.categories[key].icon
            });
        }

        const catItems = catItemsArr.map((el) => {
            return (
                <div 
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
                </div>
            );
        });
        
        let subItems = null;
        if (this.state.activeCat) {
            subItems = this.state.categories[this.state.activeCat].subCategories.map((el, i) => {
                return (
                    <li className="cat__subitem" key={i}>
                        <Link to={`/categories/${this.state.categories[this.state.activeCat].val}/${el.val}?page=1`} className="cat__link cat__link--sub" onClick={() => this.onClickItem()}>
                            <utils.use styleClass="cat__i cat__i--sub" svg="chevron-right" />
                            {el.title}
                        </Link>
                    </li>
                );
            });
        }

        if (this.state.loading) 
            return (
                <div className="cat__l l-center">
                    <LoadingSub />
                </div>
            );
        
        return (
            <React.Fragment>
                {this.state.activeCat && <Backdrop z={9} click={this.unsetActiveCat} />}
                <div className={`cat ${this.props.class || ''}`}>
                    <div className="cat__head">
                        <h2 className="cat__heading">Categories</h2>
                        <Link to="/cats/all" className="cat__btn btn__sub">See all</Link>
                    </div>
                    <ul className="cat__list">
                        {catItems}
                        <li className="cat__item">
                            <Link to="/exchange" className="cat__link">
                                <div className="cat__group">
                                    <utils.useCat styleClass="cat__i cat__i--cat" svg="handshake-o" />
                                    Exchange
                                </div>
                                <utils.use styleClass="cat__i cat__i--arrow" svg="chevron-right" />
                            </Link>
                        </li>
                        <li className="cat__item">
                            <Link to="/giveaway" className="cat__link">
                                <div className="cat__group">
                                    <utils.useCat styleClass="cat__i cat__i--cat" svg="gift2" />
                                    Give away
                                </div>
                                <utils.use styleClass="cat__i cat__i--arrow" svg="chevron-right" />
                            </Link>
                        </li>
                    </ul>
                    {this.state.activeCat && 
                        <div className="cat__panel">
                            <div className="cat__subhead">
                                <h2 className="cat__heading cat__heading--sub">
                                    {this.state.categories[this.state.activeCat].title}
                                    <utils.useCat styleClass="cat__i cat__i--large" svg={this.state.categories[this.state.activeCat].icon} />
                                </h2>
                                <button className="cat__btn cat__btn--sub btn__sub" onClick={() => this.unsetActiveCat()}>
                                    <utils.use styleClass="cat__i" svg="x" />
                                </button>
                            </div>
                            <ul className="cat__sublist">
                                {subItems}
                            </ul>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.localization.lang
});

export default connect(mapStateToProps)(React.memo(Categories));