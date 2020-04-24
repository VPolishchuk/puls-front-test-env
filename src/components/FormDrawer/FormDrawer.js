import React from 'react'
import classes from './FormDrawer.module.css'
import Button from "../../UI/Button/Button";

const FormDrawer = props => {
    return (
        <div className={classes.FormDrawer}>
            <div className={classes.FormDrawerContent}>
                <h1>Thank you for reaching out!
                    We will get back to you shortly</h1>
                <Button
                    onClick={props.submitFormDrawer}
                    buttonStyle='light'
                >Got it</Button>
            </div>
        </div>
    )
};

export default FormDrawer;