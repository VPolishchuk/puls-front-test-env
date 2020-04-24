import React from 'react'
import classes from './Drawer.module.css'
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";

const links = ['software', 'design', 'portfolio'];

class Drawer extends React.Component {

    renderLinks(){
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={`/${link}`}
                        onClick={this.props.onClick}
                    >{link}</NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer];

        const windowWidth = window.innerWidth;

        if (windowWidth < 1200) {
            if (!this.props.isToggle) {
                cls.splice(1, 1);
                document.body.style.overflow = 'unset'
            } else if (this.props.isToggle) {
                cls.push(classes.open);
                document.body.style.overflow = 'hidden'
            }
        }

        return (
            <nav className={cls.join(' ')}>
                <div>
                    <ul>
                        { this.renderLinks() }
                    </ul>

                    <Button
                        onClick={this.props.consultationFormHandler}
                    >
                        Free consultation
                    </Button>
                </div>
            </nav>
        )
    }
}

export default Drawer;