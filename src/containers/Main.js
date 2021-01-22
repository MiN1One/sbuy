import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Filter from '../components/Filter';
import Adview from '../components/Adview';
import Card from '../components/Card';
import Searchbar from '../components/Searchbar';
import * as utils from '../utilities/utilities';
import LoadingScreen from '../UI/LoadingScreen';
import * as actions from '../store/actions';

class Main extends PureComponent {
    state = {
        loading: false,
        data: null
    }

    fetchData() {
        this.setState({ loading: true });
        axios('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 3000);
            })
            .catch(er => {
                console.log(er);
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters) this.fetchData(); 
    }

    onGoToPage = (page) => {

        // --------------------

        // .........
    }

    render() {
        const premiumArr = this.props.data.filter(el => el.premium === true);
        const premium = premiumArr.map((el, i) => <Card data={el} key={i} />);

        const usualAdsArr = this.props.data.filter(el => el.premium === false);
        const usualAds = usualAdsArr.map((el, i) => <Card data={el} key={i} />);

        let view = <LoadingScreen />;
        if (!this.state.loading) {
            view = (
                <React.Fragment>
                    <Route path="/:category/:subcategory/:id" exact render={() => <Adview {...this.props} data={this.props.data} />} />
                    <main className="main">
                        <div className="container">
                            <div className="main__wrapper">
                                <div className="main__head">
                                    <div className="main__group">
                                        <h2 className="heading heading__2 main__heading mb-5 mr-1">Premiuim ads</h2>
                                        <Link to="/" className="filter__btn filter__btn--close main__link">See all</Link>
                                    </div>
                                    <span className="main__subhead">Found 1,354 ads in this category</span>
                                </div>
                                <div className="main__list">{premium}</div>
                                <div className="main__head">
                                    <h2 className="heading heading__2 main__heading mb-5">Usual ads</h2>
                                    <span className="main__subhead">Found 4,635 ads in this category</span>
                                </div>
                                <div className="main__list">{usualAds}</div>
                                <div className="main__pagination">
                                    <div>
                                        <span className="main__subhead d-flex mb-1">Page: </span>
                                        <div className="d-flex ac">
                                            <button className="main__page-item main__page-item--btn">
                                                <svg className="icon icon--dark" dangerouslySetInnerHTML={{__html: utils.use('chevrons-left')}} />
                                            </button>
                                            <ul className="main__list main__list--pagination">
                                                <li className="main__page-item">1</li>
                                                <li className="main__page-item">2</li>
                                                <li className="main__page-item main__page-item--active">3</li>
                                                <li className="main__page-item">4</li>
                                                <li className="main__page-item">5</li>
                                                <li className="main__page-item">6</li>
                                            </ul>
                                            <button className="main__page-item main__page-item--btn">
                                                <svg className="icon icon--dark" dangerouslySetInnerHTML={{__html: utils.use('chevrons-right')}} />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn__primary btn__primary--outline main__btn">
                                        Load more
                                        <svg className="icon ml-5" dangerouslySetInnerHTML={{__html: utils.use('chevrons-down')}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <Searchbar />
                <Filter />
                {view}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        filters: state.data.filters
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onFetchData: () => dispatch(actions.fetchForMainPage()),
        onLoading: () => dispatch(actions.setLoading())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));