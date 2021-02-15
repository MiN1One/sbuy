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
                        <h5 className="modal__title">
                            {(props.icon && !props.cat) && 
                                <utils.use styleClass="icon icon--dark mr-1" svg={props.icon} />
                            }
                            {(props.cat && props.icon) && 
                                <utils.useCat styleClass="icon icon--dark mr-1" svg={props.icon} />
                            }
                            {props.title}
                        </h5>
                        <button onClick={() => props.click()}>
                            <utils.use styleClass="icon icon--dark" svg="x" />
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;