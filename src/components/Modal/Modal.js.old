import { createPortal } from 'react-dom';
import { Component } from 'react';
import { ModalOverlay, ModalSection, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
            
        }
    };

    render() {
        const { src, alt } = this.props;

        return createPortal(
            <ModalOverlay onClick={this.handleOverlayClick} >
                <ModalSection>
                    <ModalImg src={src} alt={alt} />
                </ModalSection>
            </ModalOverlay >,
            modalRoot
        );
    }
}