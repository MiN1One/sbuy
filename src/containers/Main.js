import React, { PureComponent } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

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
        numberOfPages: 41,
        pagesInterval: 5,
        filterComponent: null
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
        if (!parseInt(utils.getQueryParamValue('page')) || isNaN(this.state.currentPage)) {
            this.setState({ page: 1 }, () => {
                this.props.history.push('?page=1');
            });
        }
    }

    importFilters =  () => {
        import(`../store/Filters/${this.props.lang}/${this.props.match.params.category}`)
            .then(data => {
                this.props.onImportRequisites('filtersList', data.default);
            })
            .catch(er => {
                console.error(er);
            });
    }

    async componentDidMount() {
        this.importFilters();
        this.setPageIfNone();
        const data = await this.fetchData();

        const media = window.matchMedia('(max-width: 46.875em)');

        const watch = () => {
            if (media.matches) this.setState({
                pagesInterval: 3,
                filterComponent: asyncComponent(() => import('../components/MobileFilters'))
            });
            else this.setState({
                pagesInterval: 5,
                filterComponent: asyncComponent(() => import('../components/Filter'))
            });
        };
        
        watch();
        media.onchange = watch;
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.filters !== this.props.filters) {
            const data = await this.fetchData();
            // this.setState({ data });
        }
        if ((this.props.match.params !== prevProps.match.params) || (this.props.lang !== prevProps.lang)) this.importFilters();
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

        //  ------------ PAGINATION --------------
        let pagesListArr = [];
        for (let i = 0; i < this.state.numberOfPages; i++) pagesListArr.push(i+1);

        const prevPages = this.state.pagesInterval - 2;
        const intervalStartIndex = this.state.currentPage - prevPages;
        const intervalLastIndex = this.state.currentPage + this.state.pagesInterval - prevPages;

        // currentPage = 6, [1,2,3,4,5,6,7,8,9]
        // start = 3, end = 8
        // slice* last element is not included
        // final = [4,5,6,7,8]

        const mediaSS = window.matchMedia('(max-width: 31.25em)');
        const matchMediaPages = (arr) => {
            if (mediaSS.matches) {
                if (this.state.currentPage !== 1 && this.state.currentPage !== 41) {
                    return arr.filter(el => {
                        if (el === this.state.numberOfPages || el === 1) return null;
                        else return el;
                    });
                } else return arr;
            } else return arr;
        };

        if (this.state.currentPage > this.state.pagesInterval) {
            
            // cur = 26, numPages = 30 
            // 30 - 26 = 4
            
            if (
                (this.state.numberOfPages - this.state.currentPage <= Math.ceil(this.state.pagesInterval / 2)) ||
                (this.state.numberOfPages - 4 === this.state.currentPage)
               ) 
            {
                pagesListArr = pagesListArr.slice(intervalStartIndex, this.state.numberOfPages);
                pagesListArr = matchMediaPages([1, '...', ...pagesListArr]);
            }
            
            else {
                pagesListArr = pagesListArr.slice(intervalStartIndex, intervalLastIndex);
                pagesListArr = matchMediaPages([1, '...', ...pagesListArr, '...', this.state.numberOfPages]);
            }
            
        } else {
            if (this.state.currentPage < Math.ceil(this.state.pagesInterval / 2)) {
                pagesListArr = pagesListArr.slice(0, this.state.pagesInterval);
                pagesListArr = matchMediaPages([...pagesListArr, '...', this.state.numberOfPages]);
            } else {
                pagesListArr = pagesListArr.slice(0, intervalLastIndex);
                pagesListArr = matchMediaPages([...pagesListArr, '...', this.state.numberOfPages]);
            }
        }

        const pagesList = pagesListArr.map((el, i) => {
            if (el === '...') return <span key={i} className="main__page-item main__page-item--dots">{el}</span>
            return <span 
                key={i}
                className={`main__page-item ${el === this.state.currentPage ? 'main__page-item--active' : ''}`} 
                onClick={() => this.onGoToPage(el)}
                tabIndex="0">{el}</span>
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
                                <button className="btn btn__primary btn__primary--outline main__btn main__btn--mobile mt-2" onClick={() => this.onLoadMore()}>
                                    Load more
                                    <utils.use styleClass="icon ml-5" svg="chevrons-down" />
                                </button>
                            </div>
                        </div>
                    </main>
                </React.Fragment>
            );
        };

        const Filter = this.state.filterComponent;

        return (
            <React.Fragment>
                <Searchbar />
                {Filter && <Filter {...this.props} />}
                {view}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    data: state.data.data,
    filters: state.data.filters,
    favorites: state.user.favorites,
    condition: state.data.filters.condition,
    size: state.data.filters.size,
    price: state.data.filters.price,
    type: state.data.filters.type,
    sort: state.data.filters.sort,
    filtersList: state.localization.translations.filtersList
});

const mapDispatchToProps = (dispatch) => ({
    onSetFavorites: (list) => dispatch(actions.setFavorites(list)),
    onLoading: () => dispatch(actions.setLoading()),
    onImportRequisites: (req, list) => dispatch(actions.importRequisites(req, list)),
    onFilterByCountersDispatch: (name, index, val) => dispatch(actions.filterByCounters(name, index, val)),
    onFilterByOptionsDispatch: (name, val) => dispatch(actions.filterByOptions(name, val))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Main)));