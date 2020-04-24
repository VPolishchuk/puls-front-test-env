import React from 'react'
import classes from './Layout.module.css'
import Drawer from "../../UI/MobileNavigation/Drawer/Drawer";
import Header from "../../containers/Header/Header";
import {NavLink} from "react-router-dom";
import Logo from "../../UI/Logo/Logo";
import NavLinks from "../../components/NavLinks/NavLinks";
import Button from "../../UI/Button/Button";
import Form from "../../containers/Form/Form";
import CloseIcon from "../../style/Images/Icons/ConsultationFormCloseIcon/CloseIcon";
import FreeConsultationPopup from "../../UI/Popup/FreeConsultationPopup/FreeConsultationPopup";
import Footer from "../../containers/Footer/Footer";
import { ModalComponent } from '../../components/Modal/ModalBox';
// hoc
import withModalWindow from '../with-modal-window';
// /////////////////////////////////////////////////////


class Layout extends React.Component{

    state = {
        isToggle: false,
        consultationIsOpen: false,
        consultationPopupIsOpen: false
    };

    animateIcon = () => {
        this.setState({
            isToggle: !this.state.isToggle
        })
    };

    consultationFormHandlerForMobile = () => {
        this.setState({
            consultationIsOpen: !this.state.consultationIsOpen
        })
    };

    consultationFormPopupHandler = () => {        
        this.setState({
            consultationPopupIsOpen: !this.state.consultationPopupIsOpen
        })
    };

    render() {
        const {
            open,
            children,
            openModal,
            closeModal,
            renderModal,
            renderModalContent } = this.props;
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1200) {

            if (!this.state.consultationPopupIsOpen) {
                document.body.style.overflow = 'unset'
            } else if (this.state.consultationPopupIsOpen && !this.state.isToggle) {
                document.body.style.overflow = 'hidden';
            }
        }

        if (windowWidth < 1200){
            if (this.state.consultationPopupIsOpen === true) {
                this.setState({consultationPopupIsOpen: false});
                document.body.style.overflow = 'unset'
            }
        }
        if (open) {
            document.body.style.overflow = 'hidden';
        }
        return (
            <div className={classes.Layout}>
                <Drawer
                    onClick={this.animateIcon}
                    isToggle={this.state.isToggle}
                    consultationIsOpen={this.state.consultationIsOpen}
                    consultationFormHandler={this.consultationFormHandlerForMobile}
                />
                {
                    this.state.consultationPopupIsOpen
                    ? <FreeConsultationPopup
                            onClick={this.consultationFormPopupHandler}
                        />
                    : null
                }

                {
                    this.state.consultationIsOpen
                    ?
                        <div className={classes.consultationForm}>
                            <Form closePopup={this.consultationFormPopupHandler}/>
                            <i
                                className={classes.consultationFormClose}
                                onClick={this.consultationFormHandlerForMobile}
                            ><CloseIcon/></i>
                        </div>
                    : null
                }

                {
                    open ? (
                    <ModalComponent
                        close={closeModal}
                        render={() => renderModalContent}
                    />
                    ) : null
                }
                <main>
                    <Header
                        animateIcon={this.animateIcon}
                        isToggle={this.state.isToggle}
                    >
                        <div className={classes.logo}>
                            <NavLink to='/'>
                                <Logo/>
                            </NavLink>
                        </div>
                        <div className={classes.navLinks}>
                            <NavLinks />
                        </div>
                        <div className={classes.button}>
                            <Button
                                buttonStyle='dark'
                                onClick={this.consultationFormPopupHandler}
                            >
                                Free consultation
                            </Button>
                        </div>
                    </Header>
                    {React.cloneElement(children, { open, renderModal, closeModal, openModal })}
                    <Footer/>
                </main>
            </div>
        )
    }
}

export default withModalWindow(Layout);
