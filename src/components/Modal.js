import React, { useEffect } from 'react';

import * as utils from '../utilities/utilities';

const Modal = (props) => {

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        return () => document.documentElement.style.overflow = 'auto';
    }, []);

    return (
        <div className="modal">
            <div className="container h-100">
                <div className="modal__head">
                    <h5 className="modal__title">
                        {(props.icon && !props.cat) && 
                            <utils.use styleClass="icon icon--dark mr-5" svg={props.icon} />
                        }
                        {(props.cat && props.icon) && 
                            <utils.useCat styleClass="icon icon--dark mr-5" svg={props.icon} />
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
    );
};

export default Modal;