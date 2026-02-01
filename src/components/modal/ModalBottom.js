import React from 'react';
import { MenuCloseIcon } from '../Icons';

import './Modal.scss';

const ModalBottom = ({children, show, handleClose}) => {
    return (
        <div className={`modal-bottom${show?' show':''}`}>
            <div className="main">
                <MenuCloseIcon clickAction={handleClose} customClass="close-button"/>
                {children}
            </div>
        </div>
    )
}

export default ModalBottom;
