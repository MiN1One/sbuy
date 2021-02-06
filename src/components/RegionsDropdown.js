import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Dropdown from './Dropdown';

class RegionsDropdown extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { regions: [] }
    }
    
    importRegions = () => {
        import(`../store/Regions/regions_${this.props.lang}`)
            .then(data => {

                let regTitle;
                if (this.props.default) regTitle = data.default.find(el => el.val === this.props.default).title;
                else regTitle = data.default.find(el => el.val === this.props.searchLocation).title;

                this.setState({ regions: data.default }, () => {
                    if (this.props.default) this.props.click(this.props.default, regTitle);
                    else this.props.click(this.props.searchLocation, regTitle);
                });
            })
            .catch(er => {
                console.error(er);
            });
    }
        
    componentDidMount() {
        this.importRegions();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) this.importRegions();
    }
    
    onChangeRegion = (reg) => {
        const title = this.state.regions.find(el => el.val === reg).title;
        this.props.click(reg, title);
    }

    render() {
    
        const locations = this.state.regions.map((el, i) => {
            return (
                <li className="dropdown__item dropdown__item--grid" key={i} onClick={() => this.onChangeRegion(el.val)}>{el.title}</li>
            );
        });

        return (
            <Dropdown class={this.props.class}>
                <ul className="dropdown__wrap">
                    {locations}
                </ul>
            </Dropdown>
        )
    }
};

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    searchLocation: state.localization.searchLocation
});

export default connect(mapStateToProps)(React.memo(RegionsDropdown));