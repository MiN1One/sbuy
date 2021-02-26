import React, { PureComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, withRouter } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import { connect } from 'react-redux';

class Card extends PureComponent {

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
                        <span className="card__heading-full">{this.props.data.title}</span>
                    </figure>
                    <div className="card__list">
                        <div className="card__item card__item--group">
                            <span className="card__heading">{title}</span>
                            {this.props.data.premium && <span className="badge card__badge">TOP</span>}
                        </div>
                        <span className="card__item card__item--sub">{this.props.data.date}</span>
                        <p className="card__item card__item--sub">{utils.limitStrAny(this.props.data.location, 20, false)}</p>
                        <span className="price-tag">{utils.formatPrice(this.props.data.price)}</span>
                    </div>
                </Link>
                <button 
                    className="card__btn" 
                    data-favorite={isFavorite ? true : false} 
                    onClick={() => this.props.onSetFavorites(this.props.data.id)}>
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
    onSetFavorites: (ad) => dispatch(actions.setFavorites(ad))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Card)));