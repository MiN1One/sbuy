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

class Main extends PureComponent {
    state = {
        loading: false,
        data: [...this.props.data],
        page: parseInt(utils.getQueryParamValue('page')),
        numberOfPages: 7
    }
        
    fetchData = async () => {
        try {
            this.setState({ loading: true });
            const data = await axios(`https://jsonplaceholder.typicode.com/todos/${this.state.page}`);
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
        if (!this.state.page) {
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
        if (!utils.getQueryParamValue('page') && !this.props.match.params.id) this.props.history.push(`?page=${this.state.page}`);
        else if (this.props.match.params.id) window.location.search = '';

        if (prevProps.filters !== this.props.filters) {
            const data = await this.fetchData();
            console.log(data);
            // this.setState({ data });
        }
    }

    onGoToPage = (page) => {
        if (page !== this.state.page) {
            document.documentElement.scrollTop = 130;
            this.setState({ page }, async () => {
                const data = await this.fetchData();
                this.setState({ data: this.props.data });
                this.props.history.push(`?page=${page}`);
            });
        }
    }

    onClickPageNext = () => {
        document.documentElement.scrollTop = 130;
        this.setState(prevState => ({ page: prevState.page + 1 }), 
            async () => {
                const data = await this.fetchData();
                this.setState({ data: this.props.data });
                this.props.history.push(`?page=${this.state.page}`);
            });
    }

    onClickPagePrev = () => {
        document.documentElement.scrollTop = 130;
        if (this.state.page > 1) 
            this.setState(prevState => ({ page: prevState.page - 1 }),
                async () => {
                    const data = await this.fetchData();
                    this.setState({ data: this.props.data });
                    this.props.history.push(`?page=${this.state.page}`);
                });
    }

    onLoadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }), 
            async () => {
                this.props.history.push(`?page=${this.state.page}`);
                const data = await this.fetchData();
                this.setState(prevState => ({ data: [...prevState.data, ...this.props.data] }));
            });
    }

    render() {
        const premiumArr = this.state.data.filter(el => el.premium === true);
        const premium = premiumArr.map((el, i) => <Card data={el} key={i} />);

        const usualAdsArr = this.state.data.filter(el => el.premium === false);
        const usualAds = usualAdsArr.map((el, i) => <Card data={el} key={i} />);

        const pagesListArr = [];
        for (let i = 0; i < this.state.numberOfPages; i++) pagesListArr.push('');
        const pagesList = pagesListArr.map((el, i) => {
            return <li className={`main__page-item${i+1 === this.state.page ? ' main__page-item--active' : ''}`} onClick={() => this.onGoToPage(i+1)}>{i+1}</li>
        });

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
                                            <button className="main__page-item main__page-item--btn" onClick={() => this.onClickPagePrev()}>
                                                <svg className="icon icon--dark" dangerouslySetInnerHTML={{__html: utils.use('chevrons-left')}} />
                                            </button>
                                            <ul className="main__page-list">
                                                {pagesList}
                                            </ul>
                                            <button className="main__page-item main__page-item--btn" onClick={() => this.onClickPageNext()}>
                                                <svg className="icon icon--dark" dangerouslySetInnerHTML={{__html: utils.use('chevrons-right')}} />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn__primary btn__primary--outline main__btn" onClick={() => this.onLoadMore()}>
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

const mapStateToProps = (state) => ({
    data: state.data.data,
    filters: state.data.filters,
    favorites: state.data.favoriteAds
});

const mapDispatchToProps = (dispatch) => ({
    onSetFavorites: (list) => dispatch(actions.setFavorites(list)),
    onLoading: () => dispatch(actions.setLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Main)));