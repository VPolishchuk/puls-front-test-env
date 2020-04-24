import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {

    const cls = [classes.Button];
    if (props.buttonStyle === 'dark') {
        cls.push(classes.Dark)
    } else if (props.buttonStyle === 'light') {
        cls.push(classes.Light)
    }

    return (
        <button
            className={cls.join(' ')}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            { props.children }
        </button>
    )
};

export default Button;