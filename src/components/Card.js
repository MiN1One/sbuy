import React, { PureComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, withRouter } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import { connect } from 'react-redux';

class Card extends PureComponent {

    onLikeAd = (id) => {
        let newList = null;
        const exists = this.props.favorites.find(el => el === id);
        if (exists) newList = this.props.favorites.filter(el => el !== id);
        else newList = [...this.props.favorites, id];
        localStorage.setItem('favorite_ads_sbuy', JSON.stringify(newList));
        this.props.onSetFavorites(newList);
    }

    render() {
        const pathname = this.props.match.url === '/' ? '/premium/' : `${this.props.match.url}/`;
    
        let title = utils.limitStrAny(this.props.data.title, 15, false);
        if (this.props.data.premium) title = utils.limitStrAny(this.props.data.title, 12, true);
    
        const isFavorite = this.props.favorites.findIndex(el => el === this.props.data.id) > -1;
    
        return (
            <div className="card" tabIndex={0}>
                <Link to={`${pathname}${this.props.data.id}`} className="card__wrapper">
                    <figure className="card__figure">
                        <LazyLoadImage 
                            src={this.props.data.img[0]} 
                            effect="opacity" 
                            alt={this.props.data.title} 
                            className="card__img" 
                            height="100%"
                            width="100%" />
                        <span className="card__heading card__heading--hidden">{this.props.data.title}</span>
                    </figure>
                    <div className="card__list">
                        <div className="card__item card__item--group" data-premium={this.props.data.premium}>
                            <span className="card__heading">{title}</span>
                            <span className="badge">TOP</span>
                        </div>
                        <span className="card__item">{this.props.data.date}</span>
                        <p className="card__item card__item--location">{this.props.data.location}</p>
                        <div className="card__item card__item--space">
                            <span className="price-tag">{this.props.data.price}</span>
                        </div>
                    </div>
                </Link>
                <button className="card__btn" data-favorite={isFavorite ? true : false} onClick={() => this.onLikeAd(this.props.data.id)}>
                    {isFavorite ? <FaHeart className="card__icon icon" /> : <FaRegHeart className="card__icon icon" />}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    favorites: state.user.favorites
});

const mapDispatchToProps = (dispatch) => ({
    onSetFavorites: (list) => dispatch(actions.setFavorites(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Card)));