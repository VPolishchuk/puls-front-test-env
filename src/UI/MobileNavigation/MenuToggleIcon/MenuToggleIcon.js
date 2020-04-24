import React from 'react'
import classes from './MenuToggleIcon.module.css'

const cls = [classes.MenuToggleIcon];


const MenuToggleIcon = props => {

    if (props.isToggle) {
        cls.splice(1, 1, classes.animate);
    } else {
        cls.splice(1, 1, classes.normal);
    }

    return (
            <svg
                className={cls.join(' ')}
                onClick={props.onClick}
                width="26"
                height="18"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1 1H25" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 9H25" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 17H25" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
    )
};

export default MenuToggleIcon;