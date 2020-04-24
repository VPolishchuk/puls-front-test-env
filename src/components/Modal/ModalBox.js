import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from "../../style/Images/Icons/ConsultationFormCloseIcon/CloseIcon";
import OutsideClickHandler from 'react-outside-click-handler';
import classes from './ModalBox.module.css';
/// //////////////////////////////////////////

export const Portal = ({ children }) => {
  let modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  }

  const modalElement = document.createElement('div');

  modalRoot.appendChild(modalElement);
  useEffect(() => {
    return () => modalRoot.removeChild(modalElement);
  });
  return createPortal(children, modalElement);
};

export const ModalComponent = ({ children, close, render }) => (
  <Portal>
    <div className={classes.PortalBg}>
      <OutsideClickHandler
        display='contents'
        onOutsideClick={close}
      >
        <div className={classes.ModalWrap}>
          <div>
            {render(children) || children}
          </div>
          <span onClick={close}>
            <CloseIcon />
          </span>
        </div>
      </OutsideClickHandler>
    </div>
  </Portal>
);

export default ModalComponent;