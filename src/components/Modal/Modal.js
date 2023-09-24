import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { ModalOverlay, ModalSection, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {



    useEffect(() => {
        
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);


    const handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
            
        }
    };

    return createPortal(
        <ModalOverlay onClick={handleOverlayClick} >
            <ModalSection>
                <ModalImg src={src} alt={alt} />
            </ModalSection>
        </ModalOverlay >,
        modalRoot
    );
}