import React from 'react';

import Backdrop from '../UI/Backdrop';
import * as utils from '../utilities/utilities';

const Modal = (props) => {

    if (props.show) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = 'auto';

    if (!props.show) return null;
    return (
        <React.Fragment>
            <Backdrop z="98" click={props.click} />
            <div className="modal">
                <div className="container h-100">
                    <div className="modal__head">
                        {/* <h5 className="modal__title">{props.title}</h5> */}
                        <button className="modal__btn" onClick={() => props.click()}>
                            <utils.use styleClass="icon icon--dark" svg="x" />
                        </button>
                    </div>
                    <div className="modal__body">
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;