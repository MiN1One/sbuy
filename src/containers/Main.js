import React, { PureComponent } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Filter from '../components/Filter';
import Adview from '../components/Adview';
import Card from '../components/Card';
import Searchbar from '../components/Searchbar';
import * as utils from '../utilities/utilities';
import LoadingScreen from '../UI/LoadingScreen';
import * as actions from '../store/actions';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

const AsyncAdview = asyncComponent(() => import('../components/Adview'));

class Main extends PureComponent {
    state = {
        loading: false,
        data: [...this.props.data],
        currentPage: parseInt(utils.getQueryParamValue('page')),
        numberOfPages: 30,
        pagesInterval: 7
    }
        
    fetchData = async () => {
        try {
            this.setState({ loading: true });
            const data = await axios(`https://jsonplaceholder.typicode.com/todos/${this.state.currentPage}`);
            console.log(data);
            setTimeout(() => {
                this.setState({ loading: false });
            }, 0);
            return data;
        } catch(er) {
            console.log(er);
            this.setState({ loading: false });
        }
    }

    setPageIfNone = () => {
        if (!this.state.currentPage) {
            this.setState({ page: 1 }, () => {
                this.props.history.push('?page=1');
            });
        }
    }

    async componentDidMount() {
        this.setPageIfNone();
        const data = await this.fetchData();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (!utils.getQueryParamValue('page') && !this.props.match.params.id) this.props.history.push(`?page=${this.state.currentPage}`);
        else if (this.props.match.params.id) window.location.search = '';

        if (prevProps.filters !== this.props.filters) {
            const data = await this.fetchData();
            console.log(data);
            // this.setState({ data });
        }
    }

    onGoToPage = (page) => {
        if (page !== this.state.currentPage) {
            document.documentElement.scrollTop = 130;
            this.setState({ currentPage: page }, async () => {
                const data = await this.fetchData();
                this.setState({ data: this.props.data });
                this.props.history.push(`?page=${page}`);
            });
        }
    }

    onClickPageNext = () => {
        document.documentElement.scrollTop = 130;
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), 
            async () => {
                const data = await this.fetchData();
                this.setState({ data: this.props.data });
                this.props.history.push(`?page=${this.state.currentPage}`);
            });
    }

    onClickPagePrev = () => {
        document.documentElement.scrollTop = 130;
        if (this.state.currentPage > 1) 
            this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }),
                async () => {
                    const data = await this.fetchData();
                    this.setState({ data: this.props.data });
                    this.props.history.push(`?page=${this.state.currentPage}`);
                });
    }

    onLoadMore = () => {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), 
            async () => {
                this.props.history.push(`?page=${this.state.currentPage}`);
                const data = await this.fetchData();
                this.setState(prevState => ({ data: [...prevState.data, ...this.props.data] }));
            });
    }

    render() {
        const premiumArr = this.state.data.filter(el => el.premium === true);
        const premium = premiumArr.map((el, i) => <Card data={el} key={i} />);

        const usualAdsArr = this.state.data.filter(el => el.premium === false);
        const usualAds = usualAdsArr.map((el, i) => <Card data={el} key={i} />);

        let pagesListArr = [];
        for (let i = 0; i < this.state.numberOfPages; i++) pagesListArr.push(i+1);

        if (this.state.currentPage > this.state.pagesInterval) {

            const intervalStartIndex = this.state.currentPage - 3;
            const intervalLastIndex = this.state.currentPage + this.state.pagesInterval - 3;
            pagesListArr = pagesListArr.slice(intervalStartIndex, intervalLastIndex);
            if (intervalLastIndex >= this.state.numberOfPages) {
                // console.log(intervalLastIndex >= this.state.numberOfPages, intervalLastIndex);
                pagesListArr = [1, '...', ...pagesListArr];
            } else {
                // pagesListArr = pagesListArr.slice(intervalStartIndex, intervalLastIndex);
                pagesListArr = [1, '...', ...pagesListArr, '...', this.state.numberOfPages];
            }
            
        }

        const pagesList = pagesListArr.map((el, i) => {
            return <span 
                key={i}
                className={`main__page-item ${el === this.state.currentPage ? 'main__page-item--active' : ''}`} 
                onClick={() => this.onGoToPage(el)}>{el}</span>
        });

        let view = <LoadingScreen />;
        if (!this.state.loading) {
            view = (
                <React.Fragment>
                    <Route path="/categories/:category/:subcategory/:id" exact component={AsyncAdview} />
                    <main className="main">
                        <div className="container">
                            <div className="main__wrapper">
                                <div className="main__head">
                                    <div className="main__group">
                                        <h2 className="heading heading__2 main__heading mb-5 mr-1">Premiuim ads</h2>
                                        <Link to="/all" className="filter__btn filter__btn--close main__link">See all</Link>
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
                                            <button className="main__page-item main__page-item--btn" onClick={() => this.onClickPagePrev()}>
                                                <utils.use styleClass="icon icon--dark" svg="chevrons-left" />
                                            </button>
                                            <div className="main__page-list">
                                                {pagesList}
                                            </div>
                                            <button className="main__page-item main__page-item--btn" onClick={() => this.onClickPageNext()}>
                                                <utils.use styleClass="icon icon--dark" svg="chevrons-right" />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn__primary btn__primary--outline main__btn" onClick={() => this.onLoadMore()}>
                                        Load more
                                        <utils.use styleClass="icon ml-5" svg="chevrons-down" />
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

const mapStateToProps = (state) => ({
    data: state.data.data,
    filters: state.data.filters,
    favorites: state.user.favorites
});

const mapDispatchToProps = (dispatch) => ({
    onSetFavorites: (list) => dispatch(actions.setFavorites(list)),
    onLoading: () => dispatch(actions.setLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Main)));