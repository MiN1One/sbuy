import { connect } from 'react-redux';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import Dropdown from './Dropdown';

const Language = (props) => {

    const langs = [
        {
            title: 'O\'zbekcha',
            val: 'uz'
        }, 
        {
            title:'English',
            val: 'en'
        }, 
        {
            title:'Русский',
            val: 'ru'
        }
    ];

    const langItems = langs.map((el, i) => {
        return (
            <div className="dropdown__item" key={i} onClick={() => props.onChangeLanguage(el.val, el.title)}>
                <div className="dropdown__link">{el.title}</div>
            </div>
        );
    });

    return (
        <div className={`language ${props.class ? props.class : ''}`}>
            <div className="nav__item nav__item--drop" tabIndex="0">
                <utils.use styleClass="nav__icon" svg="globe" />
                <span className="nav__title">{props.lang.title}</span>
                <utils.use styleClass="nav__icon nav__icon--arrow" svg="chevron-down" />
            </div>
            <Dropdown class={props.dropClass}>
                <p className="dropdown__title">Language:</p>
                {langItems}
            </Dropdown>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        lang: state.localization.lang
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeLanguage: (lang, title) => dispatch(actions.changeLanguage(lang, title)),
        onChangeLocation: (loc) => dispatch(actions.changeLocation(loc))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Language);