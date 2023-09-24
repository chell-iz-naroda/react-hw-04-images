import { GalleryImg, GalleryItem } from "./ImageGalleryItem.styled";
// import { Component } from "react";
import { useState } from 'react';

import { Modal } from "components/Modal/Modal";

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {

    const [isOpen, setIsOpen] = useState(false);


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <GalleryItem>
                <GalleryImg
                    src={webformatURL}
                    alt={tags}
                    onClick={toggleModal}
                />
            </GalleryItem>
            {isOpen && (
                <Modal onClose={toggleModal} src={largeImageURL} alt={tags} />
            )}
        </>
    );
}
