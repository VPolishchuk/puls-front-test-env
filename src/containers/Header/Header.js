import React from 'react'
import classes from './Header.module.css'
import MenuToggleIcon from "../../UI/MobileNavigation/MenuToggleIcon/MenuToggleIcon";

export default class Header extends React.Component{

    render() {

        return (
            <header className={classes.Header}>
                { this.props.children }

                <MenuToggleIcon
                    onClick={this.props.animateIcon}
                    isToggle={this.props.isToggle}
                />
            </header>
        )
    }
}