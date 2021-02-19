import React, { Component } from "react";
import { connect } from "react-redux";

const asyncComponent = importedComponent => {
    class LazyComp extends Component {
        state = { component: null }

        componentDidMount() {
            importedComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                })
                .catch(er => {
                    console.error(er);
                });
        }

        render() {
            const Comp = this.state.component;
            return Comp ? <Comp {...this.props} /> : null;
        }
    }

    return connect()(LazyComp);
};



export default asyncComponent;