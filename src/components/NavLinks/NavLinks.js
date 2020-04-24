import React from 'react'
import classes from './NavLinks.module.css'
import {NavLink} from 'react-router-dom'

const NavLinks = () => {
    return (
        <nav className={classes.NavLinks}>
            <NavLink to={'/'}>Software</NavLink>
            <NavLink to={'/'}>Games</NavLink>
            <NavLink to={'/portfolio'}>Portfolio</NavLink>
        </nav>
    )
};

export default NavLinks;