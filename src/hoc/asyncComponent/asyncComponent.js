import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import LoadingScreen from '../../UI/LoadingScreen';

const asyncComponent = importedComponent => {
    class LazyComp extends Component {
        state = {
            component: null,
            loading: false
        }

        componentDidMount() {
            this.props.onSetLoading(true);
            importedComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                    this.props.onSetLoading(false);
                })
                .catch(er => {
                    this.props.onError(er);
                    this.props.onSetLoading(false);
                });
        }

        render() {
            const Comp = this.state.component;
            return (
                <React.Fragment>
                    {Comp && <Comp {...this.props} />}
                </React.Fragment>
            );
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            onSetLoading: (val) => dispatch(actions.setLoadingForLazy(val)),
            onError: () => dispatch(actions.handleError())
        }
    };

    return connect(null, mapDispatchToProps)(LazyComp);
};



export default asyncComponent;