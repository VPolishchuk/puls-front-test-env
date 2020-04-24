import React from 'react';
import classes from './FreeConsultationPopup.module.css'
import Form from "../../../containers/Form/Form";
import CloseIcon from "../../../style/Images/Icons/ConsultationFormCloseIcon/CloseIcon";
import BackDrop from "../../BackDrop/BackDrop";

const FreeConsultationPopup = props => {
    return (
        <React.Fragment>
            <div className={classes.FreeConsultationPopup}>
                <div className={classes.content}>
                    <Form closePopup={props.onClick}/>
                    <i
                        onClick={props.onClick}
                    >
                        <CloseIcon/>
                    </i>
                </div>
                <BackDrop onClick={props.onClick}/>
            </div>
        </React.Fragment>
    )
};

export default FreeConsultationPopup;