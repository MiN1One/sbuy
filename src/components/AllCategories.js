import React, { PureComponent } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import LoadingSub from '../UI/LoadingSub';
import * as utils from '../utilities/utilities';

class AllCategories extends PureComponent {
    state = {
        cats: null,
        loading: false
    }

    importCategories = () => {
        this.setState({ loading: true });
        import(`../store/Categories/categories_${this.props.lang}`)
            .then(data => {
                this.setState({ cats: data.default, loading: false });
                console.log(data.default);
            })
            .catch(er => {
                this.setState({ loading: false });
                console.error(er);
            });
    }

    componentDidMount() {
        this.importCategories();
    }

    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) this.importCategories();
    }

    onSelectCat = (index) => {
        const itemList = Array.from(document.querySelectorAll('.allcats__list--slide'))[index];
        const itemLink = Array.from(document.querySelectorAll('.allcats__link'))[index];
        const item = Array.from(document.querySelectorAll('.allcats__item'))[index];
        const arrow = Array.from(document.querySelectorAll('.allcats__icon--arrow'))[index]
        if ($(itemList).is(':hidden')) {
            $(itemList).slideDown({ duration: 400 });
            $(arrow).css('transform', 'rotate(180deg)');
            $(itemLink).css('border-bottom', '1px solid rgba(0,0,0, .07)');
            $(item).css('border-bottom', '1px solid rgba(0,0,0, .07)');
        } else {
            $(itemList).slideUp({ duration: 400 });
            $(arrow).css('transform', 'rotate(0)');
            $(itemLink).css('border-bottom', 'none');
            $(item).css('border-bottom', 'none');
        }
    }

    render() {
        const catItemsArr = [];
        for (let key in this.state.cats) {
            catItemsArr.push({
                title: this.state.cats[key].title,
                val: this.state.cats[key].val,
                subItems: this.state.cats[key].subCategories,
                icon: this.state.cats[key].icon
            });
        }

        const catItems = catItemsArr.map((el, i) => {
            const subCategories = el.subItems.map((el, i) => (
                <li className="allcats__item allcats__item--sub" key={i}>
                    <div className="allcats__link allcats__link--sub">
                        {el.title}
                    </div>
                </li>
            ));

            return (
                <li className="allcats__item" key={i}>
                    <div className="allcats__link" onClick={() => this.onSelectCat(i)}>
                        <div className="allcats__group">
                            <utils.useCat styleClass="allcats__icon" svg={el.icon} />
                            {el.title}
                        </div>
                        <utils.use styleClass="allcats__icon allcats__icon--arrow" svg="chevron-down" />
                    </div>
                    <ul className="allcats__list allcats__list--slide">
                        {subCategories}
                    </ul>
                </li>
            );
        }); 

        return (
            <div className="allcats">
                <div className="container">
                    <div className="allcats__wrapper">
                        <div className="allcats__breadcrumbs">
                            <Link to="/" className="f__link f__link--route">Home</Link>
                            <span className="f__link f__link--route">&bull;</span>
                            <span className="f__link f__link--route">All categories</span>
                        </div>
                        {this.state.loading 
                            ? <LoadingSub />
                            : <ul className="allcats__list">
                                {catItems}
                                <li className="allcats__item">
                                    <Link className="allcats__link">
                                        <div className="allcats__group">
                                            <utils.useCat styleClass="allcats__icon" svg="handshake-o" />
                                            Exchange
                                        </div>
                                        <utils.use styleClass="allcats__icon allcats__icon--arrow" svg="chevron-right" />
                                    </Link>
                                </li>
                                <li className="allcats__item">
                                    <Link className="allcats__link">
                                        <div className="allcats__group">
                                            <utils.useCat styleClass="allcats__icon" svg="gift2" />
                                            Giveaway
                                        </div>
                                        <utils.use styleClass="allcats__icon allcats__icon--arrow" svg="chevron-right" />
                                    </Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AllCategories;