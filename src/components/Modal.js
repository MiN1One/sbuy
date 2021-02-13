import React, { useEffect } from 'react';

import Backdrop from '../UI/Backdrop';
import * as utils from '../utilities/utilities';

const Modal = (props) => {

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        return () => document.documentElement.style.overflow = 'auto';
    }, []);

    return (
        <React.Fragment>
            <Backdrop z="98" click={props.click} />
            <div className="modal">
                <div className="container modal__container h-100">
                    <div className="modal__head">
                        <button className="modal__btn mb-1" onClick={() => props.click()}>
                            <utils.use styleClass="icon icon--dark" svg="x" />
                        </button>
                        <h5 className="modal__title">
                            {(props.icon && !props.cat) && 
                                <utils.use styleClass="icon icon--dark mr-5" svg={props.icon} />
                            }
                            {(props.cat && props.icon) && 
                                <utils.useCat styleClass="icon icon--dark mr-5" svg={props.icon} />
                            }
                            {props.title}
                            {/* <button className="">Clear</button> */}
                        </h5>
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