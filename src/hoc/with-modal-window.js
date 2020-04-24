import React, { Component } from 'react';

// ////////////////////////////////////

export const getItemFromSessionStorage = (itemName) => sessionStorage.getItem(itemName);
export const removeItemFromSessionStorage = (itemName) => sessionStorage.removeItem(itemName);
export const setItemToSessionStorage = (itemName, itemValue) => sessionStorage.setItem(itemName, itemValue);

const withModalWindow = BaseComponent => (
    class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                open: false,
                close: false,
                renderModalContent: null,
            }
            this.setModal = this.setModal.bind(this);
            this.onOpenModal = this.onOpenModal.bind(this);
            this.onCloseModal = this.onCloseModal.bind(this);
            this.setRenderModal = this.setRenderModal.bind(this);
            
        }
        onOpenModal() {
            this.setState({ open: true });
        }

        onCloseModal() {
            this.setState({ close: true, open: false });
        }

        setRenderModal() {
            this.setState({ renderModalContent: null })
        }

        setModal(component) {
            this.setState({ renderModalContent: component })
        }
        componentDidMount() {
            if (this.state.open) {
                document.body.style.overflow = 'hidden';
            }
        }
        render () {
            const openModal = (component) => {
                this.setModal(component);
                this.onOpenModal();
            };
            const closeModal = () => {
                this.onCloseModal();
                this.setRenderModal();
            }
          return (
            <BaseComponent
                {...this.props}
                {...this.state}
                openModal={openModal}
                closeModal={closeModal}
            />
          );
        }
    }
);

export default withModalWindow;
