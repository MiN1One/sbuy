import { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import * as actions from '../store/actions';
import * as utils from '../utilities/utilities';
import Dropdown from '../UI/Dropdown';
import Modal from '../components/Modal';

const Language = (props) => {
    const [modal, setModal] = useState(false);
    const { t, i18n } = useTranslation();

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
                    onClick={() => {
                        i18n.changeLanguage(el.val);
                        setModal(false);
                    }}>
                    <div className="d-flex ac">
                        {el.val === props.lang && <utils.use styleClass="icon--7 mr-5" svg="check" />}
                        {el.title}
                    </div>
                </div>
            )
        }
        return (
            <div 
                className="dropdown__item" 
                key={i} 
                onClick={() => i18n.changeLanguage(el.val)}>
                <div className="dropdown__link">{el.title}</div>
            </div>
        );
    });
    
    const langTitle = i18n.language && langs.find(el => el.val === i18n.language).title;

    if (props.mobile) {
        return (
            <>
                <div className={`language modal__item ${props.class || ''}`} onClick={() => setModal(true)}>
                    <div className="d-flex ac">
                        <utils.use styleClass="icon--7 icon--dark mr-1" svg="globe" />
                        {t('nav.language')}: {langTitle}
                    </div>
                    <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                </div>
                {modal && 
                    <Modal 
                        click={() => setModal(false)}
                        title={t('nav.language')}
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
                <p className="dropdown__title">{t('nav.language')}:</p>
                {langItems}
            </Dropdown>
        </div>
    );
};

const mapStateToProps = (state) => ({
    lang: state.localization.lang,
    mobile: state.data.mediaSmall,
    // base: state.localization.translations.base.lang
});

const mapDispatchToProps = (dispatch) => ({
    onChangeLanguage: (lang) => dispatch(actions.changeLanguage(lang)),
    onChangeLocation: (loc) => dispatch(actions.changeLocation(loc))
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);