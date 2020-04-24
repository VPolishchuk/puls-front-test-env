import React from 'react';
import classes from './Footer.module.css'
import {NavLink} from "react-router-dom";
import UpworkIcon from "../../style/Images/Icons/Social/UpworkIcon";
import InstaIcon from "../../style/Images/Icons/Social/InstaIcon";
import LinkedInIcon from "../../style/Images/Icons/Social/LinkedInIcon";
import FooterLogo from "../../UI/FooterLogo/FooterLogo";

const Footer = () => {
    return (
        <footer className={classes.Footer}>
            <div
                className={classes.footerContent}
            >
                <NavLink className={classes.logo} to='/'>
                    <FooterLogo/>
                </NavLink>
                <div
                    className={classes.contacts}
                >
                    <div>
                        <h3>
                            Contacts
                        </h3>
                        <ul>
                            <li>daniel@puls-software.com</li>
                            <li>+380504030770</li>
                        </ul>
                    </div>
                </div><div
                    className={classes.services}
                >
                    <div>
                        <h3>
                            Services
                        </h3>
                        <ul>
                            <li>
                                <NavLink to={'/'}>Software</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/'}>Games</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/portfolio'}>Portfolio</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className={classes.social}
                >
                    <h3>
                        Our social networks
                    </h3>
                    <div>
                        <a href='https://www.upwork.com/agencies/~01e6dea68a6bdd4ca8'>
                            <UpworkIcon/>
                        </a>
                        <a href='https://www.instagram.com/puls_software'>
                            <InstaIcon/>
                        </a>
                        <a href='https://www.linkedin.com/company/24785262/'>
                            <LinkedInIcon/>
                        </a>
                    </div>
                </div>

            </div>
            <div className={classes.copyright}>
                <p>
                    © Copyrights 2020.
                    All Rights Reserved.
                </p>
            </div>
        </footer>
    )
};

export default Footer;