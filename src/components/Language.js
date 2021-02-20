import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import Dropdown from './Dropdown';
import Modal from '../components/Modal';

const Language = (props) => {
    const [modal, setModal] = useState(false);

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
        if (props.mobile) {
            return (
                <div 
                    className={`modal__item${el.val === props.lang ? ' modal__item--active' : ''}`}
                    key={i} 
                    onClick={() => {props.onChangeLanguage(el.val); setModal(false)}}>
                    <div className="d-flex ac">
                        {el.val === props.lang && <utils.use styleClass="icon--7 mr-5" svg="check" />}
                        {el.title}
                    </div>
                </div>
            )
        }
        return (
            <div className="dropdown__item" key={i} onClick={() => props.onChangeLanguage(el.val)}>
                <div className="dropdown__link">{el.title}</div>
            </div>
        );
    });
    
    const langTitle = langs.find(el => el.val === props.lang).title;

    if (props.mobile) {
        return (
            <>
                <div className={`language modal__item ${props.class || ''}`} onClick={() => setModal(true)}>
                    <div className="d-flex ac">
                        <utils.use styleClass="icon--7 icon--dark mr-1" svg="globe" />
                        Language: {langTitle}
                    </div>
                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                </div>
                {modal && 
                    <Modal 
                        click={() => setModal(false)}
                        title="Language"
                        icon="globe">
                        <div className="modal__body">
                            {langItems}
                        </div>
                    </Modal>
                }
            </>
        );
    }

    return (
        <div className={`language ${props.class || ''}`}>
            <div className="nav__item nav__item--drop" tabIndex="0">
                <utils.use styleClass="nav__icon" svg="globe" />
                <span className="nav__title">{langTitle}</span>
                <utils.use styleClass="nav__icon nav__icon--arrow" svg="chevron-down" />
            </div>
            <Dropdown class={props.dropClass}>
                <p className="dropdown__title">Language:</p>
                {langItems}
            </Dropdown>
        </div>
    );
};

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    mobile: state.data.mediaSmall
});

const mapDispatchToProps = (dispatch) => ({
    onChangeLanguage: (lang) => dispatch(actions.changeLanguage(lang)),
    onChangeLocation: (loc) => dispatch(actions.changeLocation(loc))
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);