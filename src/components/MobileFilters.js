import React, { useEffect, useState } from 'react';

import * as utils from '../utilities/utilities';
import Modal from '../components/Modal';

const MobileFilters = (props) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {

    }, [props.lang]);

    return (
        <div className="mob-filters">
            <utils.use styleClass="icon" svg="filter" />
            Filters
            <Modal show={modal} click={() => setModal(false)}>
                
            </Modal>
        </div>
    );
};

export default MobileFilters;