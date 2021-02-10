import React from 'react';

import Backdrop from '../UI/Backdrop';
import * as utils from '../utilities/utilities';

const Modal = (props) => {

    if (!props.show) return null;
    return (
        <React.Fragment>
            <Backdrop z="98" click={props.click} />
            <div className="modal">
                <div className="modal__head">
                    <h5 className="modal__title">{props.title}</h5>
                    <button className="modal__btn" onClick={() => props.click()}>
                        <utils.use styleClass="modal__icon" svg="x" />
                    </button>
                </div>
                <div className="modal__body">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;